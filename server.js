
// easy way to build server web in localhost
const express = require("express");
// library make data in reques we can use it
const bodyParser = require("body-parser");
// to deal with fiels write and read 
const fs = require("fs");
//to control paths of files
const path = require("path");
// to encrypt password
const bcrypt = require('bcrypt');


const app = express();
const PORT = 3000;

// Middleware to parse JSON data from the request body to understand json
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'home')));
app.use(express.static(path.join(__dirname, 'Cart')));

// make home / start point from home.html that inside public dir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home', 'index.html'));
});

// request body that contain username , password , phone , email
app.post("/register", (req, res) => {
    const { username, password, email, phone } = req.body;

    // التحقق من البيانات
    if (!username || !password || !email || !phone) {
        return res.status(400).send({ message: "All fields are required." });
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

        // encrypt password

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send({ message: "Error hashing password" });
            }

            // add user with encrypted password
            const newUser = { username, password: hashedPassword, email, phone };
            users.push(newUser);

            fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error("Error saving file:", err);
                    return res.status(500).send({ message: "Error saving file" });
                }
                res.status(200).send({ message: "User registered successfully" });
            });
        });
    });
});



// Login route to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const filePath = path.join(__dirname, 'registration.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ success: false, message: "Error reading data" });
        }

        const users = data ? JSON.parse(data) : [];

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ success: false, message: "Error comparing passwords" });
            }

            if (isMatch) {
                return res.status(200).json({ success: true, message: "Login successful" });
            } else {
                return res.status(400).json({ success: false, message: "Invalid credentials" });
            }
        });
    });
});


// app.get('/user-info', (req, res) => {
//     const { username } = req.query; 
//     const filePath = path.join(__dirname, 'registration.json');

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error("Error reading file:", err);
//             return res.status(500).json({ success: false, message: "Error reading data" });
//         }

//         const users = data ? JSON.parse(data) : [];

     
//         const user = users.find(u => u.username === username);
//         if (user) {
//             return res.status(200).json({ success: true, user });
//         } else {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//     });
// });


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
