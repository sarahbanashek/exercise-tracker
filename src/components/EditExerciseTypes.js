import { useState } from 'react';

export function EditExerciseTypes({unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}) {
    const [idsToRemove, setIdsToRemove] = useState();
    const [workoutsToAdd, setWorkoutsToAdd] = useState();
  
    let selectSize = unusedExerciseTypes.length < 3
      ? unusedExerciseTypes.length
      : 3;
    
    function handleSubmit(event) {
      event.preventDefault();
      let data = {};
      if (idsToRemove) {
        data.toRemove = idsToRemove;
      }
      if (workoutsToAdd) {
        data.toAdd = workoutsToAdd;
      }
      editExerciseTypesInDB(data);
      console.log(data);
      setShowEditExerciseTypes(false);
    }
  
    return(
      <div id="edit-exercise-types-container">
        <div className="form-title">Edit your workout types</div>
        <form onSubmit={e => handleSubmit(e)}>
          <input type="button" id="close-form" aria-label="close edit workout types form" value="X" onClick={() => setShowEditExerciseTypes(false)} />
          <label htmlFor="select-to-remove">
            Choose which workout types to remove:
          </label>
          <select id="select-to-remove" 
            multiple 
            value={idsToRemove}
            size={selectSize} 
            onChange={e => setIdsToRemove(Array.from(e.target.selectedOptions, option => option.value))}>
            {unusedExerciseTypes.map(entry => 
              <option key={entry.id} value={entry.id}>{entry.description}</option>
            )}
          </select>
          <div id="note">*Workouts already in use cannot be removed</div>
          <label htmlFor="add-exercise-types">
            Add your own workouts (if adding multiple, separate by a comma and space, e.g. "rock climbing, HIIT")
          </label>
          <input type="text" id="add-exercise-types" onChange={e => setWorkoutsToAdd(e.target.value)} />
          <input type="submit" id="submit-exercise-type-changes" value="Submit" />
        </form>
      </div>
    );
}