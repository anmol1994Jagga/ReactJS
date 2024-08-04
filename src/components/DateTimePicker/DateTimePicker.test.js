// DateTimePicker.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DateTimePicker from './DateTimePicker';
import Slots from '../../api/slots.json';

// Mock the Slots data if necessary
jest.mock('../../api/slots.json', () => [
    { displayDate: '2024-08-01', displayTime: '10:00 AM' },
    { displayDate: '2024-08-02', displayTime: '11:00 AM' },
    { displayDate: '2024-08-03', displayTime: '12:00 PM' },
    { displayDate: '2024-08-04', displayTime: '01:00 PM' },
    { displayDate: '2024-08-05', displayTime: '02:00 PM' },
    { displayDate: '2024-08-06', displayTime: '03:00 PM' },
    { displayDate: '2024-08-09', displayTime: '03:00 PM' },
]);

describe('DateTimePicker Component', () => {
    it('renders correctly', () => {
        render(<DateTimePicker />);
        expect(screen.getByText('Pick a date')).toBeInTheDocument();
        expect(screen.getByText('Available time slots')).toBeInTheDocument();
    });

    it('displays dates correctly', () => {
        render(<DateTimePicker />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('handles date selection', () => {
        render(<DateTimePicker />);
        const dateButton = screen.getByText('1');
        fireEvent.click(dateButton);
        expect(dateButton.parentElement).toHaveClass('bg-blue-200'); // Assuming selected dates have this class
    });

    it('handles time slot selection', () => {
        render(<DateTimePicker />);
        const timeButton = screen.getByText('10:00 AM');
        fireEvent.click(timeButton);
        expect(timeButton).toHaveClass('bg-blue-200'); // Assuming selected times have this class
    });

    it('paginates through dates', () => {
        render(<DateTimePicker />);

        // Test initial state: should see the first set of dates
        expect(screen.getByText('1')).toBeInTheDocument();

        // Test pagination to next page
        const nextButton = screen.getByText('>');
        fireEvent.click(nextButton);

        // After clicking next, should see dates 4, 5, 6
        expect(screen.getByText('9')).toBeInTheDocument();
    });

});
