// WellbeingCheckin.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WellbeingCheckin from './WellbeingCheckin';
import Terrible from './images/Terrible.PNG';
// Mock the images
jest.mock('./images/Terrible.PNG', () => 'Terrible');

describe('WellbeingCheckin Component', () => {
  test('renders correctly', () => {
    render(<WellbeingCheckin onEmojiSelect={() => {}} />);

    expect(screen.getByText('Wellbeing Check-in')).toBeInTheDocument();
    expect(screen.getByText('Hello! How are you feeling today?')).toBeInTheDocument();
  });

  test('handles emoji selection', () => {
    const onEmojiSelect = jest.fn();
    render(<WellbeingCheckin onEmojiSelect={onEmojiSelect} />);

    const firstEmojiButton = screen.getByText('Terrible').closest('button');
    fireEvent.click(firstEmojiButton);

    expect(onEmojiSelect).toHaveBeenCalledWith({ component: 'Terrible', label: 'Terrible' });
    expect(firstEmojiButton).toHaveClass('bg-blue-300');
  });

  test('handles Continue button click with selected emoji', () => {
    window.alert = jest.fn();
    render(<WellbeingCheckin onEmojiSelect={() => {}} />);

    const firstEmojiButton = screen.getByText('Terrible').closest('button');
    fireEvent.click(firstEmojiButton);

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(window.alert).toHaveBeenCalledWith('You selected: Terrible');
  });

  test('handles Continue button click without selected emoji', () => {
    window.alert = jest.fn();
    render(<WellbeingCheckin onEmojiSelect={() => {}} />);

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(window.alert).toHaveBeenCalledWith('You selected: None');
  });
});
