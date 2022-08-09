import React from 'react';
import { TextField, Button, InputProps } from '@mui/material';

const ScriptAdder = (props) => {
  

  return (
    <div className="script-adder">
      <div className="script-name-and-add-script-button">
        <TextField label='Script Name' size='small' sx={{width: '325px'}}/>
        <Button variant='outlined' size='small' disableRipple sx={{width: '45px', borderColor: 'gray', color: 'gray', '&:active': {borderColor: 'gray'}}}>ADD</Button>
      </div>

      <TextField size='small' label='Script' fullWidth ></TextField>
    </div>
  );
};

export default ScriptAdder;