const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

let db;

// This function loads the database into memory
async function initDb() {
    const SQL = await initSqlJs();
    db = new SQL.Database();

    // Create table
    db.run(`
        CREATE TABLE IF NOT EXISTS sports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            player_name VARCHAR(120),
            position VARCHAR(60),
            jersey_number INTEGER
        )
    `);

    // Insert 10 sample players
    const stmt = db.prepare("INSERT INTO sports (player_name, position, jersey_number) VALUES (?, ?, ?)");
    const players = [
        ['John Banda', 'Striker', 9], ['Musonda Zulu', 'Goalkeeper', 1],
        ['Chileshe Mwansa', 'Defender', 4], ['Emmanuel Phiri', 'Midfielder', 8],
        ['Lungu Tembo', 'Winger', 11], ['Isaac Mulenga', 'Defender', 5],
        ['Patrick Sakala', 'Midfielder', 6], ['Kelvin Kunda', 'Striker', 10],
        ['Brian Mwape', 'Goalkeeper', 12], ['Danny Silavwe', 'Winger', 7]
    ];
    players.forEach(p => stmt.run(p));
    stmt.free();
    console.log("10 sample players inserted into memory.");
}

module.exports = { initDb, getDb: () => db };