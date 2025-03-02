const senddata = require("../models/userdata")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.createuser = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const existinguser = await senddata.findOne({email});

        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "user already exist"
            })
        }

        let hashpassword;

        try {
            hashpassword = await bcrypt.hash(password, 10)
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing"
            })
        }

        let user = await senddata.create({ firstname, lastname, email, password: hashpassword})

        const payload = {
            email: user.email,
            id: user._id
        }

        let token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "2h",
        })
        
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).send({
            success: true,
            token,
            user,
            message: "User has been created successfully!"
        });
    }

    catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: error.message,
        })
    }
}