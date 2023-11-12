// ComicForm.js
import React, { useState } from 'react';
import { Input, Button, VStack } from '@chakra-ui/react';

function ComicForm({ onGenerateComic }) {
  const [textInputs, setTextInputs] = useState(Array(10).fill(''));

  const handleChange = (index, value) => {
    const newInputs = [...textInputs];
    newInputs[index] = value;
    setTextInputs(newInputs);
  };

  const handleGenerate = () => {
    onGenerateComic(textInputs);
  };

  return (
    <VStack spacing={4}>
      {textInputs.map((text, index) => (
        <Input
          key={index}
          value={text}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Panel ${index + 1} Text`}
        />
      ))}
      <Button onClick={handleGenerate}>Generate Comic</Button>
    </VStack>
  );
}

export default ComicForm;
