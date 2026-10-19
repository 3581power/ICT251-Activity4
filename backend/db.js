const Database = require('better-sqlite3');
const path = require('path');

// Save database in /tmp for Render, or local file for your computer
const dbPath = process.env.RENDER ? '/tmp/database.sqlite' : path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Create table
db.exec(`
    CREATE TABLE IF NOT EXISTS sports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_name VARCHAR(120),
        position VARCHAR(60),
        jersey_number INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// Insert 10 players if empty
const count = db.prepare('SELECT COUNT(*) AS count FROM sports').get();
if (count.count === 0) {
    const insert = db.prepare(`INSERT INTO sports (player_name, position, jersey_number) VALUES (?, ?, ?)`);
    const players = [
        ['John Banda', 'Striker', 9], ['Musonda Zulu', 'Goalkeeper', 1],
        ['Chileshe Mwansa', 'Defender', 4], ['Emmanuel Phiri', 'Midfielder', 8],
        ['Lungu Tembo', 'Winger', 11], ['Isaac Mulenga', 'Defender', 5],
        ['Patrick Sakala', 'Midfielder', 6], ['Kelvin Kunda', 'Striker', 10],
        ['Brian Mwape', 'Goalkeeper', 12], ['Danny Silavwe', 'Winger', 7]
    ];
    players.forEach(p => insert.run(p[0], p[1], p[2]));
    console.log('10 sample players inserted.');
}