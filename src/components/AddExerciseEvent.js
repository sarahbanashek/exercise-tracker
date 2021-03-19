import { useState, useEffect } from 'react';
import { EditExerciseTypes } from './EditExerciseTypes';
import {
  Button,
  CloseButton,
  Container,
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
  Select
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
      <Container centerContent id="add-exercise-event-container">
        <HStack>
          <CloseButton onClick={() => setShowAddNewExerciseEvent(false)} />
          <Heading size="md">Log your workout below</Heading>
        </HStack>

        <HStack>
          <FormControl className="form-input-container" isRequired>
            <FormLabel htmlFor="date">Date </FormLabel>
            <InputGroup maxWidth="200px">
              <InputLeftElement pointerEvents="none" children={<CalendarIcon />} />
              <Input type="date" id="date" 
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="yyyy-mm-dd"
              defaultValue={exerciseEventDate}
              onChange={e => setExerciseEventDate(e.target.value)} 
              />
            </InputGroup>
          </FormControl>
          
          <FormControl className="form-input-container" isRequired>
            <FormLabel>Workout Type</FormLabel>
            <Select maxWidth="200px" value={exerciseEventType} onChange={e => handleSetExcerciseType(e.target.value)}>
              {exerciseTypes.map(entry =>
                <option key={entry.id} value={entry.id}>{entry.description}</option>
              )}
              <option key="edit" value="0">edit workout types</option>
            </Select>
          </FormControl>
        </HStack>
          
        <HStack>
          <FormControl className="form-input-container" isRequired>
            <FormLabel htmlFor="duration">Workout Length</FormLabel>
            <InputGroup maxWidth="200px">
              <NumberInput value={exerciseEventDuration} min={1} onChange={value => setExerciseEventDuration(value)}>
                <NumberInputField id="duration" />
              </NumberInput>
              <InputRightAddon children="minutes" />
            </InputGroup>
          </FormControl>
          
          <FormControl className="form-input-container">
            <FormLabel htmlFor="heart-rate">Heart Rate</FormLabel>
            <InputGroup maxWidth="200px">
              <NumberInput value={exerciseEventHeartRate} min={1} onChange={value => setExerciseEventHeartRate(value)}>
                <NumberInputField id="duration" />
              </NumberInput>
              <InputRightAddon children="bpm" />
            </InputGroup>
          </FormControl>
        </HStack>
          
        <Button type="submit" onClick={() => handleSubmit()} id="submit-exercise-event">Submit</Button>
        {showEditExerciseTypes && unusedExerciseTypes
        ? <EditExerciseTypes {...{unusedExerciseTypes, editExerciseTypesInDB, setShowEditExerciseTypes}} />
        : null
        }
      </Container>
    );
}