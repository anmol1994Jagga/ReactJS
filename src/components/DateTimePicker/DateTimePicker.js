import React, { useState, useEffect } from 'react';
import Slots from '../../api/slots.json';

const DateTimePicker = () => {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Default mobile check
  const [datesPerPage, setDatesPerPage] = useState(isMobile ? 3 : 6);

  useEffect(() => {
    const fetchData = () => {
      try {
        setData(Slots);

        // Extract unique dates
        const uniqueDates = [
          ...new Set(Slots.map((item) => item.displayDate)),
        ];
        setDates(uniqueDates);
        setSelectedDate(uniqueDates[0]); // Set the first date as the default selected date
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Filter time slots for the selected date
      const slots = data.filter(
        (item) => item.displayDate === selectedDate
      );
      setTimeSlots(slots);
    }
  }, [selectedDate, data]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDatesPerPage(mobile ? 3 : 6);
      setCurrentPage(0); // Reset page when changing screen size
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(dates.length / datesPerPage) - 1;
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const currentDates = dates.slice(
    currentPage * datesPerPage,
    (currentPage + 1) * datesPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-lg md:max-w-2xl w-full">
        <h2 className="text-lg md:text-xl font-semibold text-center mb-4">Pick a date</h2>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevPage}
            className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl"
            disabled={currentPage === 0}
          >
            {'<'}
          </button>
          <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'md:grid-cols-6'}`}>
            {currentDates.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`flex flex-col items-center p-2 rounded-lg shadow ${selectedDate === date ? 'bg-blue-200' : 'bg-gray-100'
                  }`}
              >
                <span className="text-xs sm:text-sm md:text-lg lg:text-xl">
                  {new Date(date).getDate()}
                </span>
                <span className="text-xs sm:text-xs md:text-sm lg:text-base">
                  {new Date(date).toLocaleString('en-US', { weekday: 'short' })}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl"
            disabled={(currentPage + 1) * datesPerPage >= dates.length}
          >
            {'>'}
          </button>
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-center mb-4">Available time slots</h2>
        <p className="text-center text-gray-500 mb-4 text-sm md:text-base">Each session lasts for 30 minutes</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => handleTimeClick(slot.displayTime)}
              className={`p-2 rounded-lg shadow ${selectedTime === slot.displayTime ? 'bg-blue-200' : 'bg-gray-100'
                }`}
            >
              {slot.displayTime}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;
