import React from 'react';
import { TextField, Button, InputLabelProps } from '@mui/material';
import axios from 'axios';

const KillPort = (props) => {

  const { setStatus } = props;

  const killPort = () => {
    axios({
      method: 'post',
      url: '/kill',
      data: {
        port: document.querySelector('#port').value
      }
    })
    .then(() => setStatus('Killed Port ' + document.querySelector('#port').value))
    .catch(err => setStatus("Cannot Kill Port " + document.querySelector('#port').value));
  };

  return (
    <div className="kill-port">
      <Button onClick={killPort} variant='outlined' sx={{height: '40px', marginLeft: '10px'}}>Kill</Button>
      <TextField id='port' InputLabelProps={{shrink: true}} sx={{width: '100px'}} label="Port Number" size='small'/>
    </div>
  )
};

export default KillPort;