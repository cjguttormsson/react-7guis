import { render, screen } from '@testing-library/react';
import Counter from './Counter';

test('count starts at 0', () => {
  render(<Counter />);
  const inputElement = screen.getByDisplayValue(/0/);
  expect(inputElement).toBeInTheDocument();
});

test('there is a count button', () => {
  render(<Counter />);
  const buttonElement = screen.getByText(/^Count$/);
  expect(buttonElement).toBeInTheDocument();
});

// TODO: Test that the count button actually does something...
