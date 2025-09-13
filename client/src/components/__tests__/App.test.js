import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders app without crashing', () => {
  render(<App />);
  // Basic test to ensure the app renders
  expect(document.body).toBeInTheDocument();
});
