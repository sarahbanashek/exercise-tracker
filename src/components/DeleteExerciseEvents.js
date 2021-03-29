import { useState, useEffect } from 'react';
import { 
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Divider,
  FormControl,
  FormHelperText,
  Heading,
  HStack,
  Stack,
  StackDivider,
  VStack 
} from "@chakra-ui/react";
import { DisplayPagination } from './DisplayPagination';
import { numericalDate } from '../utilities/numericalDate';

const borderColor = 'pink.400';
const closeButtonColor = 'pink.700';
const colorScheme = 'pink';
const textColor = 'pink.600';
const lightBorderColor = 'pink.200';

function pagination(dataSet, pageNum, amtPerPage) {
  return dataSet.slice(amtPerPage * (pageNum - 1), pageNum * amtPerPage);
}

export function DeleteExerciseEvents({listAllExerciseEvents, toggleShowExerciseEvents, deleteExerciseEvents}) {
    const [toDelete, setToDelete] = useState(new Map(listAllExerciseEvents.map(e => [e.id, false])));
    const [currentPage, setCurrentPage] = useState(1);
    const [descriptionBoxWidths, setDescriptionBoxWidths] = useState();

    useEffect(() => {
      function calculateDescriptionBoxWidths(dataSet) {
        let descriptionsArr = [];
        dataSet.map(obj => descriptionsArr.push(obj.description));
        descriptionsArr.sort((a, b) => b.length - a.length);
        return descriptionsArr[0].length * 8;
      }
      setDescriptionBoxWidths(calculateDescriptionBoxWidths(listAllExerciseEvents));
    }, [listAllExerciseEvents]);
    
    const resultsPerPage = 10;
    const numOfPages = Math.ceil(listAllExerciseEvents.length / resultsPerPage);
  
    function toggleDeleteWorkout(id) {
      const isSelected = toDelete.get(id);
      setToDelete(previous => new Map(previous).set(id, !isSelected));
    }

    function handleSubmit() {
      const idsToDelete = [...toDelete.entries()].filter(([_, val]) => val).map(([key, _]) => key);
      deleteExerciseEvents(idsToDelete);
      toggleShowExerciseEvents(false, 'delete');
      setToDelete(new Map(listAllExerciseEvents.map(e => [e.id, false])));
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

        <VStack spacing={7} paddingTop={5} paddingRight={10} paddingBottom={10} paddingLeft={10}>
          <CheckboxGroup colorScheme={colorScheme}>
            <Stack spacing={4}>
              {pagination(listAllExerciseEvents, currentPage, resultsPerPage).map(e =>
                <Checkbox key={'exercise-event-' + e.id} 
                  isChecked={toDelete.get(e.id)} 
                  onChange={() => toggleDeleteWorkout(e.id)}
                  height="20px"
                  spacing={3}
                >
                  <HStack divider={<StackDivider borderColor={borderColor} />} spacing={3} h={5}>
                    <Box d="flex" alignItems="center" w="80px" h={8}>{numericalDate(e.date)}</Box>
                    <Box d="flex" alignItems="center" w={`${descriptionBoxWidths}px`} h={8}>{e.description}</Box>
                    <Box d="flex" alignItems="center" w="95px" h={8}>{e.duration} minutes</Box>
                    {e.heart_rate ? <Box d="flex" alignItems="center" h={8}>{e.heart_rate}  bpm</Box> : null}
                  </HStack>
                </Checkbox>
              )}
            </Stack>
          </CheckboxGroup>
          <DisplayPagination {...{currentPage, setCurrentPage, numOfPages, colorScheme, borderColor, lightBorderColor, textColor}} />
          <Divider orientation="horizontal" borderColor={lightBorderColor} />
          <FormControl>
              <Button colorScheme={colorScheme} type="submit" onClick={() => handleSubmit()}>Submit</Button>
              <FormHelperText color={textColor}>Warning: This cannot be undone</FormHelperText>
          </FormControl>
        </VStack>
      </Stack> 
    );
}