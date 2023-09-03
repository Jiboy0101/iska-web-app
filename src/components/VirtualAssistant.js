import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VirtualAssistant = () => {

  const command = [
    {
      command: 'what can you do',
      callback: (command) => {
        // Replace 'your-website-url' with the actual URL you want to open
        document.open('/iskaDo');
      }
    }
  ];

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition(command);
  const [isListening, setIsListening] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening();
      setIsListening(true);
    }
  };

  return (
    <div>
      <p> {isListening ? "Okay, I'm listening" : 'Tap the button to speak'}</p>
      <button onClick={toggleListening}>{isListening ? 'Stop' : 'Start'}</button>
      <p>{transcript}</p>
    </div>
  );
};

export default VirtualAssistant;
