import React, { useRef } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const KillPort = (props) => {

  const { setStatus } = props;
  const port = () => document.querySelector('#port').value;

  const killPort = () => {
    axios({
      method: 'post',
      url: '/kill',
      data: {
        port: port()
      }
    })
    .then(() => {
      setStatus(`Killed Port ${port()}`);
      document.querySelector('#port').value = '';
    })
    .catch(() => {
      setStatus(`Cannot Kill Port ${port()}`);
    });
  };

  return (
    <div className="kill-port">
      <Button 
        onClick={killPort} 
        variant='outlined' 
        sx={{
          height: '40px', 
          marginLeft: '10px'
        }}>Kill
      </Button>
      
      <TextField 
        id='port' 
        ref={port} 
        InputLabelProps={{shrink: true}} 
        sx={{width: '100px'}} 
        label="Port Number" 
        size='small'
      />
    </div>
  )
};

export default KillPort;