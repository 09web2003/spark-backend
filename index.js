const express = require("express")
const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors())
const userroute = require("./routes/sendroute")

app.use("/api/v1", userroute)
app.listen(5000)

const dbConnect = require("./config/database")
dbConnect();

app.get("/", (req, res) => {
    res.send("helooooo")
})

