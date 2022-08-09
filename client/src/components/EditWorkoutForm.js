import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const EditWorkoutForm = ({ toggleIsEditing, workout }) => {
    const { dispatch } = useWorkoutsContext()
    const [radioButton, setRadioButton] = useState(workout.resistance ? "resistance" : "cardio")
    const [workoutData, setWorkoutData] = useState({
        title: workout.title,
        resistance: workout.resistance,
        cardio: workout.cardio,
        load: workout.load,
        reps: workout.reps,
        distance: workout.distance,
        duration: workout.duration
    })

    const toggleCardio = () => {
        setWorkoutData({ ...workoutData, cardio: true, resistance: false })
        setRadioButton("cardio")
    }

    const toggleResistance = () => {
        setWorkoutData({ ...workoutData, resistance: true, cardio: false })
        setRadioButton("resistance")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: "PATCH",
            body: JSON.stringify(workoutData),
            headers: { "Content-Type": "application/json" }
        })

        const json = await response.json()
        toggleIsEditing()
        console.log("Workout Updated", json)
        dispatch({ type: "UPDATE", payload: json })
    }

    let formData = <p></p>
    if (radioButton === "resistance") {
        formData = <>
            <div>
                <label>Load (kg):</label>
                <input
                    type="number"
                    onChange={(e) => setWorkoutData({ ...workoutData, load: e.target.value })}
                    value={!workoutData.load ? "" : workoutData.load}
                />
            </div>

            <div>
                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) => setWorkoutData({ ...workoutData, reps: e.target.value })}
                    value={!workoutData.reps ? "" : workoutData.reps}
                />
            </div>
        </>
    } else if (radioButton === "cardio") {
        formData = <>
            <div>
                <label>Distance (meters):</label>
                <input
                    type="number"
                    onChange={(e) => setWorkoutData({ ...workoutData, distance: e.target.value })}
                    value={!workoutData.distance ? "" : workoutData.distance}
                />
            </div>

            <div>
                <label>Duration (minutes):</label>
                <input
                    type="number"
                    onChange={(e) => setWorkoutData({ ...workoutData, duration: e.target.value })}
                    value={!workoutData.duration ? "" : workoutData.duration}
                />
            </div>
        </>
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Edit Workout</h3>

            <div>
                <label>Exercise Title:</label>
                <input
                    type="text"
                    onChange={(e) => setWorkoutData({ ...workoutData, title: e.target.value })}
                    value={workoutData.title}
                />
            </div>
            <div>
                <p>Exercise Type:</p>
                <div className="radio-buttons">
                    <div>
                        <input type="radio" name="exerciseType" id="resistance" value="resistance" checked={radioButton === "resistance"} onChange={toggleResistance} />
                        <label htmlFor="resistance">Resistance</label>
                    </div>
                    <div>
                        <input type="radio" name="exerciseType" id="cardiovascular" value="cardiovascular" checked={radioButton === "cardio"} onChange={toggleCardio} />
                        <label htmlFor="cardiovascular">Cardiovascular</label>
                    </div>
                </div>
            </div>
            {formData}
            <button>Update</button>
        </form>
    )
}

export default EditWorkoutForm