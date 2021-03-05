import React, { useState } from 'react';

export function AddExerciseEvent({exerciseTypes, postNewExerciseEvent}) {
    const [exerciseEventDate, setExerciseEventDate] = useState(new Date().toISOString().substr(0,10));
    const [exerciseEventType, setExerciseEventType] = useState();
    const [exerciseEventDuration, setExerciseEventDuration] = useState();
    const [exerciseEventHeartRate, setExerciseEventHeartRate] = useState();
  
    function handleSubmit(event) {
      event.preventDefault();
      postNewExerciseEvent({
        date: exerciseEventDate,
        exerciseType: exerciseEventType,
        duration: exerciseEventDuration,
        heartRate: exerciseEventHeartRate
      });
      event.target.reset();
      setExerciseEventDate(new Date().toISOString().substr(0,10));
    }
  
    console.log('rendering');
    return (
      <div className="add-exercise-event-form">
        <div id="form-title">Log your workout below:</div>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="date">Date </label>
          <input type="date" id="date" 
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="yyyy-mm-dd"
            defaultValue={exerciseEventDate}
            onChange={e => setExerciseEventDate(e.target.value)} 
          />
          <label htmlFor="select-exercise-type">Workout Type</label>
          <select id="select-exercise-type" onChange={e => setExerciseEventType(e.target.value)}>
            {exerciseTypes.map(entry =>
              <option key={entry.id} value={entry.id}>{entry.description}</option>
            )}
          </select>
          <label htmlFor="duration">Workout Length (in minutes) </label>
          <input type="number" id="duration" onChange={e => setExerciseEventDuration(e.target.value)}/>
          <label htmlFor="heart-rate">Heart Rate </label>
          <input type="number" id="heart-rate" onChange={e => setExerciseEventHeartRate(e.target.value)}/>
          <input type="submit" id="submit-exercise-event" value="Add To Log" />
        </form>
      </div>
    );
}