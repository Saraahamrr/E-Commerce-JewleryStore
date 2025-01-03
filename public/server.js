const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Default route (optional)
app.get("/", (req, res) => {
    res.send('Welcome to the Registration API!');
});

// Route to handle registration (POST request)
app.post("/register", (req, res) => {
    const userData = req.body;

    console.log("Received data:", userData); // Log the incoming data

    // Read existing users from the file
    fs.readFile("registration.json", "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            console.error("Error reading file:", err);
            return res.status(500).send({ message: "Error reading file" });
        }

        const users = data ? JSON.parse(data) : [];

        // Add the new user
        users.push(userData);

        console.log("Updated users data:", users); // Log the updated users array

        // Save updated user list to file
        fs.writeFile("registration.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error saving file:", err);
                return res.status(500).send({ message: "Error saving file" });
            }
            res.status(200).send({ message: "User registered successfully", redirectUrl: "/success.html" });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
