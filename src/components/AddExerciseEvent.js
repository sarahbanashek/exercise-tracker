import { useState, useEffect } from 'react';
import { EditExerciseTypes } from './EditExerciseTypes';
import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  VStack
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons'

const borderColor = 'teal.400';
const closeButtonColor = 'teal.700';
const colorScheme = 'teal';
const textColor = 'teal.700';

export function AddExerciseEvent({setShowAddNewExerciseEvent, exerciseTypes, postNewExerciseEvent, getUnusedExerciseTypes, unusedExerciseTypes, editExerciseTypesInDB}) {
    // const [todaysDate, setTodaysDate] = useState();
    const [exerciseEventDate, setExerciseEventDate] = useState();
    const [exerciseEventType, setExerciseEventType] = useState(1);
    const [exerciseEventDuration, setExerciseEventDuration] = useState();
    const [exerciseEventHeartRate, setExerciseEventHeartRate] = useState();
    const [formSubmitted, setFormSubmitted] = useState(0);
    const [showEditExerciseTypes, setShowEditExerciseTypes] = useState(false);

    useEffect(() => {
      let today = new Date();
      const offset = today.getTimezoneOffset();
      // today = new Date(today.getTime() - (offset * 60000)).toISOString().split('T')[0];
      // setTodaysDate(today);
      // setExerciseEventDate(today);
      today = new Date(today.getTime() - (offset * 60000));
      setExerciseEventDate(today.toISOString().split('T')[0]);
      setExerciseEventType(1);
      setExerciseEventDuration('');
      setExerciseEventHeartRate('');
    }, [formSubmitted]);
    
    function handleSetExcerciseType(value) {
      if (value === '0') {
        getUnusedExerciseTypes();
        setShowEditExerciseTypes(true);
      } else {
        setExerciseEventType(value);
      }
    }
    
    function handleSubmit() {
      postNewExerciseEvent({
        date: exerciseEventDate,
        exerciseType: exerciseEventType,
        duration: exerciseEventDuration,
        heartRate: exerciseEventHeartRate
      });
      setFormSubmitted(formSubmitted + 1);
      setShowAddNewExerciseEvent(false);
    }
  
    return (
      <Stack
        border="2px"
        borderRadius="lg" 
        borderColor={borderColor}
        paddingTop={2} >
        <Stack paddingRight={2} direction="row-reverse">
            <CloseButton color={closeButtonColor} onClick={() => setShowAddNewExerciseEvent(false)} />   
        </Stack>

        <VStack spacing={7}>
          <Heading color={textColor} size="md">Log your workout below</Heading>
          
          <HStack paddingLeft={10} paddingRight={10} spacing={10}>
            <FormControl isRequired>
              <FormLabel color={textColor}>Date</FormLabel>
              <InputGroup maxWidth="200px">
                <InputLeftElement pointerEvents="none" children={<CalendarIcon />} />
                <Input type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="yyyy-mm-dd"
                defaultValue={exerciseEventDate}
                // max={todaysDate}
                focusBorderColor={borderColor}
                onChange={e => setExerciseEventDate(e.target.value)} 
                />
              </InputGroup>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel color={textColor}>Workout Type</FormLabel>
              <Select id="select-workout-type"
                focusBorderColor={borderColor} 
                width="max" 
                value={exerciseEventType} 
                onChange={e => handleSetExcerciseType(e.target.value)}>
                {exerciseTypes.map(entry =>
                  <option key={entry.id} value={entry.id}>{entry.description}</option>
                )}
                <option key="edit" value="0">edit workout types</option>
              </Select>
            </FormControl>
          </HStack>
            
          <HStack paddingLeft={10} paddingRight={10} spacing={10}>
            <FormControl isRequired>
              <FormLabel color={textColor}>Workout Length</FormLabel>
              <InputGroup maxWidth="200px">
                <NumberInput focusBorderColor={borderColor} value={exerciseEventDuration} min={1} onChange={value => setExerciseEventDuration(value)}>
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon color={textColor} children="minutes" />
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <FormLabel color={textColor}>Heart Rate</FormLabel>
              <InputGroup maxWidth="200px">
                <NumberInput focusBorderColor={borderColor} value={exerciseEventHeartRate} min={1} onChange={value => setExerciseEventHeartRate(value)}>
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon color={textColor} children="bpm" />
              </InputGroup>
            </FormControl>
          </HStack>
            
          {showEditExerciseTypes && unusedExerciseTypes
          ? (
            <VStack spacing={7}>
              <Button colorScheme={colorScheme} type="submit" onClick={() => handleSubmit()}>Submit</Button>
              <EditExerciseTypes {...{unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}} />
            </VStack>
            )
          : (
            <Stack paddingBottom={10}>
              <Button colorScheme={colorScheme} type="submit" onClick={() => handleSubmit()}>Submit</Button>
            </Stack>
            )
          }
        </VStack>
      </Stack>
    );
}