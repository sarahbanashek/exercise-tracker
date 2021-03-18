import { useState } from 'react';
import { 
  Button,
  CloseButton,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select
} from "@chakra-ui/react"

export function EditExerciseTypes({unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}) {
    const [idsToRemove, setIdsToRemove] = useState();
    const [workoutsToAdd, setWorkoutsToAdd] = useState();
  
    let selectSize = unusedExerciseTypes.length < 3
      ? unusedExerciseTypes.length * 25
      : 75;
    
    function handleSubmit() {
      let data = {};
      if (idsToRemove) {
        data.toRemove = idsToRemove;
      }
      if (workoutsToAdd) {
        data.toAdd = workoutsToAdd;
      }
      editExerciseTypesInDB(data);
      setShowEditExerciseTypes(false);
    }

    return(
      <Container centerContent id="edit-exercise-types-container">
        <HStack>
          <CloseButton onClick={() => setShowEditExerciseTypes(false)} />
          <Heading size="md">Edit your workout types</Heading>
        </HStack>
        <FormControl>
            <FormLabel>Choose which workout types to remove</FormLabel>
            <Select multiple 
            value={idsToRemove}
            maxWidth="45%"
            height={selectSize} 
            onChange={e => setIdsToRemove(Array.from(e.target.selectedOptions, option => option.value))}
            >
            {unusedExerciseTypes.map(entry => 
              <option key={entry.id} value={entry.id}>{entry.description}</option>
            )}</Select>
            <FormHelperText>Workouts already in use cannot be removed</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Add workout(s)</FormLabel>
          <Input type="text" maxWidth="45%" onChange={e => setWorkoutsToAdd(e.target.value)}></Input>
          <FormHelperText>When adding multiple, separate by a comma e.g. "rock climbing, HIIT"</FormHelperText>
        </FormControl>
        <Button type="submit" onClick={() => handleSubmit()}>Submit</Button>
      </Container>
    );
}