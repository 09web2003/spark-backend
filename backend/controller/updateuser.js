const User = require("../models/userdata")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


exports.updateuser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
            });
        }

        var isUserExist = await User.findOne({username : req.body.username});

        if(isUserExist && req.params.id != isUserExist._id) {
            res.status(500).json({
                success: false,
                message: "Username already exist. Try using another username!"
            })
        }
        else if(!req.body.username && !req.body.password) {
            var result = await User.updateOne(
                { _id: new mongoose.Types.ObjectId(userId) },
                { $set: req.body }
            );

            result = await User.findById(userId);
    
            res.status(200).json({
                success: true,
                data: result,
                message: "User updated successfully",
            });
        }
        else {
            var result = await User.updateOne(
                { _id: new mongoose.Types.ObjectId(userId) }, 
                { $set: req.body }
            );
    
            if(req.body.password) {
                var hashpassword = await bcrypt.hash((req.body ? req.body.password? req.body.password:null:null), 10);
                let changedPassword = await User.updateOne(
                    {_id: new mongoose.Types.ObjectId(userId)},
                    {$set: {password : hashpassword}}
                )
            }
    
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
    
            result = await User.findById(userId);
    
            res.status(200).json({
                success: true,
                data: result,
                message: "User updated successfully",
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
