const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Serve static files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

let notificationCount = 0;

// Endpoint to send notification
app.post("/send-notification", (req, res) => {
  const message = req.body.message;
  // Handle the notification (e.g., save it to a database)
  // For demonstration purposes, increment the notification count
  notificationCount++;
  res.sendStatus(200);
});
app.get("/check-notifications", (req, res) => {
  // Return the current notification count
  res.json({ count: notificationCount });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
