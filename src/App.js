import React, { useState } from 'react';
import './App.css';
import VirtualAssistant from './components/VirtualAssistant';
import data from "./components/Data.json";
import logo from './components/logo.png';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAssistantMode, setAssistantMode] = useState(true);

  const handleButtonClick = () => {
    setButtonClicked(true); 
    setErrorMessage("");

    if (searchTerm.trim() === "") {
      const errorText = "Please type a word.";
      setErrorMessage(errorText);
      speak(errorText);
      setSearchResults([]);// Reset previous results
      return;
    }

    const filteredResults = data.filter((val) => val.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(filteredResults);

    if (filteredResults.length > 0) {
      const contentToRead = filteredResults.map((val) => `${val.name}, ${val.content}`).join('. ');
      speak(contentToRead);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!isSearchBarVisible);
    setAssistantMode(!isSearchBarVisible);
  };

  const goBackToAssistant = () => {
    setSearchBarVisible(false);
    setAssistantMode(true);
    setButtonClicked(false);
    setErrorMessage("");
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt='logo' /> 
          <h1>ISKA</h1>
        </header>
        
        <div className="template_Container">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {buttonClicked &&
            searchResults.map((val) => {
              return (
                <div className="template" key={val.id}>
                  <p className="content">
                    {val.name}<br /><br />
                    {val.content}<br />
                    <a className='link' href={val.link} target="_blank" rel="noopener noreferrer">
                      {val.link}
                    </a>
                  </p>
                </div>
              );
            })}
        </div>
        {isAssistantMode && !isSearchBarVisible && <VirtualAssistant />}
        <br />
      </div>
      <div className="template-Container">
        <div className="searchInput-Container">
          {isSearchBarVisible ? (
            <>
              <button className='back' onClick={goBackToAssistant}>Home</button>
              <input className='input-search'
                id="searchInput"
                type="text"
                placeholder="Type a keyword..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
        
              <button className='search-button' onClick={handleButtonClick}>Ask</button>
              
            </>
          ) : (
            <button className='type' onClick={toggleSearchBar}>Type</button>
          )}
        </div>
        
      </div>
    </>
  );
}

export default App;
