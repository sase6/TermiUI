import React from 'react';
import { TextField, Button, InputLabelProps } from '@mui/material';

const KillPort = (props) => {
  return (
    <div className="kill-port">
      <Button variant='outlined' sx={{height: '40px', marginLeft: '10px'}}>Kill</Button>
      <TextField InputLabelProps={{shrink: true}} sx={{width: '100px'}} label="Port Number" size='small'/>
    </div>
  )
};

export default KillPort;