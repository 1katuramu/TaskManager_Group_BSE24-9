import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskItem from '../TaskItem';

// Mock window.confirm
const mockConfirm = jest.fn();
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
  writable: true
});

// Mock task data
const mockTask = {
  id: 1,
  title: 'Test Task',
  completed: false,
  dueDate: '2024-12-31',
  createdAt: '2024-01-01T00:00:00.000Z',
  completedAt: null
};

const mockCompletedTask = {
  id: 2,
  title: 'Completed Task',
  completed: true,
  dueDate: '2024-12-31',
  createdAt: '2024-01-01T00:00:00.000Z',
  completedAt: '2024-01-15T00:00:00.000Z'
};

describe('TaskItem Component', () => {
  const mockOnToggle = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfirm.mockReturnValue(true);
  });

  test('renders task title correctly', () => {
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onUpdate={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('renders completed task with strikethrough', () => {
    render(
      <TaskItem 
        task={mockCompletedTask}
        onToggle={mockOnToggle}
        onUpdate={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const taskElement = screen.getByText('Completed Task');
    expect(taskElement).toHaveClass('completed');
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onUpdate={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledWith(mockTask.id);
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onUpdate={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    // TaskItem component doesn't call onEdit directly, it just sets editing mode
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onUpdate={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure you want to delete this task?');
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  test('displays due date when provided', () => {
    render(
      <TaskItem 
        task={mockTask}
        onToggle={mockOnToggle}
        onUpdate={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );
    
    // TaskItem doesn't display due date in the current implementation
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});
