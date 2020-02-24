import React from 'react';
import Checklist from './components/Checklist/Checklist';
import './App.css';

function App() {
  return (
    <div className='container'>
      <div className='jumbotron'>
        <h1> Checklist </h1>
        <hr></hr>
        <h3> The app that helps get everything done. </h3>
      </div>
      <Checklist />
    </div>
  );
}

export default App;
