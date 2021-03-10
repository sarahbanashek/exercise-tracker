import React, { useState, useEffect } from 'react';

export function AddExerciseEvent({exerciseTypes, postNewExerciseEvent, setShowEditExerciseTypes}) {
    const [exerciseEventDate, setExerciseEventDate] = useState();
    const [exerciseEventType, setExerciseEventType] = useState(1);
    const [exerciseEventDuration, setExerciseEventDuration] = useState();
    const [exerciseEventHeartRate, setExerciseEventHeartRate] = useState();
    const [formSubmitted, setFormSubmitted] = useState(0);
  
    useEffect(() => {
      let today = new Date();
      const offset = today.getTimezoneOffset();
      today = new Date(today.getTime() - (offset * 60000));
      setExerciseEventDate(today.toISOString().split('T')[0]);
    }, [formSubmitted]);
    
    function handleSetExcerciseType(value) {
      value === '0'
        ? setShowEditExerciseTypes(true)
        : setExerciseEventType(value);
    }
    
    function handleSubmit(event) {
      event.preventDefault();
      postNewExerciseEvent({
        date: exerciseEventDate,
        exerciseType: exerciseEventType,
        duration: exerciseEventDuration,
        heartRate: exerciseEventHeartRate
      });
      event.target.reset();
      setFormSubmitted(formSubmitted + 1);
    }
  
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
          <select id="select-exercise-type" onChange={e => handleSetExcerciseType(e.target.value)}>
            {exerciseTypes.map(entry =>
              <option key={entry.id} value={entry.id}>{entry.description}</option>
            )}
            <option key="edit" value="0">edit workout types</option>
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