import React, { useState } from 'react';
import Terrible from './images/Terrible.PNG';
import Bad from './images/Bad.PNG';
import Alright from './images/Alright.PNG';
import PrettyGood from './images/PrettyGood.PNG';
import Fantastic from './images/Fantastic.PNG';

const emojis = [
  { component: Terrible, label: 'Terrible' },
  { component: Bad, label: 'Bad' },
  { component: Alright, label: 'Alright' },
  { component: PrettyGood, label: 'Pretty Good' },
  { component: Fantastic, label: 'Fantastic' },
];

const WellbeingCheckin = ({ onEmojiSelect }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
    onEmojiSelect(emoji);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Wellbeing Check-in</h2>
        <p className="text-center mb-6">Hello! How are you feeling today?</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 ">
          {emojis.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => handleEmojiClick(item)}
                className={`flex flex-col items-center 
                  justify-center p-4 rounded-lg shadow-xl bg-gray-100
                  transition-all ${selectedEmoji === item ? 'bg-blue-300' : 'bg-gray-100'
                  }`}
              >
                <img src={item.component} className={`w-12 h-12`} />
                <span className="mt-2 text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full text-center"
          onClick={() => alert(`You selected: ${selectedEmoji ? selectedEmoji.label : 'None'}`)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WellbeingCheckin;
