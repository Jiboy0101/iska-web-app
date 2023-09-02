import React from 'react';
import './App.css';
import VirtualAssistant from './VirtualAssistant';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ISKA</h1>
        <p>Hi! I'm ISKA </p>
      </header>
      <div className="mic">
      <VirtualAssistant />

      </div>
    </div>
  );
}

export default App;
