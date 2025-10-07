import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  // Test 1: Initial Render
  test('renders TodoList component with initial todos', () => {
    render(<TodoList />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  // Test 2: Adding a Todo
  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Input should clear after submission
  });

  // Test 3: Toggling a Todo
  test('toggles a todo completion status', () => {
    render(<TodoList />);
    const todoItem = screen.getByTestId('todo-item-1');

    // Initial state: not completed
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');

    // Toggle to completed
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');

    // Toggle back to not completed
    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
  });

  // Test 4: Deleting a Todo
  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId('delete-button-1');

    fireEvent.click(deleteButton);

    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});