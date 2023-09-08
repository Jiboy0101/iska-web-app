import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import getResponse from './iskaDo'; // Import the response handler

const VirtualAssistant = () => {
  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript // Add this function to reset the transcript
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');

  useEffect(() => {
    if (assistantResponse !== '' && assistantResponse) {
      speakResponse(assistantResponse);
    }
  }, [assistantResponse]);

  useEffect(() => {
    if (transcript) {
      handleVoiceInput(); // Process voice input whenever there's a new transcript
    }
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      // Check if the microphone is being started
      if (!isListening) {
        SpeechRecognition.startListening();
        resetTranscript(); // Reset the transcript when listening starts
      }
      setIsListening(true);
    }
  };

  const handleVoiceInput = () => {
    // Get the response based on the voice input
    const response = getResponse(transcript);

    if (response === 'stop listening') {
      // Stop listening and reset the transcript
      SpeechRecognition.stopListening();
      setIsListening(false);
      resetTranscript();
    }
   

    setAssistantResponse(response);
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div>
      {assistantResponse && (
        <div>
          <p className='assistant-response'>{assistantResponse}</p>
        </div>
      )}
      <p className='transcript'>{transcript}</p>
      <button className='mic' onClick={toggleListening}>
        {isListening ? 'Stop' : 'Start'}
      </button>
      <p className='mic-desc'>{isListening ? "Okay, I'm listening" : 'Tap to speak'}</p>
    </div>
  );
};

export default VirtualAssistant;
