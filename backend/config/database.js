const mongoose=require("mongoose")
require('dotenv').config()

const dbConnect=()=>{
    mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
    .then(()=>{
        console.log("connected")
    })
    .catch((error)=>{
        console.log("error")
    })
}
module.exports=dbConnect;