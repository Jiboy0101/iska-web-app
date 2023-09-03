import React, { useState } from 'react';
import './App.css';
import VirtualAssistant from './components/VirtualAssistant';
import data from "./components/Data.json";
import logo from '../src/components/logo.png';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false); // State for search bar visibility

  const handleButtonClick = () => {
    setButtonClicked(true);
    // Filter the data based on the search term and store it in searchResults
    const filteredResults = data.filter((val) => val.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(filteredResults);

    // Read the filtered data
    if (filteredResults.length > 0) {
      const contentToRead = filteredResults.map((val) => `${val.content}`).join('. ');
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
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt='logo' />
          <h1>ISKA</h1>
          <p>Hi! I'm ISKA</p>
        </header>
        <div className="template_Container">
          {buttonClicked &&
            searchResults.map((val) => {
              return (
                <div className="template" key={val.id}>
                  <p className="content">{val.content} {val.content2}</p>
                </div>
              );
            })}
        </div>
        <VirtualAssistant />
        <br />
        
      </div>
      <div className="templateContainer">
        <div className="searchInput_Container">
          {isSearchBarVisible ? (
            <>
              <input
                id="searchInput"
                type="text"
                placeholder="Search here..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button onClick={handleButtonClick}>Search</button>
            </>
          ) : (
            <button onClick={toggleSearchBar}>Type</button>
          )}
        </div>
        
      </div>
    </>
  );
}

export default App;
