const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null values
    },
    name: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    icon: {
        type: String,
        required: false
    },
    iconColor: {
        type: String,
        required: false
    }
});

const shopSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    }
});

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    profile: {
        type: String,
        default: "https://res.cloudinary.com/dtqlvrklv/image/upload/v1740577262/6f09aa6ed839fa7b57767edf7998c27a_gjnz7z.png",
        required: false
    },
    username: {
        type: String,
        default: "",
        required: false
    },
    buttonType: {
        type: String,
        default: "",
        required: false
    },
    layoutType: {
        type: String,
        default: "",
        required: false
    },
    buttonColor: {
        type: String,
        default: "",
        required: false
    },
    buttonFontColor: {
        type: String,
        default: "",
        required: false
    },
    font: {
        type: String,
        default: "",
        required: false
    },
    fontColor: {
        type: String,
        default: "",
        required: false
    },
    theme: {
        type: String,
        default: "",
        required: false
    },
    banner: {
        type: String,
        default: "#342B26",
        required: false
    },
    socialLinks: [linkSchema], // Ensuring this does not cause duplicate errors
    shopLinks: [shopSchema],
    bio: {
        type: String,
        default: "",
        required: false
    }
});

module.exports = mongoose.model("users", userSchema);
