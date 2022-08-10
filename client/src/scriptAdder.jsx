import React from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const ScriptAdder = (props) => {
  const { getData, setStatus } = props;

  const addNewScript = () => {
    if (document.querySelector('#scriptName').value === '') return;
    axios({
      method: 'post',
      url: '/script',
      data: {
        scriptName: document.querySelector('#scriptName').value,
        script: document.querySelector('#script').value
      }
    })
    .then(() => {
      setStatus('Added Script');
      getData();
      document.querySelector('#scriptName').value = '';
      document.querySelector('#script').value = '';
    })
    .catch(err => setStatus("Failed to Add Script"));
  };

  return (
    <div className="script-adder">
      <div className="script-name-and-add-script-button">
        <TextField 
          id='scriptName' 
          label='Script Name' 
          size='small' 
          sx={{width: '325px'}}
        />

        <Button 
          onClick={addNewScript} 
          variant='outlined' 
          size='small' 
          disableRipple 
          sx={{
            width: '45px', 
            borderColor: 'gray', 
            color: 'gray', '&:active': {borderColor: 'gray'}}}
            >
            ADD
        </Button>
      </div>

      <TextField 
        id='script' 
        size='small' 
        label='Script' 
        fullWidth 
        />
    </div>
  );
};

export default ScriptAdder;