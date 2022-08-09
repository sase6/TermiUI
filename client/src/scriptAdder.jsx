import React, {useRef} from 'react';
import { TextField, Button, InputProps } from '@mui/material';
import axios from 'axios';

const ScriptAdder = (props) => {
  const scriptName = useRef(null);
  const script = useRef(null);
  
  const { getData, setStatus } = props;

  const addNewScript = () => {
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
    })
    .catch(err => setStatus("Failed to Add Script"));
  };

  return (
    <div className="script-adder">
      <div className="script-name-and-add-script-button">
        <TextField id='scriptName' ref={scriptName} label='Script Name' size='small' sx={{width: '325px'}}/>
        <Button onClick={addNewScript} variant='outlined' size='small' disableRipple sx={{width: '45px', borderColor: 'gray', color: 'gray', '&:active': {borderColor: 'gray'}}}>ADD</Button>
      </div>

      <TextField id='script' ref={script} size='small' label='Script' fullWidth ></TextField>
    </div>
  );
};

export default ScriptAdder;