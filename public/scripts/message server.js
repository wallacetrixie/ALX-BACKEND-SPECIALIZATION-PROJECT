const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const port = 3000;
const fs = require('fs');
const multer = require('multer');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'taskify'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
app.use(express.static(path.join(__dirname, 'public')));

// Serve Page 1 HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});
app.use(bodyParser.json());
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

app.post('/send-message', (req, res) => {
    const messageContent = req.body.content;
    const query = 'INSERT INTO page1 (content) VALUES (?)';
    connection.query(query, [messageContent], (error, results) => {
        if (error) {
            console.error('Error inserting message into page1 table:', error);
            res.status(500).send('Error inserting message into page1 table');
            return;
        }
        console.log('Message inserted into page1 table:', results);
        res.status(200).send('Message inserted into page1 table');
    });
});

app.post('/send-message-page2', (req, res) => {
    const messageContent = req.body.content;
    const query = 'INSERT INTO page2 (content) VALUES (?)';
    connection.query(query, [messageContent], (error, results) => {
        if (error) {
            console.error('Error inserting message into page2 table:', error);
            res.status(500).send('Error inserting message into page2 table');
            return;
        }
        console.log('Message inserted into page2 table:', results);
        res.status(200).send('Message inserted into page2 table');
    });
});
app.get('/page1-messages', (req, res) => {
    const query = 'SELECT * FROM page1 ORDER BY timestamp DESC';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching messages from page1 table:', error);
            res.status(500).send('Error fetching messages from page1 table');
            return;
        }
        console.log('Messages fetched from page1 table:', results);
        res.status(200).json(results);
    });
});
app.get('/page2-messages', (req, res) => {
    const query = 'SELECT * FROM page2 ORDER BY timestamp DESC';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching messages from page2 table:', error);
            res.status(500).send('Error fetching messages from page2 table');
            return;
        }
        console.log('Messages fetched from page2 table:', results);
        res.status(200).json(results);
    });
});


app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
