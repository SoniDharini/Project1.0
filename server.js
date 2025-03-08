require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cpassword:String
});

const User = mongoose.model("User", userSchema);

// Password validation function
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// API Endpoint to Handle Registration
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, cpassword } = req.body;

        // Check if passwords match
        if (password !== cpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Validate password strength
        if (!isValidPassword(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Save the new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
