import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskForm from '../TaskForm';

describe('TaskForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByPlaceholderText('Enter task title...')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
  });

  test('submits task with title only', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter task title...');
    const submitButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Task',
        dueDate: null
      });
    });
  });

  test('submits task with due date when advanced mode is used', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter task title...');
    const advancedButton = screen.getByText('Advanced');
    const submitButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'Task with Due Date' } });
    fireEvent.click(advancedButton);
    
    const dateInput = screen.getByLabelText('Due Date');
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Task with Due Date',
        dueDate: '2024-12-31'
      });
    });
  });

  test('clears form after successful submission', async () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Enter task title...');
    const submitButton = screen.getByText('Add Task');
    
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  test('does not submit empty task', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByText('Add Task');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('toggles advanced mode correctly', () => {
    render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const advancedButton = screen.getByText('Advanced');
    fireEvent.click(advancedButton);
    
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
    
    fireEvent.click(advancedButton);
    
    expect(screen.queryByLabelText('Due Date')).not.toBeInTheDocument();
  });
});
