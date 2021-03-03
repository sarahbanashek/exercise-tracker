import './App.css';
import React, { useEffect, useState } from 'react';

const URL_BASE = 'http://localhost:3001';

export function App() {
  const [exerciseTypes, setExerciseTypes] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasSubmittedEvent, setHasSubmittedEvent] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetch(`${URL_BASE}/`, { method: 'GET', redirect: 'follow' });
        const exerciseTypes = await data.json();
        console.log(exerciseTypes);
        setExerciseTypes(exerciseTypes);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [hasLoaded]);

  function postNewExerciseEvent(eventData) {
    console.log(eventData);
    async function postData(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'omit',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const parsedData = response.json();
      console.log(parsedData);

      setHasSubmittedEvent(true);
    }

    postData(`${URL_BASE}/add-exercise-event`, eventData);
  }
  
  return (
    !hasLoaded 
      ? <div>Loading...</div> 
      : 
    <div className="App">
      <AddExerciseEvent { ...{exerciseTypes, postNewExerciseEvent, setHasSubmittedEvent, hasSubmittedEvent} }/>
    </div>
  );
}

function AddExerciseEvent({exerciseTypes, postNewExerciseEvent, hasSubmittedEvent}) {
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
      {hasSubmittedEvent
        ? <div id="submitted-event-today">Great work, keep it up!</div>
        : <div id="no-submission-today">Log your workout below:</div>
      }
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="date">Date </label>
        <input type="date" id="date" 
          pattern="\d{4}-\d{2}-\d{2}"
          placeholder="yyyy-mm-dd"
          defaultValue={exerciseEventDate}
          onChange={e => setExerciseEventDate(e.target.value)} 
        />
        <select name="select-exercise-type" id="select-exercise-type" onChange={e => setExerciseEventType(e.target.value)}>
          <option key='0' value='0'>Workout Type</option>
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
