import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from './Settings';

describe('Settings Page Form Validation', () => {
  test('shows validation errors for empty fields', async () => {
    render(<Settings />);
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/notification preference is required/i)).toBeInTheDocument();
    });
  });

  test('rejects invalid email format', async () => {
    render(<Settings />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('accepts valid form submission', async () => {
    render(<Settings />);
    
    // Fill in valid form data
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.click(screen.getByLabelText(/email notifications/i));
    fireEvent.change(screen.getByLabelText(/theme/i), { 
      target: { value: 'dark' } 
    });
    
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/settings saved successfully/i)).toBeInTheDocument();
    });
    
    // Verify success styling
    const successMessage = screen.getByText(/settings saved successfully/i);
    expect(successMessage).toHaveClass('text-green-500'); // Assuming Tailwind success class
  });

  test('shows security warning for sensitive changes', async () => {
    render(<Settings />);
    
    fireEvent.click(screen.getByText(/change password/i));
    
    await waitFor(() => {
      expect(screen.getByText(/confirm current password/i)).toBeInTheDocument();
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });
  });
});
