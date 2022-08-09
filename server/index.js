require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const workoutRoutes = require("./routes/workouts")

const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/workouts", workoutRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connected to MongoDB")
            console.log("Listening on Port 4000")
        })
    })
    .catch((err) => console.log(err))