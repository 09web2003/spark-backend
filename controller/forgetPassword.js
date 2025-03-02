const User = require("../models/userdata")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')

require('dotenv').config();

async function mail(subject, email, body, highlightedData) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.APP_PASSWORD
        }
    })

    const mailOptions = {
        from: {
            name: "SPARK",
            address: process.env.GMAIL_ACCOUNT
        },
        to: email,
        subject: subject,
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;background:white">
            <div style="margin:10px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                    <h3 style="font-size:1.4em;color: #28A263;text-decoration:none;font-weight:600">SPARK</h3>
                </div>
                <p style="font-size:1.1em; color:#000;">Hi,</p>
                <p style="color:#000">Thank you for choosing SPARK. ${body}</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${highlightedData}</h2>
                <p style="font-size:0.9em;color:black">Regards,<br />SPARK</p>
            </div>
        </div>
    `
    }

    const sendMail = async (transporter, mailOptions) => {
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log(info);
            return true;
        }
        catch (error) {
            console.log(error)
            return false;
        }
    }

    return sendMail(transporter, mailOptions)
}

function generateRandomString(length) {
    const char_set = 'abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$&()[]{}?';
    let random_string = '';

    for (let i = 0; i < length; i++) {
        random_string += char_set[Math.floor(Math.random() * char_set.length)];
    }

    return random_string;
}

const updatePassword = async (email, password) => {
    let user = await User.findOneAndUpdate(
        { email: email },
        { password: password }
    )

    if (user) {
        return true
    }
    else {
        return false
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        let email = req.body.email;
        let newPassword = generateRandomString(10);
        console.log(newPassword)
        let hashPassword = await bcrypt.hash(newPassword, 10);
        console.log(hashPassword);
        let isPasswordUpdated = await updatePassword(email, hashPassword);
        console.log(isPasswordUpdated);

        if (isPasswordUpdated) {
            let subject = "SPARK - New Generated Password";
            let body = "Use the following <b>Password to SIGN IN</b> with your account.";
            let highlightedData = newPassword;
            let isMailSent = await mail(subject, email, body, highlightedData);
            console.log(isMailSent)
            res.send(isPasswordUpdated && isMailSent)
        }
        else {
            res.send(isPasswordUpdated);
        }
    }
    catch (error) {
        res.send({
            status: false,
            error: error
        })
    }
}