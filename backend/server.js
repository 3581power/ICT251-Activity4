const express = require('express');
const cors = require('cors');
const { initDb, getDb } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET ALL
app.get('/api/sports', (req, res) => {
    const db = getDb();
    const result = db.exec("SELECT * FROM sports ORDER BY id ASC");
    
    if (result.length === 0) return res.json([]);
    
    // Convert SQL result to JSON
    const columns = result[0].columns;
    const values = result[0].values;
    const players = values.map(row => {
        let obj = {};
        columns.forEach((col, index) => obj[col] = row[index]);
        return obj;
    });
    res.json(players);
});

// POST
app.post('/api/sports', (req, res) => {
    const { player_name, position, jersey_number } = req.body;
    const db = getDb();
    db.run("INSERT INTO sports (player_name, position, jersey_number) VALUES (?, ?, ?)", [player_name, position, jersey_number]);
    res.status(201).json({ message: "Player added" });
});

// PUT
app.put('/api/sports/:id', (req, res) => {
    const { player_name, position, jersey_number } = req.body;
    const db = getDb();
    db.run("UPDATE sports SET player_name = ?, position = ?, jersey_number = ? WHERE id = ?", [player_name, position, jersey_number, req.params.id]);
    res.json({ message: "Player updated" });
});

// DELETE
app.delete('/api/sports/:id', (req, res) => {
    const db = getDb();
    db.run("DELETE FROM sports WHERE id = ?", [req.params.id]);
    res.json({ message: "Player deleted" });
});

// Start server only after DB is ready
const PORT = process.env.PORT || 3000;
initDb().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});