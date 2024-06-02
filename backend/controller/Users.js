const User = require('../models/Users.js');
const bcryptjs = require('bcryptjs');

module.exports.Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists.",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user
        await User.create({
            
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check if password is correct
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // If email and password are correct, return success response
        return res.status(200).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

module.exports.Logout = (req, res) => {
    try {
        // Clear the token cookie by setting it to an empty string and expiring it immediately
        return res.cookie("token", "", { expires: new Date(0) }).json({
            message: "User logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
