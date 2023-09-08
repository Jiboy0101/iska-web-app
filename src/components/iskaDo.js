// ResponseHandler.js
const getResponse = (voiceInput) => {
  // Define your responses based on voice input
  if (voiceInput.toLowerCase().includes('what can you do')) {
    return "There are various thing that I can do. Below is the detailed list.";
  } 
  else if (voiceInput.toLowerCase().includes('what')) {
    return "There are various thing that I can do. Below is the detailed list.";
  }
   else if (voiceInput.toLowerCase().includes('who are you')) {
    return "I'm iska, P U P LQ Virtual Assistant, how can I help you?";
  }
  else if (voiceInput.toLowerCase().includes('who')) {
    return "I'm iska, P U P LQ Virtual Assistant, how can I help you?";
  }
    else if (voiceInput.toLowerCase().includes('vision')) {
    return "P U P: The National Polytechnic University";
  }
  else if (voiceInput.toLowerCase().includes('mission')) {
    return "P U P Mission";
  }
  else if (voiceInput.toLowerCase().includes('tell me')) {
    return "The Polytechnic University of the Philippines (P U P) is a government educational institution governed by Republic Act Number 8292 known as the Higher Education Modernization Act of 1997, and its Implementing Rules and Regulations contained in the Commission on Higher Education Memorandum Circular No. 4, series 1997. P U P is one of the country's highly competent educational institutions. The P U P Community is composed of the Board of Regents, University Officials, Administrative and Academic Personnel, Students, various Organizations, and the Alumni.";
  }
  else if (voiceInput.toLowerCase().includes('tell')) {
    return "The Polytechnic University of the Philippines (P U P) is a government educational institution governed by Republic Act Number 8292 known as the Higher Education Modernization Act of 1997, and its Implementing Rules and Regulations contained in the Commission on Higher Education Memorandum Circular No. 4, series 1997. P U P is one of the country's highly competent educational institutions. The P U P Community is composed of the Board of Regents, University Officials, Administrative and Academic Personnel, Students, various Organizations, and the Alumni.";
  }
  else if (voiceInput.toLowerCase().includes('pup hymn')) {
    return "P U P";
  }
  else if (voiceInput.toLowerCase().includes('pup')) {
    return "P U P";
  }
  
  
  
};



export default getResponse;

