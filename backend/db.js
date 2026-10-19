const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS sports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_name VARCHAR(120),
        position VARCHAR(60),
        jersey_number INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.get("SELECT COUNT(*) AS count FROM sports", (err, row) => {
        if (row.count === 0) {
            const insertData = `INSERT INTO sports (player_name, position, jersey_number) VALUES 
                ('John Banda', 'Striker', 9),
                ('Musonda Zulu', 'Goalkeeper', 1),
                ('Chileshe Mwansa', 'Defender', 4),
                ('Emmanuel Phiri', 'Midfielder', 8),
                ('Lungu Tembo', 'Winger', 11),
                ('Isaac Mulenga', 'Defender', 5),
                ('Patrick Sakala', 'Midfielder', 6),
                ('Kelvin Kunda', 'Striker', 10),
                ('Brian Mwape', 'Goalkeeper', 12),
                ('Danny Silavwe', 'Winger', 7)`;
            db.run(insertData);
            console.log('10 sample players inserted.');
        }
    });
});
module.exports = db;