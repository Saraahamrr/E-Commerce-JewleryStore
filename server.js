// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Set the home route to serve the main index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle user registration
app.post("/register", (req, res) => {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
        return res.status(400).send({ message: "All fields are required!" });
    }

    const filePath = path.join(__dirname, "registration.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            console.error("Error reading file:", err);
            return res.status(500).send({ message: "Error reading file" });
        }

        const users = data ? JSON.parse(data) : [];
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            return res.status(400).send({ message: "User already enrolled!" });
        }

        const newUser = { username, password, email, phone };
        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error saving file:", err);
                return res.status(500).send({ message: "Error saving file" });
            }
            res.status(200).send({ message: "User registered successfully", redirectUrl: "/success.html" });
        });
    });
});

// Handle user login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required." });
    }

    const filePath = path.join(__dirname, "registration.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ success: false, message: "Error reading data" });
        }

        const users = data ? JSON.parse(data) : [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: "Invalid username or password." });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
