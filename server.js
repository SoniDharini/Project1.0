const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


const app = express();
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

        res.status(200).json({ message: "Login successful" });

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
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,  //  Use 465 for SSL (or 587 for TLS)
            secure: true, //  true for 465, false for 587
            auth: {
                user: "soniayushi880@gmail.com", // Replace with your Gmail
                pass: "xyvbvytemolauxp",  // Replace with your generated App Password
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

app.listen(5000, () => console.log("Server running on port 5000"));
