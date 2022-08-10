import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

const ScriptsList = (props) => {
  const { data, getData, setStatus } = props;
  const [displayedScripts, setDisplayedScripts] = useState(data);
  const scriptList = useRef(null);

  const filterScripts = (e) => {
    let query = e.target.value;
    if (query === '') {
      setDisplayedScripts(data);
      return;
    }

    let result = {...data};

    Object.keys(data).forEach((sc) => {
      if (sc.toLowerCase().indexOf(query.toLowerCase()) === -1) delete result[sc];
    });

    setDisplayedScripts(result);
  };

  useEffect(() => setDisplayedScripts(props.data), [props.data]);

  if (Object.keys(data).length <= 0) {
    return (
      <div className='scripts-list'>
          <TextField onKeyUp={filterScripts} variant='standard'  label='Search Scripts' size='small' fullWidth />
          <div className='no-scripts'>NO SCRIPTS ADDED YET</div>
      </div>
    );
  }

  return (
    <div className="scripts-list" ref={scriptList}>
      <TextField onKeyUp={filterScripts} variant='standard'  label='Search Scripts' size='small' fullWidth />
      <div className="listOfScripts">
        {Object.keys(displayedScripts).map((script, i) => <Script setStatus={setStatus} getData={getData} key={`script-${i}`} scriptText={displayedScripts[script]} scriptName={script}/>)}
      </div>
    </div>
  );
};

const Script = (props) => {

  const { scriptName, scriptText, getData, setStatus } = props;

  const runScript = () => {
    axios({
      method: 'post',
      url: 'run',
      data: {scriptName}
    })
    .then(() => {
      setStatus("Ran Script");
    })
    .catch(err => setStatus("Failed to Run Script", false));
  };

  const deleteScript = () => {
    axios({
      method: 'post',
      url: '/remove',
      data: {
        scriptName: scriptName
      }
    })
    .then(() => {
      setStatus("Deleted " + scriptName);
      getData();
    })
    .catch(err => setStatus("Failed to Delete"));
  };

  return (
    <div className="script-cell">
      <div className="script-top">
        <TextField value={scriptName} disabled size='small' sx={{width: '200px'}}/>
        <Button onClick={deleteScript} variant='outlined' size='small' sx={{height: '40px', color:'indianred', borderColor:'indianred'}}>Delete <ClearIcon sx={{fontSize: '18px', color:'indianred'}}/> </Button>
        <Button variant='outlined' size='small' sx={{height: '40px', color:'limegreen', borderColor:'limegreen'}} onClick={runScript}>Run <PlayArrowIcon sx={{fontSize: '18px', color: 'limegreen'}}/> </Button>
      </div>

      <div className="script-actual-text">
        {scriptText}
      </div>
    </div>
  );
};

export default ScriptsList;