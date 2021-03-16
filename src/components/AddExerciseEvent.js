import { useState, useEffect } from 'react';
import { EditExerciseTypes } from './EditExerciseTypes';

export function AddExerciseEvent({exerciseTypes, postNewExerciseEvent, getUnusedExerciseTypes, unusedExerciseTypes, editExerciseTypesInDB}) {
    const [exerciseEventDate, setExerciseEventDate] = useState();
    const [exerciseEventType, setExerciseEventType] = useState(1);
    const [exerciseEventDuration, setExerciseEventDuration] = useState();
    const [exerciseEventHeartRate, setExerciseEventHeartRate] = useState();
    const [formSubmitted, setFormSubmitted] = useState(0);
    const [showEditExerciseTypes, setShowEditExerciseTypes] = useState(false);
  
    useEffect(() => {
      let today = new Date();
      const offset = today.getTimezoneOffset();
      today = new Date(today.getTime() - (offset * 60000));
      setExerciseEventDate(today.toISOString().split('T')[0]);
    }, [formSubmitted]);
    
    function handleSetExcerciseType(value) {
      if (value === '0') {
        getUnusedExerciseTypes();
        setShowEditExerciseTypes(true);
      } else {
        setExerciseEventType(value);
      }
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
      setExerciseEventHeartRate(null);
      setExerciseEventType(1);
      setFormSubmitted(formSubmitted + 1);
    }
  
    return (
      <div id="add-exercise-event-container">
        <div className="form-title">Log your workout below:</div>
        <form onSubmit={e => handleSubmit(e)}>
          <label htmlFor="date">Date </label>
          <input type="date" id="date" 
            required
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="yyyy-mm-dd"
            defaultValue={exerciseEventDate}
            onChange={e => setExerciseEventDate(e.target.value)} 
          />
          <label htmlFor="select-exercise-type">Workout Type</label>
          <select id="select-exercise-type" value={exerciseEventType} required onChange={e => handleSetExcerciseType(e.target.value)}>
            {exerciseTypes.map(entry =>
              <option key={entry.id} value={entry.id}>{entry.description}</option>
            )}
            <option key="edit" value="0">edit workout types</option>
          </select>
          <label htmlFor="duration">Workout Length (in minutes) </label>
          <input type="number" id="duration" required onChange={e => setExerciseEventDuration(e.target.value)}/>
          <label htmlFor="heart-rate">Heart Rate </label>
          <input type="number" id="heart-rate" onChange={e => setExerciseEventHeartRate(e.target.value)}/>
          <input type="submit" id="submit-exercise-event" value="Add To Log" />
        </form>
        {showEditExerciseTypes && unusedExerciseTypes
        ? <EditExerciseTypes {...{unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}} />
        : null
      }
      </div>
    );
}