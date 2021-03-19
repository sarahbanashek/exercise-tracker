import { 
  CloseButton,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack 
} from "@chakra-ui/react";
import { monthDayYearDate } from '../utilities/monthDayYearDate';

export function ViewAllWorkouts({listAllExerciseEvents, toggleShowExerciseEvents}) {
    return (
      <Stack
        border="2px"
        borderRadius="lg" 
        borderColor="blue.400" 
        variant="outline" 
        paddingTop={2}>
        <Stack paddingRight={2} direction="row-reverse">
          <CloseButton color="blue.700" onClick={() => toggleShowExerciseEvents(false, 'view')} />
        </Stack>

        <Heading size="md">Your Workouts</Heading>

        <Stack p={10}>
          <Table variant="simple" colorScheme="blue" paddingRight={10}>
            <Thead>
              <Tr key="title-row">
                  <Th key="date-title" scope="col">Date</Th>
                  <Th key="type-title" scope="col">Workout Type</Th>
                  <Th key="duration-title" scope="col">Workout Length</Th>
                  <Th key="heart-rate-title" scope="col">Heart Rate</Th>
              </Tr>
            </Thead>
            
            <Tbody>  
              {listAllExerciseEvents.map(e => 
              <Tr key={e.id}>
                <Td key={'date-' + e.id}>{monthDayYearDate(e.date)}</Td>
                <Td key={'type-' + e.id}>{e.description}</Td>
                <Td key={'duration-' + e.id}>{e.duration} min</Td>
                <Td key={'heart-rate-' + e.id}>{e.heart_rate ? `${e.heart_rate} bpm` : 'n/a'}</Td>
              </Tr>
              )}
            </Tbody>
          </Table>
        </Stack>
      </Stack>
    );
}