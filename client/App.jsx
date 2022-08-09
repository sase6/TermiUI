import React from 'react';
import ScriptAdder from './src/scriptAdder.jsx';
import ScriptsList from './src/scriptsList.jsx';
import KillPort from './src/killPort.jsx';

const App = (props) => {
  return (
    <div className="app">
      <div className="cd">Current Directory: /</div>
      <ScriptAdder />
      <ScriptsList />
      <KillPort />
    </div>
  );
};

export default App;
