import { 
    Button,
    HStack,
    NumberInput,
    NumberInputField
  } from "@chakra-ui/react";

export function DisplayPagination({currentPage, setCurrentPage, numOfPages, colorScheme, borderColor, lightBorderColor, textColor}) {
  
  function handlePageChange(value) {
    if (value < 1 || value > numOfPages) {
      return;
    } else {
      setCurrentPage(parseInt(value, 10));
    }
  }

    return (
        <HStack>
            <Button colorScheme={colorScheme} size="sm" onClick={() => setCurrentPage(1)}>First</Button>
            <Button colorScheme={colorScheme} size="sm" onClick={() => handlePageChange(parseInt(currentPage, 10) - 1)}>Prev</Button>
            <NumberInput size="sm" w={10} 
              min={1} 
              max={numOfPages} 
              defaultValue={currentPage}
              borderColor={lightBorderColor}
              focusBorderColor={borderColor}
              key={currentPage}
              onChange={value => handlePageChange(value)}
            >
              <NumberInputField color={textColor} />
            </NumberInput>
            <Button colorScheme={colorScheme} size="sm" onClick={() => handlePageChange(parseInt(currentPage, 10) + 1)}>Next</Button>
            <Button colorScheme={colorScheme} size="sm" onClick={() => setCurrentPage(numOfPages)}>Last</Button>
          </HStack>
    );
}