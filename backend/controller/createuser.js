const senddata = require("../models/userdata");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.createuser = async (req, res) => {
    try {
        let {firstname, lastname, email, password} = req.body

        // Check if user already exists
        const existinguser = await senddata.findOne({ email });

        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        let hashpassword;
        try {
            hashpassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            });
        }

        // Create user
        let user = await senddata.create({firstname: firstname, lastname: lastname, email: email, password: hashpassword});

        // Generate JWT token
        const payload = {
            email: user.email,
            id: user._id
        };

        let token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "2h"
        });

        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).send({
            success: true,
            token,
            user,
            message: "User has been created successfully!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        });
    }
};
