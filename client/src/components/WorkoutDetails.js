import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import useToggleState from '../hooks/useToggleState'
import EditWorkoutForm from './EditWorkoutForm'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const [isEditing, toggle] = useToggleState(false)

    const deleteWorkout = async () => {
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, { method: "DELETE" })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: "DELETE", payload: json })
        }
    }

    let workoutInfo = <p></p>
    if (workout.resistance) {
        workoutInfo = <>
            <p><strong>Load</strong>: {workout.load} kg</p>
            <p><strong>Reps</strong>: {workout.reps}</p>
        </>
    } else if (workout.cardio) {
        workoutInfo = <>
            <p><strong>Distance</strong>: {workout.distance} meters</p>
            <p><strong>Duration</strong>: {workout.duration} minutes</p>
        </>
    }

    return (
        <>
            {isEditing ?
                <EditWorkoutForm toggleIsEditing={toggle} workout={workout} />
                :
                <div className="workout-details" >
                    <h4>{workout.title}</h4>
                    {workoutInfo}
                    <span onClick={deleteWorkout} className="material-symbols-outlined">
                        delete
                    </span>
                    <span onClick={toggle} className="material-symbols-outlined">edit</span>
                </div >
            }
        </>
    )
}

export default WorkoutDetails  