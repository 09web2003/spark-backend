const express = require("express");
const router = express.Router()

const { createuser } = require("../controller/createuser")
const { getuser, getuserbyId } = require("../controller/getuser")
const { updateuser } = require("../controller/updateuser")
const { forgetPassword } = require("../controller/forgetPassword")
const { getprofile } = require("../controller/getprofile")

router.post("/createuser", createuser)
router.post("/login", getuser)
router.put("/updateuser/:id", updateuser)
router.post("/forgotpassword", forgetPassword)
router.get("/getprofile/:username", getprofile)

module.exports = router;