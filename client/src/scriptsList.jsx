import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

const ScriptsList = (props) => {
  const [scripts, setScripts] = useState({brandon: 'sase', brandon1: 'sase', brandon2: 'sase', brandon3: 'sase', brandon4: 'sase', brandon5: 'sase', brandon6: 'sase', });
  const [displayedScripts, setDisplayedScripts] = useState(scripts);
  const scriptList = useRef(null);

  const getScrips = () => {
    // use axios
    // gte script 
    // render scripts
  };

  const filterScripts = (e) => {
    let query = e.target.value;
    if (query === '') {
      setDisplayedScripts(scripts);
      return;
    }

    let result = {...scripts};

    Object.keys(scripts).forEach((sc) => {
      if (sc.indexOf(query) === -1) delete result[sc];
    });

    setDisplayedScripts(result);
  };

  if (Object.keys(scripts).length <= 0) {
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
        {Object.keys(displayedScripts).map((script, i) => <Script key={`script-${i}`} scriptText={displayedScripts[script]} scriptName={script}/>)}
      </div>
    </div>
  );
};

const Script = (props) => {

  const { scriptName, scriptText } = props;

  const runScript = () => {
    axios({
      method: 'post',
      url: 'run',
      data: {scriptName}
    });
  };

  return (
    <div className="script-cell">
      <div className="script-top">
        <TextField value={scriptName} disabled size='small' sx={{width: '200px'}}/>
        <Button variant='outlined' size='small' sx={{height: '40px', color:'indianred', borderColor:'indianred'}}>Delete <ClearIcon sx={{fontSize: '18px', color:'indianred'}}/> </Button>
        <Button variant='outlined' size='small' sx={{height: '40px', color:'limegreen', borderColor:'limegreen'}} onClick={runScript}>Run <PlayArrowIcon sx={{fontSize: '18px', color: 'limegreen'}}/> </Button>
      </div>

      <div className="script-actual-text">
        {scriptText}
      </div>
    </div>
  );
};

export default ScriptsList;