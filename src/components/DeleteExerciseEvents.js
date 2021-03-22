import { useState } from 'react';
import { 
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Stack,
  StackDivider,
  VStack 
} from "@chakra-ui/react";
import { numericalDate } from '../utilities/numericalDate';

const borderColor = 'pink.400';
const closeButtonColor = 'pink.700';
const colorScheme = 'pink';
const textColor = 'pink.600'

export function DeleteExerciseEvents({listAllExerciseEvents, toggleShowExerciseEvents, deleteExerciseEvents}) {
    const [toDelete, setToDelete] = useState(new Map(listAllExerciseEvents.map(e => [e.id, false])));
  
    function toggleDeleteWorkout(id) {
      const isSelected = toDelete.get(id);
      setToDelete(previous => new Map(previous).set(id, !isSelected));
      console.log(isSelected);
    }
  
    function handleSubmit() {
      console.log(toDelete);
      const idsToDelete = [...toDelete.entries()].filter(([_, val]) => val).map(([key, _]) => key);
      deleteExerciseEvents(idsToDelete);
      toggleShowExerciseEvents(false, 'delete');
      console.log(idsToDelete);
    }
  
    return (
      <Stack
        border="2px"
        borderRadius="lg" 
        borderColor={borderColor} 
        variant="outline" 
        paddingTop={2}
      >
        <Stack paddingRight={2} direction="row-reverse">
          <CloseButton color={closeButtonColor} onClick={() => toggleShowExerciseEvents(false, 'delete')} />
        </Stack>

        <Heading color={textColor} size="md">Choose which workout(s) to delete</Heading>

        <VStack spacing={7} p={10} >
          <CheckboxGroup colorScheme={colorScheme}>
            <Stack spacing={4}>
              {listAllExerciseEvents.map(e =>
                <Checkbox key={'exercise-event-' + e.id} 
                  isChecked={toDelete.get(e.id)} 
                  onChange={() => toggleDeleteWorkout(e.id)}
                  height="20px"
                  spacing={3}
                >
                  <HStack divider={<StackDivider borderColor={borderColor} />} spacing={3} h={5}>
                    <Box d="flex" alignItems="center" h={8}>{numericalDate(e.date)}</Box>
                    <Box d="flex" alignItems="center" h={8}>{e.description}</Box>
                    <Box d="flex" alignItems="center" h={8}>{e.duration} minutes</Box>
                    {e.heart_rate ? <Box d="flex" alignItems="center" h={8}>{e.heart_rate}  bpm</Box> : null}
                  </HStack>
                </Checkbox>
              )}
            </Stack>
          </CheckboxGroup>
          <FormControl>
              <Button colorScheme={colorScheme} type="submit" onClick={() => handleSubmit()}>Submit</Button>
              <FormHelperText color={textColor}>Warning: This cannot be undone</FormHelperText>
          </FormControl>
        </VStack>
      </Stack> 
    );
}