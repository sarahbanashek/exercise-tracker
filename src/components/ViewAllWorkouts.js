import { useState } from 'react';
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
import { DisplayPagination } from './DisplayPagination';
import { monthDayYearDate } from '../utilities/monthDayYearDate';

const borderColor = 'blue.400';
const closeButtonColor = 'blue.700';
const colorScheme = 'blue';
const textColor = 'blue.600';
const lightBorderColor = 'blue.200';

function pagination(dataSet, pageNum, amtPerPage) {
  return dataSet.slice(amtPerPage * (pageNum - 1), pageNum * amtPerPage);
}

export function ViewAllWorkouts({listAllExerciseEvents, toggleShowExerciseEvents}) {
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 10;
  const numOfPages = Math.ceil(listAllExerciseEvents.length / resultsPerPage);

    return (
      <Stack
        border="2px"
        borderRadius="lg" 
        borderColor={borderColor} 
        variant="outline" 
        paddingTop={2}>
        <Stack paddingRight={2} direction="row-reverse">
          <CloseButton color={closeButtonColor} onClick={() => toggleShowExerciseEvents(false, 'view')} />
        </Stack>

        <Heading color={textColor} size="md">Your Workouts</Heading>

        <Stack align="center" spacing={5} paddingTop={5} paddingRight={10} paddingBottom={10} paddingLeft={10}>
          <Table variant="simple" colorScheme={colorScheme} paddingRight={10}>
            <Thead>
              <Tr key="title-row">
                  <Th color={textColor} key="date-title" scope="col">Date</Th>
                  <Th color={textColor} key="type-title" scope="col">Workout Type</Th>
                  <Th color={textColor} key="duration-title" scope="col">Workout Length</Th>
                  <Th color={textColor} key="heart-rate-title" scope="col">Heart Rate</Th>
              </Tr>
            </Thead>

            <Tbody>  
              {pagination(listAllExerciseEvents, currentPage, resultsPerPage).map(e => 
              <Tr key={e.id}>
                <Td key={'date-' + e.id}>{monthDayYearDate(e.date)}</Td>
                <Td key={'type-' + e.id}>{e.description}</Td>
                <Td key={'duration-' + e.id}>{e.duration} min</Td>
                <Td key={'heart-rate-' + e.id}>{e.heart_rate ? `${e.heart_rate} bpm` : 'n/a'}</Td>
              </Tr>
              )}
            </Tbody>
          </Table>
          <DisplayPagination {...{currentPage, setCurrentPage, numOfPages, colorScheme, borderColor, lightBorderColor, textColor}} />
        </Stack>
      </Stack>
    );
}