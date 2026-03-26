const themePresets = [
  {
    id: "system",
    label: "System",
    description: "Follows your device preference",
    swatch: "linear-gradient(135deg, #0f172a 0%, #f8fafc 100%)",
  },
  {
    id: "light",
    label: "Light",
    description: "Bright paper and blue accents",
    swatch: "linear-gradient(135deg, #f6f0e8 0%, #dfe8f5 100%)",
    palette: {
      "--bg-top": "#f3efe4",
      "--bg-bottom": "#dbe7f7",
      "--text": "#14213d",
      "--text-muted": "rgba(20, 33, 61, 0.68)",
      "--panel": "rgba(255, 255, 255, 0.7)",
      "--panel-strong": "rgba(255, 255, 255, 0.86)",
      "--panel-soft": "rgba(255, 255, 255, 0.5)",
      "--border": "rgba(20, 33, 61, 0.12)",
      "--accent": "#0d6efd",
      "--accent-soft": "rgba(13, 110, 253, 0.14)",
      "--editor-bg": "rgba(255, 255, 255, 0.9)",
      "--editor-border": "rgba(20, 33, 61, 0.09)",
      "--shadow": "0 32px 90px rgba(27, 39, 79, 0.16)",
      "--danger": "#b42318",
      "--success": "#067647",
      "--surface": "rgba(255, 255, 255, 0.88)",
      "--surface-strong": "rgba(255, 255, 255, 0.96)",
    },
  },
  {
    id: "dark",
    label: "Dark",
    description: "Low-light contrast for long sessions",
    swatch: "linear-gradient(135deg, #10131f 0%, #4a5b7a 100%)",
    palette: {
      "--bg-top": "#0f1724",
      "--bg-bottom": "#1c2940",
      "--text": "#f4f7fb",
      "--text-muted": "rgba(244, 247, 251, 0.68)",
      "--panel": "rgba(12, 19, 33, 0.72)",
      "--panel-strong": "rgba(16, 24, 41, 0.84)",
      "--panel-soft": "rgba(255, 255, 255, 0.04)",
      "--border": "rgba(255, 255, 255, 0.1)",
      "--accent": "#7cc7ff",
      "--accent-soft": "rgba(124, 199, 255, 0.16)",
      "--editor-bg": "rgba(10, 14, 25, 0.86)",
      "--editor-border": "rgba(255, 255, 255, 0.08)",
      "--shadow": "0 32px 90px rgba(0, 0, 0, 0.34)",
      "--danger": "#ff8c82",
      "--success": "#6ed8a6",
      "--surface": "rgba(17, 24, 39, 0.9)",
      "--surface-strong": "rgba(14, 20, 34, 0.96)",
    },
  },
  {
    id: "summer",
    label: "Summer",
    description: "Warm citrus and bright sand",
    swatch: "linear-gradient(135deg, #ffd166 0%, #ff7b54 100%)",
    palette: {
      "--bg-top": "#fff1c1",
      "--bg-bottom": "#ffd3b0",
      "--text": "#543118",
      "--text-muted": "rgba(84, 49, 24, 0.72)",
      "--panel": "rgba(255, 251, 238, 0.74)",
      "--panel-strong": "rgba(255, 248, 229, 0.9)",
      "--panel-soft": "rgba(255, 247, 220, 0.6)",
      "--border": "rgba(130, 73, 18, 0.14)",
      "--accent": "#ef5b2a",
      "--accent-soft": "rgba(239, 91, 42, 0.14)",
      "--editor-bg": "rgba(255, 251, 242, 0.92)",
      "--editor-border": "rgba(130, 73, 18, 0.1)",
      "--shadow": "0 32px 90px rgba(153, 88, 38, 0.2)",
      "--danger": "#a61b1b",
      "--success": "#256f37",
      "--surface": "rgba(255, 250, 236, 0.92)",
      "--surface-strong": "rgba(255, 252, 243, 0.98)",
    },
  },
  {
    id: "autumn",
    label: "Autumn",
    description: "Burnt amber and orchard red",
    swatch: "linear-gradient(135deg, #d97706 0%, #8b3a1a 100%)",
    palette: {
      "--bg-top": "#fae2c0",
      "--bg-bottom": "#d8b08c",
      "--text": "#432016",
      "--text-muted": "rgba(67, 32, 22, 0.7)",
      "--panel": "rgba(255, 247, 237, 0.72)",
      "--panel-strong": "rgba(255, 244, 228, 0.88)",
      "--panel-soft": "rgba(255, 242, 221, 0.58)",
      "--border": "rgba(99, 55, 27, 0.16)",
      "--accent": "#9a3412",
      "--accent-soft": "rgba(154, 52, 18, 0.14)",
      "--editor-bg": "rgba(255, 248, 239, 0.92)",
      "--editor-border": "rgba(99, 55, 27, 0.1)",
      "--shadow": "0 32px 90px rgba(101, 52, 23, 0.2)",
      "--danger": "#9b1c1c",
      "--success": "#2f6f45",
      "--surface": "rgba(255, 247, 235, 0.92)",
      "--surface-strong": "rgba(255, 249, 241, 0.98)",
    },
  },
  {
    id: "winter",
    label: "Winter",
    description: "Cool frost and midnight blue",
    swatch: "linear-gradient(135deg, #cce7ff 0%, #6f89b4 100%)",
    palette: {
      "--bg-top": "#edf6ff",
      "--bg-bottom": "#bed7ef",
      "--text": "#17314f",
      "--text-muted": "rgba(23, 49, 79, 0.7)",
      "--panel": "rgba(248, 252, 255, 0.74)",
      "--panel-strong": "rgba(245, 250, 255, 0.9)",
      "--panel-soft": "rgba(241, 248, 255, 0.56)",
      "--border": "rgba(23, 49, 79, 0.12)",
      "--accent": "#2f6ea6",
      "--accent-soft": "rgba(47, 110, 166, 0.14)",
      "--editor-bg": "rgba(252, 254, 255, 0.94)",
      "--editor-border": "rgba(23, 49, 79, 0.08)",
      "--shadow": "0 32px 90px rgba(42, 77, 125, 0.18)",
      "--danger": "#9b1c1c",
      "--success": "#1e7b5f",
      "--surface": "rgba(247, 252, 255, 0.92)",
      "--surface-strong": "rgba(252, 254, 255, 0.98)",
    },
  },
  {
    id: "spring",
    label: "Spring",
    description: "Fresh greens and blossom blush",
    swatch: "linear-gradient(135deg, #9dd9a1 0%, #ffd6e0 100%)",
    palette: {
      "--bg-top": "#eef9e8",
      "--bg-bottom": "#ffe1ea",
      "--text": "#214132",
      "--text-muted": "rgba(33, 65, 50, 0.72)",
      "--panel": "rgba(255, 255, 252, 0.74)",
      "--panel-strong": "rgba(255, 255, 250, 0.9)",
      "--panel-soft": "rgba(252, 255, 246, 0.58)",
      "--border": "rgba(33, 65, 50, 0.12)",
      "--accent": "#2f855a",
      "--accent-soft": "rgba(47, 133, 90, 0.14)",
      "--editor-bg": "rgba(255, 255, 250, 0.94)",
      "--editor-border": "rgba(33, 65, 50, 0.08)",
      "--shadow": "0 32px 90px rgba(56, 94, 72, 0.18)",
      "--danger": "#a61b3d",
      "--success": "#1d7a4f",
      "--surface": "rgba(255, 255, 249, 0.92)",
      "--surface-strong": "rgba(255, 255, 253, 0.98)",
    },
  },
  {
    id: "ocean",
    label: "Ocean",
    description: "Deep teal and coastal blue",
    swatch: "linear-gradient(135deg, #0f766e 0%, #38bdf8 100%)",
    palette: {
      "--bg-top": "#d9f7f4",
      "--bg-bottom": "#b5e5ff",
      "--text": "#103a4d",
      "--text-muted": "rgba(16, 58, 77, 0.7)",
      "--panel": "rgba(250, 255, 255, 0.72)",
      "--panel-strong": "rgba(244, 253, 255, 0.9)",
      "--panel-soft": "rgba(237, 251, 255, 0.56)",
      "--border": "rgba(16, 58, 77, 0.12)",
      "--accent": "#0f766e",
      "--accent-soft": "rgba(15, 118, 110, 0.14)",
      "--editor-bg": "rgba(252, 255, 255, 0.94)",
      "--editor-border": "rgba(16, 58, 77, 0.08)",
      "--shadow": "0 32px 90px rgba(20, 85, 107, 0.18)",
      "--danger": "#b42318",
      "--success": "#087443",
      "--surface": "rgba(246, 255, 255, 0.92)",
      "--surface-strong": "rgba(252, 255, 255, 0.98)",
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    description: "Peach skies and plum dusk",
    swatch: "linear-gradient(135deg, #ff9f7f 0%, #5f4b8b 100%)",
    palette: {
      "--bg-top": "#ffe1d7",
      "--bg-bottom": "#d7c8f1",
      "--text": "#3f274d",
      "--text-muted": "rgba(63, 39, 77, 0.72)",
      "--panel": "rgba(255, 248, 251, 0.72)",
      "--panel-strong": "rgba(255, 246, 250, 0.9)",
      "--panel-soft": "rgba(255, 242, 248, 0.56)",
      "--border": "rgba(63, 39, 77, 0.12)",
      "--accent": "#c0567b",
      "--accent-soft": "rgba(192, 86, 123, 0.14)",
      "--editor-bg": "rgba(255, 252, 255, 0.94)",
      "--editor-border": "rgba(63, 39, 77, 0.08)",
      "--shadow": "0 32px 90px rgba(87, 59, 101, 0.2)",
      "--danger": "#9c1e47",
      "--success": "#226f54",
      "--surface": "rgba(255, 249, 252, 0.92)",
      "--surface-strong": "rgba(255, 253, 255, 0.98)",
    },
  },
];

const state = {
  sessionId: crypto.randomUUID(),
  notes: [],
  activeNoteId: null,
  activeNote: null,
  activeSnapshot: null,
  saveTimer: null,
  eventSource: null,
  isHydrating: false,
  isSaving: false,
  selectedTheme: localStorage.getItem("notecollab-theme") || "system",
  presenceCount: 0,
};

const elements = {
  notesList: document.querySelector("#notes-list"),
  noteCount: document.querySelector("#note-count"),
  createNoteButton: document.querySelector("#create-note-btn"),
  titleInput: document.querySelector("#note-title-input"),
  editor: document.querySelector("#note-editor"),
  saveButton: document.querySelector("#save-note-btn"),
  exportTxtButton: document.querySelector("#export-txt-btn"),
  exportPdfButton: document.querySelector("#export-pdf-btn"),
  saveState: document.querySelector("#save-state"),
  presenceCount: document.querySelector("#presence-count"),
  wordCount: document.querySelector("#word-count"),
  updatedAt: document.querySelector("#updated-at"),
  themeGrid: document.querySelector("#theme-grid"),
  supportTrigger: document.querySelector("#support-trigger"),
  supportModal: document.querySelector("#support-modal"),
  supportClose: document.querySelector("#support-close"),
  supportForm: document.querySelector("#support-form"),
  supportEmail: document.querySelector("#support-email"),
  supportMessage: document.querySelector("#support-message"),
  supportSend: document.querySelector("#support-send"),
  supportEmailError: document.querySelector("#support-email-error"),
  supportMessageError: document.querySelector("#support-message-error"),
  supportSuccess: document.querySelector("#support-success"),
  toastContainer: document.querySelector("#toast-container"),
};

const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

initializeApp();

async function initializeApp() {
  renderThemeButtons();
  applyTheme(state.selectedTheme);
  bindEvents();
  await loadBootstrap();
}

function bindEvents() {
  elements.createNoteButton.addEventListener("click", createNote);
  elements.saveButton.addEventListener("click", () => persistActiveNote({ force: true }));
  elements.titleInput.addEventListener("input", handleEditorInput);
  elements.editor.addEventListener("input", handleEditorInput);

  elements.notesList.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-note-id]");

    if (!button) {
      return;
    }

    await switchToNote(button.dataset.noteId);
  });

  elements.supportTrigger.addEventListener("click", openSupportModal);
  elements.supportClose.addEventListener("click", closeSupportModal);
  elements.supportModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true") {
      closeSupportModal();
    }
  });
  elements.supportForm.addEventListener("submit", submitSupportForm);

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      persistActiveNote({ force: true });
    }

    if (event.key === "Escape" && !elements.supportModal.classList.contains("hidden")) {
      closeSupportModal();
    }
  });

  systemThemeQuery.addEventListener("change", () => {
    if (state.selectedTheme === "system") {
      applyTheme("system");
    }
  });
}

async function loadBootstrap() {
  setSaveState("Loading note...");

  try {
    const payload = await fetchJson("/api/bootstrap");
    state.notes = payload.notes || [];
    renderNotes();

    if (payload.activeNote) {
      hydrateActiveNote(payload.activeNote);
      connectEvents(payload.activeNote.id);
    }

    setSaveState("All changes saved");
  } catch (error) {
    setSaveState("Load failed");
    showToast(error.message || "Unable to load NoteCollab right now.", "error");
  }
}

function renderThemeButtons() {
  elements.themeGrid.innerHTML = themePresets
    .map(
      (theme) => `
        <button class="theme-button" type="button" data-theme-id="${theme.id}">
          <span class="theme-swatch" style="background:${theme.swatch}"></span>
          <span class="theme-copy">
            <strong>${theme.label}</strong>
            <small>${theme.description}</small>
          </span>
        </button>
      `,
    )
    .join("");

  elements.themeGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-id]");

    if (!button) {
      return;
    }

    state.selectedTheme = button.dataset.themeId;
    localStorage.setItem("notecollab-theme", state.selectedTheme);
    applyTheme(state.selectedTheme);
  });
}

function applyTheme(themeId) {
  const root = document.documentElement;
  const palette = resolveThemePalette(themeId);

  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  document.querySelectorAll(".theme-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.themeId === themeId);
  });
}

function resolveThemePalette(themeId) {
  if (themeId === "system") {
    return systemThemeQuery.matches
      ? themePresets.find((theme) => theme.id === "dark").palette
      : themePresets.find((theme) => theme.id === "light").palette;
  }

  return themePresets.find((theme) => theme.id === themeId)?.palette
    || themePresets.find((theme) => theme.id === "light").palette;
}

function renderNotes() {
  elements.noteCount.textContent = String(state.notes.length);

  if (state.notes.length === 0) {
    elements.notesList.innerHTML = `
      <div class="note-card">
        <div class="note-card-body">
          <p class="note-card-title">No notes yet</p>
          <p class="note-card-preview">Create your first note to start collaborating.</p>
        </div>
      </div>
    `;
    return;
  }

  elements.notesList.innerHTML = state.notes
    .map(
      (note) => `
        <button class="note-card ${note.id === state.activeNoteId ? "active" : ""}" type="button" data-note-id="${note.id}">
          <div class="note-card-body">
            <p class="note-card-title">${escapeHtml(note.title)}</p>
            <p class="note-card-preview">${escapeHtml(note.preview)}</p>
            <p class="note-card-meta">Updated ${formatTimestamp(note.updatedAt)}</p>
          </div>
        </button>
      `,
    )
    .join("");
}

async function switchToNote(noteId) {
  if (!noteId || noteId === state.activeNoteId) {
    return;
  }

  await flushPendingSave();

  try {
    const payload = await fetchJson(`/api/notes/${noteId}`);
    hydrateActiveNote(payload.note);
    connectEvents(noteId);
    setSaveState("All changes saved");
  } catch (error) {
    showToast(error.message || "Unable to switch to that note.", "error");
  }
}

async function createNote() {
  await flushPendingSave();
  elements.createNoteButton.disabled = true;

  try {
    const payload = await fetchJson("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title: "Untitled note", content: "" }),
    });

    state.notes = payload.notes || [];
    renderNotes();
    hydrateActiveNote(payload.note);
    connectEvents(payload.note.id);
    showToast("Fresh note created and ready to share.", "success");
  } catch (error) {
    showToast(error.message || "Unable to create a new note.", "error");
  } finally {
    elements.createNoteButton.disabled = false;
  }
}

function hydrateActiveNote(note) {
  if (state.saveTimer) {
    clearTimeout(state.saveTimer);
    state.saveTimer = null;
  }

  state.isHydrating = true;
  state.activeNoteId = note.id;
  state.activeNote = note;
  state.activeSnapshot = {
    title: note.title,
    content: note.content,
    version: note.version,
  };
  state.presenceCount = 0;

  elements.titleInput.value = note.title;
  elements.editor.value = note.content;
  syncMeta();
  syncExportLinks();
  renderNotes();
  state.isHydrating = false;
}

function handleEditorInput() {
  if (state.isHydrating || !state.activeNoteId) {
    return;
  }

  setSaveState("Typing...");
  syncMeta();

  clearTimeout(state.saveTimer);
  state.saveTimer = window.setTimeout(() => {
    persistActiveNote();
  }, 600);
}

async function flushPendingSave() {
  if (!state.activeNoteId) {
    return;
  }

  if (state.saveTimer) {
    clearTimeout(state.saveTimer);
    state.saveTimer = null;
  }

  if (hasUnsavedChanges()) {
    await persistActiveNote();
  }
}

async function persistActiveNote({ force = false } = {}) {
  if (!state.activeNoteId || state.isSaving) {
    return;
  }

  const payload = {
    title: elements.titleInput.value.trim() || "Untitled note",
    content: elements.editor.value,
  };

  if (!force && !hasUnsavedChanges()) {
    setSaveState("All changes saved");
    return;
  }

  state.isSaving = true;
  setSaveState("Saving...");

  try {
    const response = await fetchJson(`/api/notes/${state.activeNoteId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        sourceId: state.sessionId,
      }),
    });

    applyIncomingNote(response.note, true);
    setSaveState("All changes saved");
  } catch (error) {
    setSaveState("Save failed");
    showToast(error.message || "We could not save the latest changes.", "error");
  } finally {
    state.isSaving = false;
  }
}

function applyIncomingNote(note, isLocal) {
  updateOrInsertNoteSummary(note);
  state.activeNote = note;
  state.activeSnapshot = {
    title: note.title,
    content: note.content,
    version: note.version,
  };

  if (!isLocal || elements.titleInput.value !== note.title || elements.editor.value !== note.content) {
    state.isHydrating = true;
    elements.titleInput.value = note.title;
    elements.editor.value = note.content;
    state.isHydrating = false;
  }

  syncMeta();
  syncExportLinks();
  renderNotes();
}

function updateOrInsertNoteSummary(note) {
  const summary = {
    id: note.id,
    title: note.title,
    preview: createPreview(note.content),
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    version: note.version,
  };
  const existingIndex = state.notes.findIndex((item) => item.id === note.id);

  if (existingIndex >= 0) {
    state.notes.splice(existingIndex, 1, summary);
  } else {
    state.notes.unshift(summary);
  }

  state.notes.sort((left, right) => new Date(right.updatedAt) - new Date(left.updatedAt));
}

function connectEvents(noteId) {
  if (state.eventSource) {
    state.eventSource.close();
  }

  const eventSource = new EventSource(`/api/events?noteId=${encodeURIComponent(noteId)}`);
  state.eventSource = eventSource;

  eventSource.addEventListener("note-updated", (event) => {
    const payload = JSON.parse(event.data);
    const fromCurrentSession = payload.sourceId === state.sessionId;

    if (!payload.note) {
      return;
    }

    if (payload.note.id === state.activeNoteId) {
      applyIncomingNote(payload.note, fromCurrentSession);

      if (!fromCurrentSession) {
        setSaveState("Synced from collaborator");
        showToast("A collaborator updated this note. Latest version loaded.", "success");
      }
    } else {
      updateOrInsertNoteSummary(payload.note);
      renderNotes();
    }
  });

  eventSource.addEventListener("notes-changed", (event) => {
    const payload = JSON.parse(event.data);

    if (!payload.note) {
      return;
    }

    updateOrInsertNoteSummary(payload.note);
    renderNotes();
  });

  eventSource.addEventListener("presence", (event) => {
    const payload = JSON.parse(event.data);

    if (payload.noteId === state.activeNoteId) {
      state.presenceCount = payload.count;
      syncMeta();
    }
  });

  eventSource.onerror = () => {
    setSaveState("Reconnecting...");
  };
}

function syncExportLinks() {
  if (!state.activeNoteId) {
    elements.exportTxtButton.href = "#";
    elements.exportPdfButton.href = "#";
    return;
  }

  elements.exportTxtButton.href = `/api/export/${state.activeNoteId}.txt`;
  elements.exportPdfButton.href = `/api/export/${state.activeNoteId}.pdf`;
}

function syncMeta() {
  elements.wordCount.textContent = String(countWords(elements.editor.value));
  elements.updatedAt.textContent = state.activeNote ? formatTimestamp(state.activeNote.updatedAt) : "-";
  elements.presenceCount.textContent = `${state.presenceCount} viewing`;
}

function hasUnsavedChanges() {
  if (!state.activeSnapshot) {
    return false;
  }

  return (
    (elements.titleInput.value.trim() || "Untitled note") !== state.activeSnapshot.title ||
    elements.editor.value !== state.activeSnapshot.content
  );
}

function setSaveState(text) {
  elements.saveState.textContent = text;
}

function openSupportModal() {
  elements.supportModal.classList.remove("hidden");
  elements.supportModal.setAttribute("aria-hidden", "false");
  elements.supportEmail.focus();
}

function closeSupportModal() {
  elements.supportModal.classList.add("hidden");
  elements.supportModal.setAttribute("aria-hidden", "true");
}

async function submitSupportForm(event) {
  event.preventDefault();

  const email = elements.supportEmail.value.trim();
  const message = elements.supportMessage.value.trim();
  let valid = true;

  elements.supportEmailError.textContent = "";
  elements.supportMessageError.textContent = "";
  elements.supportSuccess.classList.add("hidden");
  elements.supportSuccess.textContent = "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    elements.supportEmailError.textContent = "Enter a valid email address.";
    valid = false;
  }

  if (message.length < 10) {
    elements.supportMessageError.textContent = "Please add at least 10 characters.";
    valid = false;
  }

  if (!valid) {
    return;
  }

  elements.supportSend.disabled = true;

  try {
    const response = await fetchJson("/api/support", {
      method: "POST",
      body: JSON.stringify({ email, message }),
    });

    elements.supportForm.reset();
    elements.supportSuccess.textContent = response.message;
    elements.supportSuccess.classList.remove("hidden");
    showToast("Support request sent successfully.", "success");

    window.setTimeout(() => {
      closeSupportModal();
      elements.supportSuccess.classList.add("hidden");
      elements.supportSuccess.textContent = "";
    }, 1400);
  } catch (error) {
    showToast(error.message || "Unable to send your support request.", "error");
  } finally {
    elements.supportSend.disabled = false;
  }
}

function showToast(message, tone = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${tone}`;
  toast.textContent = message;
  elements.toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 2600);
}

function countWords(text) {
  const words = String(text || "")
    .trim()
    .match(/\S+/g);

  return words ? words.length : 0;
}

function createPreview(text) {
  return (
    String(text || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "Ready for your next idea."
  );
}

function formatTimestamp(value) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : {};

  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }

  return payload;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
