import React from 'react';
import WellbeingCheckin from './WellbeingCheckin';

const App = () => {
  const handleEmojiSelect = (emoji) => {
    console.log('Selected emoji:', emoji);
  };

  return (
    <div className="App">
      <WellbeingCheckin onEmojiSelect={handleEmojiSelect} />
    </div>
  );
};

export default App;
