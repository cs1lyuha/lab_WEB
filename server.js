const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serving all HTML, CSS, JS files in the project

// Initialize Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            password TEXT
        )`);
    }
});

// Route for Registration (Autentificare/Înregistrare)
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email și parola sunt necesare.' });
    }
    
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(query, [email, password], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(409).json({ error: 'Acest cont există deja!' });
            }
            return res.status(500).json({ error: 'Eroare la salvarea în baza de date.' });
        }
        res.status(201).json({ message: 'Cont creat cu succes!' });
    });
});

// Route for Login (Logare)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email și parola sunt necesare.' });
    }

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.get(query, [email, password], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Eroare server.' });
        }
        if (row) {
            res.status(200).json({ message: 'Logare reușită.' });
        } else {
            res.status(401).json({ error: 'Email sau parolă incorecte!' });
        }
    });
});

// --- ADMIN ROUTES ---

// Admin Authentication
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'Admin' && password === 'cs123123') {
        return res.status(200).json({ message: 'Admin autentificat', token: 'admin_token_123' });
    }
    return res.status(401).json({ error: 'Date incorecte pentru Admin!' });
});

// Admin Get Users
app.get('/api/admin/users', (req, res) => {
    // Într-un mediu de producție, acest token trebuie verificat (middleware)
    const token = req.headers.authorization;
    if (token !== 'admin_token_123') {
        return res.status(403).json({ error: 'Acces interzis. Lipsă autorizație Admin.' });
    }

    db.all(`SELECT id, email, password FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// --------------------

// Start the server
app.listen(PORT, () => {
    console.log(`Server rulează pe http://localhost:${PORT}`);
});
