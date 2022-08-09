import { useState } from "react"

const WorkoutForm = () => {
    const [radioButton, setRadioButton] = useState("")
    const [workoutData, setWorkoutData] = useState({
        title: "",
        resistance: false,
        cardio: false,
        load: "",
        reps: "",
        distance: "",
        duration: ""
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

        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            body: JSON.stringify(workoutData),
            headers: { "Content-Type": "application/json" }
        })

        const json = await response.json()

        setWorkoutData({
            title: "",
            cardio: false,
            resistance: false,
            load: "",
            reps: "",
            distance: "",
            duration: ""
        })

        setRadioButton("")

        console.log("New Workout Added", json)
    }

    let formData = <p></p>
    if (radioButton === "resistance") {
        formData = <>
            <div>
                <label>Load (kg):</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setWorkoutData({ ...workoutData, load: e.target.value })
                        console.log(workoutData)
                    }}
                    value={workoutData.load}
                />
            </div>

            <div>
                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setWorkoutData({ ...workoutData, reps: e.target.value })
                        console.log(workoutData)
                    }}
                    value={workoutData.reps}
                />
            </div>
        </>
    } else if (radioButton === "cardio") {
        formData = <>
            <div>
                <label>Distance (meters):</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setWorkoutData({ ...workoutData, distance: e.target.value })
                        console.log(workoutData)
                    }}
                    value={workoutData.distance}
                />
            </div>

            <div>
                <label>Duration (minutes):</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setWorkoutData({ ...workoutData, duration: e.target.value })
                        console.log(workoutData)
                    }}
                    value={workoutData.duration}
                />
            </div>
        </>
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <div>
                <label>Exercise Title:</label>
                <input
                    type="text"
                    onChange={(e) => {
                        setWorkoutData({ ...workoutData, title: e.target.value })
                        console.log(workoutData)
                    }}
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
            <button>Add Workout</button>
        </form>
    )
}

export default WorkoutForm