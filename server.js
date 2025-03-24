const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

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
    email: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Handle Registration
app.post("/register", async (req, res) => {
    const { username, email, dob, gender, address, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const newUser = new User({ username, email, dob, gender, address, password });
        await newUser.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
