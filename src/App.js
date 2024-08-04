import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import WellbeingCheckin from './components/WellbeingCheckin/WellbeingCheckin';
import DateTimePicker from './components/DateTimePicker/DateTimePicker';
import ArchitecturePoposal from './components/ArchitectureProposal/ArchitectureProposal';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/wellbeing-checkin" className="text-blue-500">Wellbeing Check-in</Link>
            </li>
            <li>
              <Link to="/date-time-picker" className="text-blue-500">Date Time Picker</Link>
            </li>
            <li>
              <Link to="/architecture-proposal" className="text-blue-500">Architecture Proposal</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} default />
          <Route path="/wellbeing-checkin" element={<WellbeingCheckin onEmojiSelect={(emoji) => alert(`Selected: ${emoji.label}`)} default />} />
          <Route path="/date-time-picker" element={<DateTimePicker />} />
          <Route path="/architecture-proposal" element={<ArchitecturePoposal />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;
