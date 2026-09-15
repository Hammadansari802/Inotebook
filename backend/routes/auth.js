const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_N = "mynameis$madi";

// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 })
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, error: "Sorry a user with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        });

        const data = {
            user: {
                id: user.id
            }
        };

        // Token valid for 30 days
        const jwttoken = jwt.sign(data, JWT_N, { expiresIn: '30d' });

        // Returning both keys so Frontend never fails
        res.json({ success: true, authtoken: jwttoken, jwttoken });

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Login a user using: POST "/api/auth/login". No login required
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password is required").exists()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }

        let passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ success: false, error: "Please try to login with correct credentials" });
        }

        let data = {
            user: {
                id: user.id
            }
        };

        // Token valid for 30 days
        const jwttoken = jwt.sign(data, JWT_N, { expiresIn: '30d' });

        // Returning both keys so Frontend never fails
        res.json({ success: true, authtoken: jwttoken, jwttoken });

    } catch (error) {
        console.error("Error in login:", error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get logged-in User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;