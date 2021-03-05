import './App.css';
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Label } from 'recharts';

const URL_BASE = 'http://localhost:3001';

export function App() {
  const [exerciseTypes, setExerciseTypes] = useState();
  const [durationData, setDurationData] = useState();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasSubmittedEvent, setHasSubmittedEvent] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetch(`${URL_BASE}/`, { method: 'GET', redirect: 'follow' });
        const dbData = await data.json();
        console.dir(dbData);
        setExerciseTypes(dbData.exerciseTypes);
        setDurationData({ average: dbData.durationAvg, listRecent: dbData.duration });
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
      <ViewExerciseDurationData {...{durationData} }/>
    </div>
  );
}

function ViewExerciseDurationData({durationData}) {
  return (
    <div id="view-duration-data">
      <div id="avg-workout-length">
        Your average workout length is {durationData.average} minutes.
      </div>
      <ResponsiveContainer className="duration-chart" width="50%" height={250}>
        <LineChart margin={{top: 50, bottom: 50, left: 25}} data={durationData.listRecent}>
          <XAxis dataKey="date" padding={{left: 15, right: 15}} tick={<CustomXAxisTick />}>
            <Label value="Lengths of Your Last 20 Workouts" offset={130} position="top" fill="black" />
            <Label value="Date" offset={20} position="bottom" fill="black" />
          </XAxis>
          <YAxis dataKey="duration" padding={{top: 20}} tick={{fill: 'black'}}>
            <Label value="Minutes" angle={-90} offset={0} position="left" fill="black" />
          </YAxis>
          <Line type="linear" dataKey="duration" label={<CustomDotLabel />} />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function formatDateText(info) {
  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'Aug',
    '09': 'Sept',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  }
  const unformatted = info.split('-');
  return `${months[unformatted[1]]} ${unformatted[2]}`
}

function CustomXAxisTick({x, y, _, payload}) {
  return(
    <g transform={`translate(${x}, ${y})`}>
      <text x={0} y={0} dy={5} fontSize='12px' textAnchor="end" transform="rotate(-35)">{formatDateText(payload.value)}</text>
    </g>
  )
}

function CustomDotLabel({x, y, _, value}) {
  return (
    <text x={x} y={y} dy={-5} textAnchor="middle">{value}</text>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{formatDateText(label)}</p>
        <p className="rate">{`${payload[0].value} minutes`}</p>
      </div>
    );
  }

  return null;
};

function AddExerciseEvent({exerciseTypes, postNewExerciseEvent}) {
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
