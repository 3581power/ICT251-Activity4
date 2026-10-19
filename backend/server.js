const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
// Serve the frontend files from the 'public' folder
app.use(express.static('public')); 

// 1. GET ALL
app.get('/api/sports', (req, res) => {
    db.all("SELECT * FROM sports ORDER BY id ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 2. GET ONE
app.get('/api/sports/:id', (req, res) => {
    db.get("SELECT * FROM sports WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// 3. POST
app.post('/api/sports', (req, res) => {
    const { player_name, position, jersey_number } = req.body;
    db.run("INSERT INTO sports (player_name, position, jersey_number) VALUES (?, ?, ?)", 
    [player_name, position, jersey_number], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, player_name, position, jersey_number });
    });
});

// 4. PUT
app.put('/api/sports/:id', (req, res) => {
    const { player_name, position, jersey_number } = req.body;
    db.run("UPDATE sports SET player_name = ?, position = ?, jersey_number = ? WHERE id = ?", 
    [player_name, position, jersey_number, req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Updated" });
    });
});

// 5. DELETE
app.delete('/api/sports/:id', (req, res) => {
    db.run("DELETE FROM sports WHERE id = ?", [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));