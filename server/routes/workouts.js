const express = require("express")

const {
    getWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} = require("../controllers/workoutController")

const router = express.Router()

// Get all workouts
router.get("/", getWorkouts)

// Get single workout
router.get("/:id", getSingleWorkout)

// Create new workout
router.post("/", createWorkout)

// Update workout
router.patch("/:id", updateWorkout)

// Delete workout
router.delete("/:id", deleteWorkout)


module.exports = router