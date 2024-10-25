import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{
        "customerId": "1",
        "name": "Sai",
        "transactions": [
          { "date": "2023-07-15", "amount": 120 },
          { "date": "2023-08-19", "amount": 75 },
          { "date": "2023-09-04", "amount": 150 }
        ]
      },]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders loading text initially', () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
test('renders fetched data after loading', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Sai/i)).toBeInTheDocument();
  });
  expect(screen.queryByText(/loading.../i)).toBeNull();
});
