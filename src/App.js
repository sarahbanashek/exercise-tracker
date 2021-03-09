import './App.css';
import React, { useEffect, useState } from 'react';
import { AddExerciseEvent } from './components/AddExerciseEvent';
import { DataAverages } from './components/DataAverages';
import { ViewRecentExerciseData } from './components/ViewRecentExerciseData';
import { ViewExerciseTypesData } from './components/ViewExerciseTypesData';

const URL_BASE = 'http://localhost:3001';

export function App() {
  const [exerciseTypes, setExerciseTypes] = useState();
  const [averages, setAverages] = useState();
  const [last20, setLast20] = useState();
  const [loggedExerciseTypes, setLoggedExerciseTypes] = useState();
  const [loggedExerciseTimeSpent, setLoggedExerciseTimeSpent] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasSubmittedEvent, setHasSubmittedEvent] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetch(`${URL_BASE}/`, { method: 'GET', redirect: 'follow' });
        const dbData = await data.json();
        console.dir(dbData);
        const avgs = {duration: dbData.durationAvg, heartRate: dbData.heartRateAvg};
        setExerciseTypes(dbData.exerciseTypes);
        setAverages(avgs);
        setLast20(dbData.last20);
        setLoggedExerciseTypes(dbData.workoutTypeFrequencies);
        setLoggedExerciseTimeSpent(dbData.workoutTypeTimeSpent);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, [hasSubmittedEvent]);

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

      setHasSubmittedEvent(hasSubmittedEvent + 1);
    }

    postData(`${URL_BASE}/add-exercise-event`, eventData);
  }
  
  return (
    !hasLoaded 
      ? <div>Loading...</div> 
      : 
    <div className="App">
      <AddExerciseEvent { ...{exerciseTypes, postNewExerciseEvent, setHasSubmittedEvent, hasSubmittedEvent} }/>
      <DataAverages {...{averages}}/>
      <ViewRecentExerciseData {...{last20} }/>
      <ViewExerciseTypesData {...{loggedExerciseTypes, loggedExerciseTimeSpent}} />
    </div>
  );
}
