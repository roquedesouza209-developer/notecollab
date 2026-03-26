# NoteCollab

NoteCollab is a real-time collaborative notes web app for writing, saving, exporting, and sharing notes in one lightweight workspace.

## What is included
- Write and save notes inside the app
- Real-time note syncing across multiple open clients using server-sent events
- Download notes as `.txt` or `.pdf`
- Theme switcher with `Light`, `Dark`, `System`, `Summer`, `Autumn`, `Winter`, `Spring`, `Ocean`, and `Sunset`
- Floating support widget in the bottom-right corner
- Support form validation and SQLite-backed support request storage
- Autosave, manual save, word count, and active viewer count

## Tech stack
- Node.js 24
- Native `node:sqlite` database
- Vanilla HTML, CSS, and JavaScript
- Server-sent events for live updates

## Run locally
1. Make sure you are using Node.js `24+`
2. Start the app:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project structure
- `server.js`: HTTP server, API routes, SQLite storage, exports, and live collaboration events
- `public/index.html`: app layout
- `public/styles.css`: responsive UI and theme styling
- `public/app.js`: client-side state, autosave, live sync, support modal, and theme switching

## Notes
- The current collaboration model is `last write wins`, which keeps the first version simple and fast.
- Support requests are stored in `data/notecollab.db`.

## Good next upgrades
- Shared links or authentication
- Live cursor presence
- Rich text editing
- Version history and restore
- Comments and mentions
