import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WellbeingCheckin from './components/WellbeingCheckin/WellbeingCheckin';
import DateTimePicker from './components/DateTimePicker/DateTimePicker';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/wellbeing-checkin" className="text-blue-500">Wellbeing Check-in</Link>
            </li>
            <li>
              <Link to="/date-time-picker" className="text-blue-500">Date Time Picker</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={"Click on the above urls for navigation"} default />
          <Route path="/wellbeing-checkin" element={<WellbeingCheckin onEmojiSelect={(emoji) => alert(`Selected: ${emoji.label}`)} default />} />
          <Route path="/date-time-picker" element={<DateTimePicker />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to the App</h1>
      <p className="mt-4">Select a feature from the navigation menu above.</p>
    </div>
  );
};

export default App;
