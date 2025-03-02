const senddata = require("../models/userdata")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "user does not exist"
            })
        }
        let user = await senddata.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "does not  exist email"
            })
        }
        const payload = {
            email: user.email,
            id: user._id
        }
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: "2h",
            })
            user=user.toObject()
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token:token,
                user:user,
                message: "Login Successful!"
            });
        }
        else {
            return res.status(403).json({
                success: false,
                message: "password does not match"
            })
        }



    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: error.message,
        })
    }
}

exports.getuserbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const getId = await senddata.findById({ _id: id });
        if (!getId) {
            return res.status(500), json({
                succes: false,
                message: "no data found by id"
            })
        }
        else {
            res.status(200).json({
                succes: true,
                data: getId,
                message: `data ${id} successfully fetch`
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: error.message,
        })
    }
}