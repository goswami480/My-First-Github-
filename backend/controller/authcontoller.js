const express = require("express");
const User = require('../model/user');
const { hashedpassword, comparepassword, regexemail, regexpassword } = require('../authservice');

const add = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        console.log("Extracted Fields:", { name, email, password, address, phone });

        // Check if all required fields are provided
        if (!name || !email || !password || !address || !phone) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Validate the email format using the regexemail function
        const validEmail = await regexemail(email);
        if (!validEmail) {
            console.log("Invalid email format:", email);
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate the phone number using regex for exactly 10 digits
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Phone number must be 10 digits' });
        }

        // Validate the password using the regexpassword function
        const validPassword = await regexpassword(password);
        if (!validPassword) {
            return res.status(400).json({ message: "Password must be at least one capital letter, one special character, and one number" });
        }

        // Hash the password after validation
        const hashedPassword = await hashedpassword(password);
        console.log("Hashed Password:", hashedPassword);

        // Create a new user object
        const user = new User({
            name,
            email,
            password: hashedPassword,
            address,
            phone
        });
        console.log(">>>> User object:", user);

        // Save the user to the database
        const savedUser = await user.save();
        console.log(">>>> Saved user:", savedUser);

        // Return a success response
        res.status(201).send({ data: savedUser, message: "User saved successfully" });
    } catch (err) {
        console.error("Error during user creation:", err);
        res.status(500).send({ message: "Error during user creation", error: err.message });
    }
};

module.exports = add;
