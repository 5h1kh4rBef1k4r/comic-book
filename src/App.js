// App.js
import React, { useState } from 'react';
import { ChakraProvider, Container, Box, VStack, useToast } from '@chakra-ui/react';
import ComicForm from './ComicForm';

function App() {
  const [comicPanels, setComicPanels] = useState([]);
  const toast = useToast();

  const handleGenerateComic = (textInputs) => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

    // Call the API here with textInputs and update comicPanels
    // Update the state with the response from the API
    const apiUrl = 'API_ENDPOINT'; // Replace with your actual API endpoint
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ textInputs }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setComicPanels(data.images))
      .catch(error => {
        console.error('API Error:', error);
        toast({
          title: 'Error',
          description: 'Failed to generate comic. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ChakraProvider>
      <Container maxW="xl" centerContent>
        <VStack spacing={8}>
          <ComicForm onGenerateComic={handleGenerateComic} />
          <Box>
            {/* Display the generated comic panels here */}
            {comicPanels.map((panel, index) => (
              <img key={index} src={panel} alt={`Comic Panel ${index + 1}`} />
            ))}
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
