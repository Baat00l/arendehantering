3# Teknisk dokumentation

## Valda tekniker
Jag valde en enkel stack som är lätt att förstå och bygga vidare på:

- **Node.js + Express** för backend
- **SQLite** som databas (filbaserad, enkel att använda)
- **HTML, CSS och JavaScript** för frontend

## Arkitektur
Projektet är uppdelat i tre delar:

### Backend
Backend ligger i mappen `/backend` och består av:
- `server.js` – Express‑servern och alla CRUD‑endpoints
- `db.js` – SQLite‑databasen och tabellskapande

API‑endpoints:
- `GET /tickets` – hämta alla ärenden
- `POST /tickets` – skapa nytt ärende
- `PUT /tickets/:id` – uppdatera ärende
- `DELETE /tickets/:id` – ta bort ärende

### Frontend
Frontend ligger i `/frontend` och består av:
- `index.html` – strukturen för sidan
- `style.css` – enkel styling
- `app.js` – logik för att hämta och skicka data till API:t

Frontend använder `fetch()` för att kommunicera med backend.

### Datamodell
Tabell: **tickets**

| fält        | typ     | beskrivning |
|-------------|---------|-------------|
| id          | INTEGER | Primärnyckel |
| title       | TEXT    | Ärendets titel |
| description | TEXT    | Beskrivning |
| status      | TEXT    | Öppen / Pågående / Klar |
| created_at  | TEXT    | Datum då ärendet skapades |

## Projektstruktur
arendehantering/
backend/
server.js
db.js
frontend/
index.html
style.css
app.js
docs/
planering.md
teknisk-dokumentation.md
testning.md
README.md