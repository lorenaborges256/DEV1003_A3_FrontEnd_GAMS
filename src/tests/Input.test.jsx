import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/forms/Input';

describe('Input Component', () => {
  test('renders the label when provided', () => {
    render(<Input label="Email" name="email" value="" onChange={() => {}} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('renders the input element with correct attributes', () => {
    render(<Input label="Password" name="password" type="password" value="" onChange={() => {}} />);

    const input = screen.getByLabelText('Password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('name', 'password');
  });

  test('calls onChange when typing into the input', () => {
    const handleChange = vi.fn();

    render(<Input label="Email" name="email" value="" onChange={handleChange} />);

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays an error message when error prop is provided', () => {
    render(
      <Input label="Email" name="email" value="" onChange={() => {}} error="Email is required" />
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  test('applies error styling when error is present', () => {
    const { container } = render(
      <Input label="Email" name="email" value="" onChange={() => {}} error="Email is required" />
    );

    const input = container.querySelector('input');
    expect(input.className).toMatch(/inputError/);
  });
});
