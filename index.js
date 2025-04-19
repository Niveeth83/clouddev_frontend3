const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

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

// API to return student list
app.get('/api/students', (req, res) => {
  const query = 'SELECT id, name, email, age, department FROM student';
  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Error fetching data:', err);
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
