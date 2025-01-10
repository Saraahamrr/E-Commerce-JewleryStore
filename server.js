
// easy way to build server web
const express = require("express");
// library make data in reques we can use it
const bodyParser = require("body-parser");
// to deal with fiels write and read 
const fs = require("fs");
//to control paths of files
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from the request body to understand json
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'home')));


// make home / start point from home.html that inside public dir
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home', 'index.html'));
});

// request body that contain username , password , phone , email
app.post("/register", (req, res) => {
    const { username, password, email, phone } = req.body;



    // console.log("Received data:", req.body); // Log the incoming data


    // file will write req body in it
    // filepath become contain path of registeration.json file
    const filePath = path.join(__dirname, "registration.json");

    // Read existing users from the file by fs lib
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            console.error("Error reading file:", err);
            return res.status(500).send({ message: "Error reading file" });
        }

        // convert data from json to array 

        const users = data ? JSON.parse(data) : [];

        // Check if the user already exists
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).send({ message: "User already enrolled!" });
        }

        // Add the new user if not already registered
        users.push(req.body);

        // console.log("Updated users data:", users); // Log the updated users array

        // write in file after convert users array to json string
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error saving file:", err);
                return res.status(500).send({ message: "Error saving file" });
            }
            res.status(200).send({ message: "User registered successfully", redirectUrl: "/success.html" });
        });
    });
});





// Login route to handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validate incoming data
    // if (!username || !password) {
    //     return res.status(400).json({ success: false, message: "Username and password are required." });
    // }

    // console.log("Login attempt with:", username, password); // Log the login attempt for debugging

    const filePath = path.join(__dirname, 'registration.json');

    // Read the users data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(500).json({ success: false, message: "Error reading data" });
        }
        
        //convert from json to users array
        const users = data ? JSON.parse(data) : [];

        // Check if the user exists and the password matches
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // If user exists and password matches, send a success response
            return res.status(200).json({ success: true });
        } else {
            // If credentials are incorrect, send a failure response
            return res.status(400).json({ success: false });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
