const mongoose = require("mongoose")
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    cardio: Boolean,
    resistance: Boolean,
    reps: {
        type: Number,
        required: function () { return this.resistance === true || this.cardio === false; }
    },
    load: {
        type: Number,
        required: function () { return this.resistance === true; }
    },
    distance: {
        type: Number,
        required: function () { return this.cardio === true; }
    },
    duration: {
        type: Number,
        required: function () { return this.cardio === true; }
    },
}, { timestamps: true })

module.exports = mongoose.model("Workout", workoutSchema)