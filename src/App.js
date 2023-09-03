import React, { useState } from 'react';
import './App.css';
import VirtualAssistant from './components/VirtualAssistant';
import data from "./components/Data.json";
import logo from './components/logo.png';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false); // State for search bar visibility
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isAssistantMode, setAssistantMode] = useState(true); // State for assistant mode

  const handleButtonClick = () => {
    setButtonClicked(true);

    // Clear the previous error message
    setErrorMessage("");

    // Check if searchTerm is empty
    if (searchTerm.trim() === "") {
      const errorText = "Please type a word.";
      setErrorMessage(errorText);
      speak(errorText); // Speak the error message
      return; // Exit the function early
    }

    // Filter the data based on the search term and store it in searchResults
    const filteredResults = data.filter((val) => val.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(filteredResults);

    // Read the filtered data
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
    setAssistantMode(!isSearchBarVisible); // Toggle assistant mode
  };

  const goBackToAssistant = () => {
    setSearchBarVisible(false);
    setAssistantMode(true); // Switch back to assistant mode
    setButtonClicked(false); // Hide the search results when going back to assistant
    setErrorMessage(""); // Clear the error message
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
                  <p className="content">{val.name}<br/>{val.content}</p>
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
              <input
                id="searchInput"
                type="text"
                placeholder="Search here..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button className='search-button' onClick={handleButtonClick}>Search</button>
              <button className='back' onClick={goBackToAssistant}>Back to Assistant</button>
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
