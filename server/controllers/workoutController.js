const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Could not find the workout you're looking for" })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: "Could not find the workout you're looking for" })
    }

    res.status(200).json(workout)
}

const createWorkout = async (req, res) => {
    try {
        const workout = new Workout(req.body)
        await workout.save()
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: "Please fill in all fields" })
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Could not find the workout you're looking for" })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!workout) {
        return res.status(404).json({ error: "Could not find the workout you're looking for" })
    }

    res.status(200).json(workout)
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Could not find the workout you're trying to delete" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: "Could not find the workout you're trying to delete" })
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}