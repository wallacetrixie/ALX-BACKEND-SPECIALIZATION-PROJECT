const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const http = require("http");
const WebSocket = require("ws");
const multer = require("multer");
const fs = require("fs");
const app = express();
const port = 5011;
const server = http.createServer(app); 
const wss = new WebSocket.Server({ server });
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "taskify",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login_page.html"));
});


// Creating a MySQL session store
const sessionStore = new MySQLStore({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'taskify'
});

app.use(session({
  secret: "your-secret-key",
  resave: false, 
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


// Registration Route
app.post("/register", (req, res) => {
  const { username, password, confirmPassword, registrationType } = req.body;

  if (!username || !password || !confirmPassword || !registrationType) {
    res.send(
      '<script>alert("Please fill in all fields");window.location.href="/login_page.html";</script>'
    );
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    res.send(
      '<script>alert("Passwords do not match");window.location.href="/login_page.html";</script>'
    );
    return;
  }

  // Check if the username already exists
  const checkQuery = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
  connection.query(checkQuery, [username], (err, results) => {
    if (err) {
      console.error("Error checking username:", err.stack);
      res.send(
        '<script>alert("Error occurred. Please try again");window.location.href="/";</script>'
      );
      return;
    }

    if (results[0].count > 0) {
      res.send(
        '<script>alert("Username already exists. Please choose a different username");window.location.href="/";</script>'
      );
      return;
    } else {
      // Insert user details including registrationType
      const insertQuery = "INSERT INTO users (username, password, registrationType) VALUES (?, ?, ?)";
      connection.query(insertQuery, [username, password, registrationType], (err, results) => {
        if (err) {
          console.error("Error inserting user:", err.stack);
          res.send(
            '<script>alert("Error occurred. Please try again");window.location.href="/";</script>'
          );
          return;
        }

        console.log("User registered successfully");

        // Store the user's session details
        req.session.user = {
          username: username,
          registrationType: registrationType
        };

        // Redirect based on registrationType
        if (registrationType === "client") {
          res.redirect("client.html");
        } else if (registrationType === "freelancer") {
          res.redirect("freelancer.html");
        } else {
          // Handle invalid registration types
          res.send(
            '<script>alert("Invalid registration type");window.location.href="/login_page.html";</script>'
          );
        }
      });
    }
  });
});


// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error querying user:", err.stack);
      return res.status(500).send("Error querying user.");
    }

    if (results.length > 0) {
      // Store user information in the session
      req.session.user = {
        username: results[0].username,
        registrationType: results[0].registrationType // Retrieve registrationType from the database
      };

      // Redirect based on the registrationType
      if (req.session.user.registrationType === "client") {
        return res.redirect("client.html");
      } else if (req.session.user.registrationType === "freelancer") {
        return res.redirect("freelancer.html");
      } else {
        return res.redirect("/"); // Default fallback
      }
    } else {
      return res
        .status(401)
        .send("Incorrect username or password. Please try again.");
    }
  });
});



// FILE UPLOADS
const uploadDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/"));
});
app.get("/page2", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/"));
});

// Retrieve Files from the Database
app.get("/files", (req, res) => {
  const selectQuery = "SELECT id, name FROM files";
  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Error retrieving files from database:", err);
      return res.status(500).send("Error retrieving files from database.");
    }
    res.json(results);
  });
});

// Handle File Upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const { originalname, buffer } = req.file;
  const insertQuery = "INSERT INTO files (name, data) VALUES (?, ?)";
  connection.query(insertQuery, [originalname, buffer], (err, result) => {
    if (err) {
      console.error("Error inserting file into database:", err);
      return res.status(500).send("Error uploading file.");
    }
    console.log("File uploaded successfully");
    res.sendStatus(200);
  });
});

app.get("/download/:id", (req, res) => {
  const fileId = req.params.id;
  const selectQuery = "SELECT * FROM files WHERE id = ?";
  connection.query(selectQuery, [fileId], (err, results) => {
    if (err) {
      console.error("Error retrieving file from database:", err);
      return res.status(500).send("Error downloading file.");
    }
    if (results.length === 0) {
      return res.status(404).send("File not found.");
    }
    const file = results[0];
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
    res.send(file.data);
  });
});

app.use(bodyParser.json());
wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

app.post("/send-message", (req, res) => {
  const messageContent = req.body.content;
  const query = "INSERT INTO page1 (content) VALUES (?)";
  connection.query(query, [messageContent], (error, results) => {
    if (error) {
      console.error("Error inserting message into page1 table:", error);
      res.status(500).send("Error inserting message into page1 table");
      return;
    }
    console.log("Message inserted into page1 table:", results);
    res.status(200).send("Message inserted into page1 table");
  });
});

app.post("/send-message-page2", (req, res) => {
  const messageContent = req.body.content;
  const query = "INSERT INTO page2 (content) VALUES (?)";
  connection.query(query, [messageContent], (error, results) => {
    if (error) {
      console.error("Error inserting message into page2 table:", error);
      res.status(500).send("Error inserting message into page2 table");
      return;
    }
    console.log("Message inserted into page2 table:", results);
    res.status(200).send("Message inserted into page2 table");
  });
});
app.get("/page1-messages", (req, res) => {
  const query = "SELECT * FROM page1 ORDER BY timestamp DESC";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching messages from page1 table:", error);
      res.status(500).send("Error fetching messages from page1 table");
      return;
    }
    console.log("Messages fetched from page1 table:", results);
    res.status(200).json(results);
  });
});
app.get("/page2-messages", (req, res) => {
  const query = "SELECT * FROM page2 ORDER BY timestamp DESC";
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching messages from page2 table:", error);
      res.status(500).send("Error fetching messages from page2 table");
      return;
    }
    console.log("Messages fetched from page2 table:", results);
    res.status(200).json(results);
  });
});

// FREELNCERS AND CLIENTS PAGE
// Server endpoint to retrieve user details from the "details" table
app.get("/account", (req, res) => {
  connection.query("SELECT * FROM account", (err, results) => {
    if (err) {
      console.error("Error retrieving data from the database:", err);
      return res.status(500).send("Error retrieving data from the database");
    }
    res.json(results);
  });
});
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data from the database");
      throw err;
    }
    res.json(results);
  });
});
app.post("/submit", (req, res) => {
  const { name, title, description, amount } = req.body;
  if (!name || !title || !description || !amount) {
    return res.status(400).send("Please fill in all fields before submitting.");
  }
  const data = { name, title, description, amount };
  connection.query("INSERT INTO posts SET ?", data, (err, result) => {
    if (err) {
      console.error("Error submitting data to the database:", err);
      return res.status(500).send("Error submitting data to the database");
    }
    console.log("Data submitted to the database");
    res.redirect("/client.html");
  });
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});
app.post("/submit-profile", (req, res) => {
  const {
    name,
    email,
    country,
    city,
    specialization,
    education,
    achievements,
    bio,
    linkedin,
    twitter,
    facebook,
    instagram,
  } = req.body;

  const data = {
    name,
    email,
    country,
    city,
    specialization,
    education,
    achievements,
    bio,
    linkedin,
    twitter,
    facebook,
    instagram,
  };
  connection.query("INSERT INTO profiles SET ?", data, (err, result) => {
    if (err) {
      console.error("Error submitting data to the database:", err);
      res.status(500).send("Error submitting data to the database");
      return;
    }
    console.log("Data submitted to the database");
    res.redirect("/freelancer.html");
  });
});
// FETCHING DATA FROM THE PROFILES TABLE
app.get("/profiles", (req, res) => {
  connection.query("SELECT * FROM profiles", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data from the database");
      throw err;
    }
    res.json(results);
  });
});
// code to retrieve user details from the posts table
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data from the database");
      throw err;
    }
    res.json(results);
  });
});

app.post("/submit", (req, res) => {
  const { name, title, description, amount } = req.body;
  const data = { name, title, description, amount };
  connection.query("INSERT INTO posts SET ?", data, (err, result) => {
    if (err) {
      res.status(500).send("Error submitting data to the database");
      throw err;
    }
    console.log("Data submitted to the database");
    res.redirect("/client.html"); // Redirect to a success page
  });
});



// Route to handle form submissions for the details table
app.post("/submit-client", (req, res) => {
  const { name, email, phone, age, country, city} =
  req.body;
  const data = {
    name,
    email,
    phone,
    age,
    country,
    city,
  };

  connection.query("INSERT INTO clients SET ?", data, (err, result) => {
    if (err) {
      res.status(500).send("Error submitting data to the database");
      throw err;
    }
    console.log("Data submitted to the database");
    res.redirect("/client.html"); // Redirect to a success page
  });
});
// code to retrieve user details from the details table
app.get("/clients", (req, res) => {
  connection.query("SELECT * FROM clients", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data from the database");
      throw err;
    }
    res.json(results);
  });
});

// Homepage route
app.get("/client.html", (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, "/client.html"));
  } else {
    res.redirect("/");
  }
});
// NOTIFICATION
app.get("/notifications", (req, res) => {
  connection.query("SELECT * FROM notifications", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving data from the database");
      throw err;
    }
    res.json(results);
  });
});



// REVIEWS ENDPOINTS

app.use(express.json());

app.post("/submit_review", (req, res) => {
  const { name, review } = req.body;
  const insertReviewQuery = "INSERT INTO reviews (name, review) VALUES (?, ?)";

  connection.query(insertReviewQuery, [name, review], (err, result) => {
    if (err) {
      console.error("Error inserting review:", err);
      res.status(500).send("Error inserting review");
    } else {
      // Send script to perform page reload
      const reloadScript = "<script>window.location.href = '/client.html';</script>";
      res.send(reloadScript);
    }
  });
});

app.get("/reviews", (req, res) => {
  const getReviewsQuery =
    "SELECT name, review, created_at FROM reviews ORDER BY created_at DESC";

  connection.query(getReviewsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).send("Error fetching reviews");
    } else {
      res.json(results); 
    }
  });
});

// Route to fetch pending reviews
app.get("/admin/reviews", (req, res) => {
  const getPendingReviewsQuery = "SELECT * FROM reviews WHERE approved = 0";

  connection.query(getPendingReviewsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching pending reviews:", err);
      res.status(500).send("Error fetching pending reviews");
    } else {
      res.json(results);
    }
  });
});

// Route to approve a review
app.post("/admin/reviews/approve/:id", (req, res) => {
  const { id } = req.params;
  const approveReviewQuery = "UPDATE reviews SET approved = 1 WHERE id = ?";

  connection.query(approveReviewQuery, [id], (err, result) => {
    if (err) {
      console.error("Error approving review:", err);
      res.status(500).send("Error approving review");
    } else {
      res.status(200).send("Review approved successfully");
    }
  });
});

// Route to deny a review
app.post("/admin/reviews/deny/:id", (req, res) => {
  const { id } = req.params;
  const denyReviewQuery = "DELETE FROM reviews WHERE id = ?";

  connection.query(denyReviewQuery, [id], (err, result) => {
    if (err) {
      console.error("Error denying review:", err);
      res.status(500).send("Error denying review");
    } else {
      res.status(200).send("Review denied successfully");
    }
  });
});


//CONTACT US SECTION
// Endpoint to handle contact form submission
app.post('/submit-contact', (req, res) => {
    const { name, email, subject, message } = req.body;
  const details = { name, email, subject, message,};
    connection.query("INSERT INTO contacts SET ?",details, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error submitting your contact details');
        } else {
           res.send(
             '<script>alert("Message sent successfully");</script>'
           );
           return;
          
          
        }
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", req.url));
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
