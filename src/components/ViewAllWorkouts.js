import { monthDayYearDate } from '../utilities/monthDayYearDate';

export function ViewAllWorkouts({listAllExerciseEvents, toggleShowExerciseEvents}) {
    return (
      <div id="view-all-workouts-table">
        <input type="button" className="close-form" aria-label="close the view all workouts table" value="X" onClick={() => toggleShowExerciseEvents(false, 'view')} />
        <table>
          <caption>Your Workouts</caption>
          <tbody>
            <tr key="title-row">
                <th key="date-title" scope="col">Date</th>
                <th key="type-title" scope="col">Workout Type</th>
                <th key="duration-title" scope="col">Workout Length</th>
                <th key="heart-rate-title" scope="col">Heart Rate</th>
            </tr>
            {listAllExerciseEvents.map(e => 
            <tr key={e.id}>
            <td key={'date-' + e.id}>{monthDayYearDate(e.date)}</td>
            <td key={'type-' + e.id}>{e.description}</td>
            <td key={'duration-' + e.id}>{e.duration} min</td>
            <td key={'heart-rate-' + e.id}>{e.heart_rate ? `${e.heart_rate} bpm` : 'n/a'}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
}