import { useState } from 'react';
import { 
  Button,
  CloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  VStack
} from '@chakra-ui/react';

export function EditExerciseTypes({unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}) {
  const [idsToRemove, setIdsToRemove] = useState();
  const [workoutsToAdd, setWorkoutsToAdd] = useState();

  let selectSize = unusedExerciseTypes.length > 2
    ? 75 
    : unusedExerciseTypes.length === 0
      ? 'n/a'
      : unusedExerciseTypes.length * 25;
  
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

  const borderColor = 'green.400';
  const closeButtonColor = 'green.700';
  const colorScheme = 'green';
  const containerBackgroundColor = 'green.50';
  const textColor = 'green.800';

  return(
    <Stack 
      border="2px"
      borderRadius="lg" 
      borderColor={borderColor} 
      bg={containerBackgroundColor}
      paddingTop={2}
      paddingBottom={5}
      marginBottom="10px"
      >
      <Stack paddingRight={2} direction="row-reverse">
        <CloseButton color={closeButtonColor} onClick={() => setShowEditExerciseTypes(false)} />
      </Stack>

      <VStack spacing={7} paddingLeft={5} paddingRight={5}>
        <Heading color={textColor} size="md">Edit workout types</Heading>
        
        {selectSize !== 'n/a'
          ? (
          <FormControl  align="center"> 
            <FormLabel textAlign="center" color={textColor}>Choose which workout type(s) to remove</FormLabel>
            <Select id="select-remove-workout-type"
            multiple 
            value={idsToRemove}
            width="fit-content"
            height={selectSize} 
            focusBorderColor={borderColor}
            bg="white"
            icon="none"
            onChange={e => setIdsToRemove(Array.from(e.target.selectedOptions, option => option.value))}
            >
            {unusedExerciseTypes.map(entry => 
              <option key={entry.id} value={entry.id}>{entry.description}</option>
            )}
            </Select>
            <FormHelperText color={textColor}>Workout types already in use cannot be removed</FormHelperText>
          </FormControl>
          )
          : null
        }

        <FormControl>
          <FormLabel textAlign="center" color={textColor}>Add workout type(s)</FormLabel>
          <Input type="text" maxWidth="55%" focusBorderColor={borderColor} bg="white" onChange={e => setWorkoutsToAdd(e.target.value)}></Input>
          <FormHelperText color={textColor}>When adding multiple, separate by a comma e.g. "rock climbing, HIIT"</FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme={colorScheme} onClick={() => handleSubmit()}>Submit</Button>
      </VStack>
    </Stack>
  );
}