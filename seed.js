const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

const dummyUsers = [];
for (let i = 1; i <= 15; i++) {
    dummyUsers.push([`user${i}@example.com`, `pass_${i}_word`]);
}

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
    )`);

    const stmt = db.prepare(`INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)`);
    for (const user of dummyUsers) {
        stmt.run(user);
    }
    stmt.finalize();
});

db.close(() => {
    console.log("Am inserat cele 15 conturi dummy în baza de date.");
});
