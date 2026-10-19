const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 1. GET ALL
app.get('/api/sports', (req, res) => {
    const rows = db.prepare("SELECT * FROM sports ORDER BY id ASC").all();
    res.json(rows);
});

// 2. GET ONE
app.get('/api/sports/:id', (req, res) => {
    const row = db.prepare("SELECT * FROM sports WHERE id = ?").get(req.params.id);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(row);
});

// 3. POST
app.post('/api/sports', (req, res) => {
    const { player_name, position, jersey_number } = req.body;
    const info = db.prepare("INSERT INTO sports (player_name, position, jersey_number) VALUES (?, ?, ?)").run(player_name, position, jersey_number);
    res.status(201).json({ id: info.lastInsertRowid, player_name, position, jersey_number });
});

// 4. PUT
app.put('/api/sports/:id', (req, res) => {
    const { player_name, position, jersey_number } = req.body;
    db.prepare("UPDATE sports SET player_name = ?, position = ?, jersey_number = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(player_name, position, jersey_number, req.params.id);
    res.json({ message: "Updated" });
});

// 5. DELETE
app.delete('/api/sports/:id', (req, res) => {
    db.prepare("DELETE FROM sports WHERE id = ?").run(req.params.id);
    res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));