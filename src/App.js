import './App.css';
import { useEffect, useState } from 'react';
import { Button, Divider, Heading, VStack } from "@chakra-ui/react"
import { AddExerciseEvent } from './components/AddExerciseEvent';
import { DataAverages } from './components/DataAverages';
import { ViewRecentExerciseData } from './components/ViewRecentExerciseData';
import { ViewExerciseTypesData } from './components/ViewExerciseTypesData';
import { ViewAllWorkouts } from './components/ViewAllWorkouts';
import { DeleteExerciseEvents } from './components/DeleteExerciseEvents';

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
  const [listAllExerciseEvents, setListAllExerciseEvents] = useState();
  const [showAddNewExerciseEvent, setShowAddNewExerciseEvent] = useState(false);
  const [showAllExerciseEvents, setShowAllExerciseEvents] = useState(false);
  const [showExerciseEventsToDelete, setShowExerciseEventsToDelete] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetch(`${URL_BASE}/`, { method: 'GET', redirect: 'follow' });
        const dbData = await data.json();
        console.dir(dbData);
        const avgs = {
          totalDuration: dbData.durationAvg,
          untilLastWeekDuration: dbData.untilLastWeekDurationAvg,
          totalHeartRate: dbData.heartRateAvg,
          untilLastWeekHeartRate: dbData.untilLastWeekHeartRateAvg
        };
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
    } catch (error) {
      console.log(error);
    }
  }

  async function editExerciseTypesInDB(exerciseData) {
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

  async function getAllExerciseEvents() {
    try {
      const data = await fetch(`${URL_BASE}/edit-exercise-events`, { method: 'GET', redirect: 'follow' });
      const dbData = await data.json();
      setListAllExerciseEvents(dbData);
      console.dir(dbData);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleShowExerciseEvents(bool, option) {
    if (bool) {
      getAllExerciseEvents(); 
    }
    if (option === 'view') {
      setShowAllExerciseEvents(bool);
    } else if (option === 'delete') {
      setShowExerciseEventsToDelete(bool);
    }
  }

  async function deleteExerciseEvents(idsToDelete) {
    const response = await fetch(`${URL_BASE}/edit-exercise-events`, {
      method: 'POST',
      credentials: 'omit',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idsToDelete)
    });
    const parsedData = response.json();
    console.log(parsedData);

    setHasSubmittedData(hasSubmittedData + 1);
  }

  return (
    !hasLoaded 
      ? <div>Loading...</div> 
      : 
    <div id="App">
      <Heading>Exercise Tracker</Heading>
      <VStack id="button-stack" spacing={5}>
        {showAddNewExerciseEvent 
          ? <AddExerciseEvent { ...{setShowAddNewExerciseEvent, exerciseTypes, postNewExerciseEvent, getUnusedExerciseTypes, unusedExerciseTypes, editExerciseTypesInDB} }/>
          : <Button onClick={() => setShowAddNewExerciseEvent(true)}>Add a New Workout</Button>
        }
        {showAllExerciseEvents && listAllExerciseEvents
          ? <ViewAllWorkouts {...{listAllExerciseEvents, toggleShowExerciseEvents}} />
          : <Button onClick={() => toggleShowExerciseEvents(true, 'view')}>
              View Your Workout Log
            </Button>
        }
        {showExerciseEventsToDelete && listAllExerciseEvents
          ? <DeleteExerciseEvents {...{listAllExerciseEvents, toggleShowExerciseEvents, deleteExerciseEvents}} />
          : <Button onClick={() => toggleShowExerciseEvents(true, 'delete')}>
              Delete a Workout From Your Log
            </Button>
        }
      </VStack>
      <Divider />
      <DataAverages {...{averages}}/>
      <Divider />
      <ViewRecentExerciseData {...{last20} }/>
      <ViewExerciseTypesData {...{loggedExerciseTypes, loggedExerciseTimeSpent}} />
    </div>
  );
}
