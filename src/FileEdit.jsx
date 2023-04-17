import { Button, Container, Input } from '@mui/material';
import React, { useState } from 'react';

function FileEditor() {
  const [fileContents, setFileContents] = useState('');

  const handleFileInputChange = ({  target  }) => {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      setFileContents(target.result);
      console.log(target.result);
    };

    reader.readAsText(file);
  };

  const handleFileSubmit = () => {
    const lines = fileContents.split('\n');
    const modifiedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const modifiedLine = [];

      for (let j = 0; j < line.length; j++) {
        modifiedLine.push(line.charAt(j));
        modifiedLine.push(',');
      }

      modifiedLines.push(modifiedLine.join(''));
      console.log(modifiedLines)
    }

    const modifiedFileContents = modifiedLines.join('\n');
    const blob = new Blob([modifiedFileContents], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'modified-file.txt';
    link.click();
  };

  return (
    <Container maxWidth='md' style={{border: '1px solid #eee', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center'}}>
      <div style={{margin: '0.5rem'}}>
        <Input type="file" onChange={handleFileInputChange} />
      </div>
      <div>
        <Button variant='contained' color='secondary' onClick={handleFileSubmit}>Submit</Button>
      </div>
    </Container>
  );
}

export default FileEditor;
