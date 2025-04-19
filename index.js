const express = require('express');
const mysql = require('mysql2');
const app = express();

const db = mysql.createConnection({
  host: 'clouddev-mysql-niveeth.mysql.database.azure.com',
  user: 'admin123',
  password: 'Niveeth@83',
  database: 'students',
  port: 3306,
  ssl: {
    rejectUnauthorized: true
  }
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

app.get('/api/students', (req, res) => {
  db.query('SELECT * FROM student', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch students' });
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
