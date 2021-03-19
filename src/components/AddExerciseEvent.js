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

export function AddExerciseEvent({setShowAddNewExerciseEvent, exerciseTypes, postNewExerciseEvent, getUnusedExerciseTypes, unusedExerciseTypes, editExerciseTypesInDB}) {
    const [exerciseEventDate, setExerciseEventDate] = useState();
    const [exerciseEventType, setExerciseEventType] = useState(1);
    const [exerciseEventDuration, setExerciseEventDuration] = useState();
    const [exerciseEventHeartRate, setExerciseEventHeartRate] = useState();
    const [formSubmitted, setFormSubmitted] = useState(0);
    const [showEditExerciseTypes, setShowEditExerciseTypes] = useState(false);
  
    useEffect(() => {
      let today = new Date();
      const offset = today.getTimezoneOffset();
      today = new Date(today.getTime() - (offset * 60000));
      console.log('today: ' + today);
      console.log('in reset useEffect');
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
        borderColor="teal.400" 
        variant="outline" 
        paddingTop={2} >
        <Stack paddingRight={2} direction="row-reverse">
            <CloseButton color="teal.700" onClick={() => setShowAddNewExerciseEvent(false)} />   
        </Stack>
        <VStack spacing={7}>
          <Heading size="md">Log your workout below</Heading>
          <HStack paddingLeft={10} paddingRight={10} spacing={10}>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <InputGroup maxWidth="200px">
                <InputLeftElement pointerEvents="none" children={<CalendarIcon />} />
                <Input type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="yyyy-mm-dd"
                defaultValue={exerciseEventDate}
                
                focusBorderColor="teal.400"
                onChange={e => setExerciseEventDate(e.target.value)} 
                />
              </InputGroup>
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Workout Type</FormLabel>
              <Select focusBorderColor="teal.400" width="max" value={exerciseEventType} onChange={e => handleSetExcerciseType(e.target.value)}>
                {exerciseTypes.map(entry =>
                  <option key={entry.id} value={entry.id}>{entry.description}</option>
                )}
                <option key="edit" value="0">edit workout types</option>
              </Select>
            </FormControl>
          </HStack>
            
          <HStack paddingLeft={10} paddingRight={10} spacing={10}>
            <FormControl isRequired>
              <FormLabel>Workout Length</FormLabel>
              <InputGroup maxWidth="200px">
                <NumberInput focusBorderColor="teal.400" value={exerciseEventDuration} min={1} onChange={value => setExerciseEventDuration(value)}>
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon children="minutes" />
              </InputGroup>
            </FormControl>
            
            <FormControl>
              <FormLabel>Heart Rate</FormLabel>
              <InputGroup maxWidth="200px">
                <NumberInput focusBorderColor="teal.400" value={exerciseEventHeartRate} min={1} onChange={value => setExerciseEventHeartRate(value)}>
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon children="bpm" />
              </InputGroup>
            </FormControl>
          </HStack>
            
          <Stack paddingBottom={10}>
            <Button colorScheme="teal" type="submit" onClick={() => handleSubmit()}>Submit</Button>
          </Stack>
          {showEditExerciseTypes && unusedExerciseTypes
          ? <EditExerciseTypes {...{unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}} />
          : null
          }
        </VStack>
      </Stack>
    );
}