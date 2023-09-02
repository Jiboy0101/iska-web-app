import React, { useState, useEffect } from 'react';

const VirtualAssistant = () => {
  const [response, setResponse] = useState('');
  const [listening, setListening] = useState(false);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (listening) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('Speech recognition started');
      };

      recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleUserInput(transcript);
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setListening(false);
      };

      recognition.start();
    }
  }, [listening]);

  const handleUserInput = async input => {
    setUserInput(input);

    const response = {
      'hi iska': 'Hello! How can I assist you today?',
      'what are you': 'I am just a virtual assistant, but I am here to help!',
      'what is the weather': 'I am not connected to the internet, but you can use a weather app to find out.',
      'default': 'I\'m sorry, I don\'t have an answer for that right now.'
    };

    const inputLowerCase = input.toLowerCase();
    const generatedResponse = response[inputLowerCase] || response['default'];
    setResponse(generatedResponse);

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(generatedResponse);

    // Specify the voice using the voiceURI
    utterance.voiceURI = 'Google UK Female';
    synth.speak(utterance);
  };

  const toggleListening = () => {
    setListening(!listening);
  };

  return (
    <div className="virtual-assistant">
      <p>{response}</p>
      <h6>Your input: {userInput}</h6>
      <button onClick={toggleListening}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
     
    </div>
  );
};

export default VirtualAssistant;
