const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskify'
});


const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Database Table Creation
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      data LONGBLOB NOT NULL,
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  connection.query(createTableQuery, err => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully');
  });
});

// Serve Page 1 HTML
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'firstpage.html'));
});
// Serve Page 2 HTML
app.get('/page2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'secondpage.html'));
});

// Retrieve Files from the Database
app.get('/files', (req, res) => {
  const selectQuery = 'SELECT id, name FROM files'; // Only select necessary fields
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error retrieving files from database:', err); // Log the error
      return res.status(500).send('Error retrieving files from database.');
    }
    res.json(results);
  });
});


// Handle File Upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { originalname, buffer } = req.file;
  const insertQuery = 'INSERT INTO files (name, data) VALUES (?, ?)';
  connection.query(insertQuery, [originalname, buffer], (err, result) => {
    if (err) {
      console.error('Error inserting file into database:', err);
      return res.status(500).send('Error uploading file.');
    }
    console.log('File uploaded successfully');
    res.sendStatus(200);
  });
});

// Serve Files for Download
app.get('/download/:id', (req, res) => {
  const fileId = req.params.id;
  const selectQuery = 'SELECT * FROM files WHERE id = ?';
  connection.query(selectQuery, [fileId], (err, results) => {
    if (err) {
      console.error('Error retrieving file from database:', err);
      return res.status(500).send('Error downloading file.');
    }
    if (results.length === 0) {
      return res.status(404).send('File not found.');
    }
    const file = results[0];
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    res.send(file.data);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
