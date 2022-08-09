import React, {useEffect, useState} from 'react';
import { Alert } from '@mui/material';
import ScriptAdder from './src/scriptAdder.jsx';
import ScriptsList from './src/scriptsList.jsx';
import KillPort from './src/killPort.jsx';
import axios from 'axios';

const App = (props) => {

  var timeout;

  const [data, setData] = useState({});
  const [dir, setDir] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const setStatus = (msg, succ=true) => {
    if (timeout) clearTimeout(timeout);

    if (succ) {
      setError(null);
      setSuccess(msg || 'Success!');
    } else {
      setSuccess(null);
      setError(msg || 'Error');
    }

    timeout = setTimeout(() => {
      document.querySelector('.status').style.animation = '1500ms slideUp forwards';
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 1500);
    }, 2500);
  };

  const getData = () => {
    axios({
      method: 'get',
      url: '/scripts'
    })
    .then(res => {
      setData(res.data)
    })
    .catch(err => err);
  };

  useEffect(getData, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/dir'
    })
    .then((res) => setDir(res.data))
    .catch(err => err);
  }, []);

  return (
    <div className="app">
      <Status msg={success} which={'success'}/>
      <Status msg={error} which={'error'}/>
      <div className="cd">Current Directory: {dir}</div>
      <ScriptAdder getData={getData} setStatus={setStatus}/>
      <ScriptsList data={data} getData={getData} setStatus={setStatus}/>
      <KillPort setStatus={setStatus}/>
    </div>
  );
};

const Status = (props) => {
  if (!props.msg) return;

  return (
    <div className="status">
      <Alert sx={{width: '200px'}} severity={props.which}>{props.msg}</Alert>
    </div>
  );
};

export default App;
