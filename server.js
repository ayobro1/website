const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Setup
const db = new sqlite3.Database('./messages.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            project TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
        });
        
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            }
        });
    }
});

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, project, message } = req.body;

    const sql = `INSERT INTO messages (name, email, project, message) VALUES (?, ?, ?, ?)`;
    const params = [name, email, project, message];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Error inserting message:', err.message);
            res.status(500).json({ success: false, message: 'Failed to save message.' });
            return;
        }

        console.log(`Message received and saved with ID: ${this.lastID}`);
        res.status(200).json({
            success: true,
            message: 'Message received and saved successfully!'
        });
    });
});

app.post('/api/signup', (req, res) => {
    const { fullname, username, email, password } = req.body;

    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const sql = `INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)`;
    const params = [fullname, username, email, password];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Error creating user:', err.message);
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ success: false, message: 'Username or email already exists.' });
            }
            return res.status(500).json({ success: false, message: 'Failed to create account.' });
        }

        console.log(`User created with ID: ${this.lastID}`);
        res.status(200).json({
            success: true,
            message: 'Account created successfully!',
            userId: this.lastID
        });
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const params = [email, password];

    db.get(sql, params, (err, user) => {
        if (err) {
            console.error('Error during login:', err.message);
            return res.status(500).json({ success: false, message: 'Login failed.' });
        }

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        console.log(`User logged in: ${user.email}`);
        res.status(200).json({
            success: true,
            message: 'Login successful!',
            user: {
                id: user.id,
                fullname: user.fullname,
                username: user.username,
                email: user.email
            }
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
