const WorkoutDetails = ({ workout }) => {

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

        <div className="workout-details" >
            <h4>{workout.title}</h4>
            {workoutInfo}
        </div>
    )
}

export default WorkoutDetails