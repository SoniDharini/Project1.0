const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

const app = express();
const SECRET_KEY = "966788cc2f069c000170459d99500ef52e468b69a9edf869515508d156dc3298";
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/registrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true }, // Email should be unique
    dob: { type: String, required: true },
    gen: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Handle Registration
app.post("/register", async (req, res) => {
    const { username, email, dob, gen, address, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Save new user
        const newUser = new User({ username, email, dob, gen, address, password });
        await newUser.save();
        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});



// Handle Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token and send response
        const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token, username: user.username, message: "Login successful" }); // ✅ Single response

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});




// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        console.log("Checking for email:", email); // Debugging Log

        const user = await User.findOne({ email });

        if (!user) {
            console.log("Email not found in the database.");
            return res.status(400).json({ message: "Email not found" });
        }

        console.log("User found:", user.username);

        // Updated transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true, 
            auth: {
              user: "soniayushi880@gmail.com",
              pass: "cjmnvhusysgyvfgc",
            },
          });
        let mailOptions = {
            from: "soniayushi880@gmail.com",
            to: user.email,
            subject: "Password Recovery",
            text: `Hello ${user.username},\n\nYour password is: ${user.password}\n\nPlease keep it safe.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email", error });
            }
            console.log("Email sent:", info.response);
            res.status(200).json({ message: "Password has been sent to your email" });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// Protected route example
app.get('/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Access granted', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}); 

app.listen(5000, () => console.log("Server running on port 5000"));
