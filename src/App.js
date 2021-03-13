import './App.css';
import { useEffect, useState } from 'react';
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
  const [hasSubmittedData, setHasSubmittedData] = useState(0);
  const [unusedExerciseTypes, setUnusedExerciseTypes] = useState();

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
  }, [hasSubmittedData]);

  async function postNewExerciseEvent(eventData) {
    const response = await fetch(`${URL_BASE}/add-exercise-event`, {
      method: 'POST',
      credentials: 'omit',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    });
      const parsedData = response.json();
      console.log(parsedData);

      setHasSubmittedData(hasSubmittedData + 1);
  }

  
  async function getUnusedExerciseTypes() {
    try {
      const data = await fetch(`${URL_BASE}/edit-exercise-types`, { method: 'GET', redirect: 'follow' });
      const dbData = await data.json();
      setUnusedExerciseTypes(dbData);
      // setShowEditExerciseTypes(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function editExerciseEventsInDB(exerciseData) {
    const response = await fetch(`${URL_BASE}/edit-exercise-types`, {
      method: 'POST',
      credentials: 'omit',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseData)
    });
    const parsedData = response.json();
    console.log(parsedData);

    setHasSubmittedData(hasSubmittedData + 1);
  }

  return (
    !hasLoaded 
      ? <div>Loading...</div> 
      : 
    <div className="App">
      <AddExerciseEvent { ...{exerciseTypes, postNewExerciseEvent, getUnusedExerciseTypes, unusedExerciseTypes, editExerciseEventsInDB} }/>
      <DataAverages {...{averages}}/>
      <ViewRecentExerciseData {...{last20} }/>
      <ViewExerciseTypesData {...{loggedExerciseTypes, loggedExerciseTimeSpent}} />
    </div>
  );
}