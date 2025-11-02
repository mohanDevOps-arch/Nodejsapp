import { render, screen } from '@testing-library/react';
import App from './App';

test('renders full stack application heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Full Stack Application/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders users list section', () => {
  render(<App />);
  const usersSection = screen.getByText(/Users List/i);
  expect(usersSection).toBeInTheDocument();
});