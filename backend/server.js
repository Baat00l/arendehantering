// Enkel Express-server för CRUD på ärenden
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hämta alla ärenden
app.get('/tickets', (req, res) => {
  db.all('SELECT * FROM tickets ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(rows);
  });
});

// Skapa nytt ärende
app.post('/tickets', (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const created_at = new Date().toISOString();

  db.run(
    `INSERT INTO tickets (title, description, status, created_at) VALUES (?, ?, ?, ?)`,
    [title, description, status, created_at],
    function (err) {
      if (err) return res.status(500).json({ error: 'Database error' });

      res.status(201).json({
        id: this.lastID,
        title,
        description,
        status,
        created_at
      });
    }
  );
});

// Uppdatera ärende
app.put('/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  db.run(
    `UPDATE tickets SET title = ?, description = ?, status = ? WHERE id = ?`,
    [title, description, status, id],
    function (err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });

      res.json({ id, title, description, status });
    }
  );
});

// Ta bort ärende
app.delete('/tickets/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM tickets WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });

    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Server körs på http://localhost:${PORT}`);
});