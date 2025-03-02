const User = require("../models/userdata")

exports.getprofile = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username}).select("-password")

        if(user) {
            res.status(200).send(user)
        }
        else {
            res.send({
                success: false,
                message: "No User Found!"
            })
        }
    }
    catch(error) {
        res.send({
            status: false,
            error: error
        })
    }
}