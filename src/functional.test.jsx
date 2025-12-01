import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import App from './App';
import axios from 'axios';

vi.mock('axios');

describe('Functional Tests', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  // Authentication tests
  test('validates login flow', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Navigate to login
    fireEvent.click(screen.getByText('Login'));
    
    // Test invalid credentials
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid@email.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText('Sign In'));
    
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
    
    // Test valid login
    axios.post.mockResolvedValue({ data: { token: 'valid-token' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'valid@email.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'correct' } });
    fireEvent.click(screen.getByText('Sign In'));
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });

  // Form validation tests
  test('tests contact form validations', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Contact'));
    
    // Submit empty form
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getAllByText('This field is required')).toHaveLength(3);
    
    // Test valid submission
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } });
    
    axios.post.mockResolvedValue({ status: 200 });
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(screen.getByText('Thank you for your message!')).toBeInTheDocument();
    });
  });

  // Error handling test
  test('handles 404 errors', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Navigate to non-existent route
    fireEvent.click(screen.getByText('Invalid Link'));
    
    await waitFor(() => {
      expect(screen.getByText('Page Not Found')).toBeInTheDocument();
      expect(screen.getByText('Return to Home')).toBeInTheDocument();
    });
  });
});
