import {
    Alert,
    AlertIcon,
    AlertDescription,
    Box,
    CloseButton,
    VStack
  } from "@chakra-ui/react"

export function SuccessAlert({showSuccessAlert, setShowSuccessAlert}) {
    let textToDisplay;
    if (showSuccessAlert.type === 'added workout') {
      textToDisplay = 'Your workout has been added!';
    } else if (showSuccessAlert.type === 'edited exercise types') {
      textToDisplay = 'Your workout types have been updated!';
    } else if (showSuccessAlert.type === 'deleted workouts') {
      textToDisplay = 'The workouts you selected have been deleted!'
    }
  
    return (
      <VStack width="75%">
        <Alert status="success" borderRadius="lg">
            <AlertIcon />
            <Box flex="1">
            <AlertDescription display="block">
                {textToDisplay}
            </AlertDescription>
            </Box>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowSuccessAlert({show: false})}/>
        </Alert>
      </VStack>
    )
}