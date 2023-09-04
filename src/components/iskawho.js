// ResponseHandler.js

return (
    <img src={logo}/>
)
const who = (voiceInput) => {
    // Define your responses based on voice input
    if (voiceInput.toLowerCase().includes('who are you')) {
      return "There are various thing that I can do. Below is the detailed list.";
    } else if (voiceInput.toLowerCase().includes('do')) {
      return "I'm just a computer program, but I'm doing well. How can I help?";
    } else {
      return "Sorry, I couldn't understand your request. Please try again.";
    }
  };
  
  export default who;
  