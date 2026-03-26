const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");
const { randomUUID } = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");

const HOST = "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const DATA_DIR = path.join(ROOT_DIR, "data");
const DB_PATH = path.join(DATA_DIR, "notecollab.db");
const MAX_BODY_SIZE = 1024 * 1024;

fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(DB_PATH);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS support_requests (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

const statements = {
  noteCount: db.prepare("SELECT COUNT(*) AS count FROM notes"),
  listNotes: db.prepare(`
    SELECT id, title, content, created_at AS createdAt, updated_at AS updatedAt, version
    FROM notes
    ORDER BY updated_at DESC
  `),
  getNote: db.prepare(`
    SELECT id, title, content, created_at AS createdAt, updated_at AS updatedAt, version
    FROM notes
    WHERE id = ?
  `),
  createNote: db.prepare(`
    INSERT INTO notes (id, title, content, created_at, updated_at, version)
    VALUES (?, ?, ?, ?, ?, 1)
  `),
  updateNote: db.prepare(`
    UPDATE notes
    SET title = ?, content = ?, updated_at = ?, version = version + 1
    WHERE id = ?
  `),
  createSupportRequest: db.prepare(`
    INSERT INTO support_requests (id, email, message, created_at)
    VALUES (?, ?, ?, ?)
  `),
};

seedDefaultNote();

const sseClients = new Map();
const allClients = new Map();

const keepAliveInterval = setInterval(() => {
  for (const client of allClients.values()) {
    try {
      client.res.write(": keep-alive\n\n");
    } catch (error) {
      removeSseClient(client);
    }
  }
}, 15000);

keepAliveInterval.unref();

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = requestUrl.pathname;

  try {
    if (pathname === "/api/bootstrap" && req.method === "GET") {
      return sendJson(res, 200, buildBootstrapPayload());
    }

    if (pathname === "/api/events" && req.method === "GET") {
      const noteId = requestUrl.searchParams.get("noteId");
      return handleSse(req, res, noteId);
    }

    if (pathname === "/api/notes" && req.method === "POST") {
      const payload = await readJsonBody(req);
      const now = new Date().toISOString();
      const noteId = randomUUID();
      const title = sanitizeTitle(payload.title || "Untitled note");
      const content = sanitizeContent(payload.content || "");

      statements.createNote.run(noteId, title, content, now, now);
      const note = getNoteOrThrow(noteId);

      broadcastAll("notes-changed", { note: buildNoteSummary(note) });
      return sendJson(res, 201, {
        note,
        notes: listNoteSummaries(),
      });
    }

    if (pathname === "/api/support" && req.method === "POST") {
      const payload = await readJsonBody(req);
      const email = String(payload.email || "").trim();
      const message = String(payload.message || "").trim();

      if (!isValidEmail(email)) {
        return sendJson(res, 400, { error: "Please provide a valid email address." });
      }

      if (message.length < 10) {
        return sendJson(res, 400, { error: "Message should be at least 10 characters long." });
      }

      statements.createSupportRequest.run(
        randomUUID(),
        email,
        message,
        new Date().toISOString(),
      );

      return sendJson(res, 201, {
        ok: true,
        message: "Support request received. We will get back to you soon.",
      });
    }

    const noteMatch = pathname.match(/^\/api\/notes\/([^/]+)$/);
    if (noteMatch) {
      const noteId = decodeURIComponent(noteMatch[1]);

      if (req.method === "GET") {
        return sendJson(res, 200, { note: getNoteOrThrow(noteId) });
      }

      if (req.method === "PUT") {
        const payload = await readJsonBody(req);
        const existing = getNoteOrThrow(noteId);
        const title = sanitizeTitle(payload.title || existing.title);
        const content = sanitizeContent(
          typeof payload.content === "string" ? payload.content : existing.content,
        );
        const updatedAt = new Date().toISOString();

        statements.updateNote.run(title, content, updatedAt, noteId);
        const note = getNoteOrThrow(noteId);
        const sourceId = typeof payload.sourceId === "string" ? payload.sourceId : null;

        broadcastNote(noteId, "note-updated", { note, sourceId });
        broadcastAll("notes-changed", { note: buildNoteSummary(note) });

        return sendJson(res, 200, { note });
      }
    }

    const exportTxtMatch = pathname.match(/^\/api\/export\/([^/]+)\.txt$/);
    if (exportTxtMatch && req.method === "GET") {
      const noteId = decodeURIComponent(exportTxtMatch[1]);
      const note = getNoteOrThrow(noteId);
      const filename = slugify(note.title || "note");
      const textFile = `${note.title}\n\n${note.content}`.replace(/\r\n/g, "\n");

      res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}.txt"`,
      });
      res.end(textFile);
      return;
    }

    const exportPdfMatch = pathname.match(/^\/api\/export\/([^/]+)\.pdf$/);
    if (exportPdfMatch && req.method === "GET") {
      const noteId = decodeURIComponent(exportPdfMatch[1]);
      const note = getNoteOrThrow(noteId);
      const filename = slugify(note.title || "note");
      const pdfBuffer = createPdfDocument(note.title, note.content);

      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        "Content-Length": pdfBuffer.length,
      });
      res.end(pdfBuffer);
      return;
    }

    if (pathname === "/" && req.method === "GET") {
      return serveFile(res, "index.html");
    }

    if (req.method === "GET") {
      return serveStaticAsset(res, pathname);
    }

    sendJson(res, 404, { error: "Not found." });
  } catch (error) {
    if (error && error.statusCode) {
      return sendJson(res, error.statusCode, { error: error.message });
    }

    console.error(error);
    sendJson(res, 500, { error: "Something went wrong on the server." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`NoteCollab is running on http://localhost:${PORT}`);
});

function seedDefaultNote() {
  const { count } = statements.noteCount.get();

  if (count > 0) {
    return;
  }

  const now = new Date().toISOString();
  const noteId = randomUUID();
  const title = "Welcome to NoteCollab";
  const content = [
    "This is your first shared note.",
    "",
    "Ideas to try:",
    "- Open the app in another browser tab to see live syncing in action.",
    "- Switch themes from the panel on the right.",
    "- Export the note as TXT or PDF from the toolbar.",
    "- Use the floating Support button if you want help inside the app.",
  ].join("\n");

  statements.createNote.run(noteId, title, content, now, now);
}

function buildBootstrapPayload() {
  const notes = listNoteSummaries();
  const activeNoteId = notes[0] ? notes[0].id : null;
  const activeNote = activeNoteId ? getNoteOrThrow(activeNoteId) : null;

  return {
    appName: "NoteCollab",
    notes,
    activeNote,
    features: [
      "Real-time note syncing",
      "TXT and PDF exports",
      "Theme presets with seasonal palettes",
      "SQLite-backed support inbox",
    ],
  };
}

function listNoteSummaries() {
  return statements.listNotes.all().map(buildNoteSummary);
}

function buildNoteSummary(note) {
  const preview =
    note.content
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "Ready for your next idea.";

  return {
    id: note.id,
    title: note.title,
    preview,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    version: note.version,
  };
}

function getNoteOrThrow(noteId) {
  const note = statements.getNote.get(noteId);

  if (!note) {
    const error = new Error("Note not found.");
    error.statusCode = 404;
    throw error;
  }

  return note;
}

function sanitizeTitle(input) {
  return String(input || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120) || "Untitled note";
}

function sanitizeContent(input) {
  return String(input || "")
    .replace(/\u0000/g, "")
    .slice(0, 50000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleSse(req, res, noteId) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  const resolvedNoteId = noteId || null;
  const client = {
    id: randomUUID(),
    noteId: resolvedNoteId,
    res,
  };

  addSseClient(client);
  writeSse(res, "connected", {
    ok: true,
    noteId: resolvedNoteId,
  });

  if (resolvedNoteId) {
    broadcastPresence(resolvedNoteId);
  }

  req.on("close", () => {
    removeSseClient(client);
  });
}

function addSseClient(client) {
  allClients.set(client.id, client);

  const noteKey = client.noteId || "__global__";
  const noteClients = sseClients.get(noteKey) || new Map();
  noteClients.set(client.id, client);
  sseClients.set(noteKey, noteClients);
}

function removeSseClient(client) {
  if (!allClients.has(client.id)) {
    return;
  }

  allClients.delete(client.id);

  const noteKey = client.noteId || "__global__";
  const noteClients = sseClients.get(noteKey);

  if (noteClients) {
    noteClients.delete(client.id);

    if (noteClients.size === 0) {
      sseClients.delete(noteKey);
    }
  }

  if (client.noteId) {
    broadcastPresence(client.noteId);
  }

  try {
    client.res.end();
  } catch (error) {
    // Ignore closed sockets during cleanup.
  }
}

function broadcastAll(eventName, payload) {
  for (const client of allClients.values()) {
    writeSse(client.res, eventName, payload, client);
  }
}

function broadcastNote(noteId, eventName, payload) {
  const noteClients = sseClients.get(noteId);

  if (!noteClients) {
    return;
  }

  for (const client of noteClients.values()) {
    writeSse(client.res, eventName, payload, client);
  }
}

function broadcastPresence(noteId) {
  const noteClients = sseClients.get(noteId);
  const count = noteClients ? noteClients.size : 0;
  broadcastNote(noteId, "presence", { noteId, count });
}

function writeSse(res, eventName, payload, client) {
  try {
    res.write(`event: ${eventName}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  } catch (error) {
    if (client) {
      removeSseClient(client);
    }
  }
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function serveStaticAsset(res, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const safePath = path
    .normalize(requestedPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    return sendJson(res, 403, { error: "Forbidden." });
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return sendJson(res, 404, { error: "Not found." });
  }

  const extension = path.extname(filePath).toLowerCase();
  const mimeType =
    {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".ico": "image/x-icon",
    }[extension] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": mimeType });
  fs.createReadStream(filePath).pipe(res);
}

function serveFile(res, fileName) {
  return serveStaticAsset(res, `/${fileName}`);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString("utf8");

      if (Buffer.byteLength(body) > MAX_BODY_SIZE) {
        const error = new Error("Request body is too large.");
        error.statusCode = 413;
        reject(error);
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        const parseError = new Error("Invalid JSON payload.");
        parseError.statusCode = 400;
        reject(parseError);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}

function slugify(value) {
  return String(value || "note")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "note";
}

function createPdfDocument(title, content) {
  const rawLines = [`Title: ${title}`, "", ...String(content || "").split(/\r?\n/g)];
  const wrappedLines = [];

  for (const line of rawLines) {
    const chunks = wrapText(line || " ", 88);

    if (chunks.length === 0) {
      wrappedLines.push(" ");
      continue;
    }

    wrappedLines.push(...chunks);
  }

  const linesPerPage = 42;
  const pages = [];

  for (let index = 0; index < wrappedLines.length; index += linesPerPage) {
    pages.push(wrappedLines.slice(index, index + linesPerPage));
  }

  if (pages.length === 0) {
    pages.push([" "]);
  }

  const objects = new Map();
  objects.set(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects.set(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  const pageObjectNumbers = [];
  let nextObjectNumber = 4;

  for (const pageLines of pages) {
    const contentObjectNumber = nextObjectNumber++;
    const pageObjectNumber = nextObjectNumber++;
    pageObjectNumbers.push(pageObjectNumber);

    const streamLines = [
      "BT",
      "/F1 12 Tf",
      "14 TL",
    ];

    pageLines.forEach((line, lineIndex) => {
      const y = 760 - lineIndex * 16;
      streamLines.push(`1 0 0 1 48 ${y} Tm (${escapePdfText(line)}) Tj`);
    });

    streamLines.push("ET");
    const streamBody = streamLines.join("\n");

    objects.set(
      contentObjectNumber,
      `<< /Length ${Buffer.byteLength(streamBody, "utf8")} >>\nstream\n${streamBody}\nendstream`,
    );
    objects.set(
      pageObjectNumber,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`,
    );
  }

  objects.set(
    2,
    `<< /Type /Pages /Count ${pageObjectNumbers.length} /Kids [${pageObjectNumbers
      .map((number) => `${number} 0 R`)
      .join(" ")}] >>`,
  );

  const objectNumbers = Array.from(objects.keys()).sort((left, right) => left - right);
  const sections = ["%PDF-1.4\n"];
  const offsets = [0];
  let currentOffset = Buffer.byteLength(sections[0], "utf8");

  for (const objectNumber of objectNumbers) {
    offsets[objectNumber] = currentOffset;
    const objectBody = `${objectNumber} 0 obj\n${objects.get(objectNumber)}\nendobj\n`;
    sections.push(objectBody);
    currentOffset += Buffer.byteLength(objectBody, "utf8");
  }

  const xrefOffset = currentOffset;
  sections.push(`xref\n0 ${objectNumbers.length + 1}\n`);
  sections.push("0000000000 65535 f \n");

  for (const objectNumber of objectNumbers) {
    sections.push(`${String(offsets[objectNumber]).padStart(10, "0")} 00000 n \n`);
  }

  sections.push(
    `trailer\n<< /Size ${objectNumbers.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`,
  );

  return Buffer.from(sections.join(""), "utf8");
}

function wrapText(text, maxLength) {
  const normalized = String(text || "");

  if (!normalized.trim()) {
    return [];
  }

  const words = normalized.split(/\s+/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    if (!currentLine) {
      currentLine = word;
      continue;
    }

    if (`${currentLine} ${word}`.length <= maxLength) {
      currentLine = `${currentLine} ${word}`;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function escapePdfText(text) {
  return String(text || "")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/\r/g, "");
}
