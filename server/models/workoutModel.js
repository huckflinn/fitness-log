const mongoose = require("mongoose")
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cardio: Boolean,
    resistance: Boolean,
    reps: Number,
    load: Number,
    distance: Number,
    duration: Number
}, { timestamps: true })

module.exports = mongoose.model("Workout", workoutSchema)