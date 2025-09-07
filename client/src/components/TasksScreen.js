import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TasksScreen = ({ tasks, onAddTask, onToggleTask, onUpdateTask, onDeleteTask }) => {
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  return (
    <div className="tasks-screen">
      <div className="tasks-header">
        <h2>Task Management</h2>
        <p>Organize and manage your daily tasks</p>
      </div>

      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks ({taskCounts.all})
        </button>
        <button 
          className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({taskCounts.pending})
        </button>
        <button 
          className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({taskCounts.completed})
        </button>
      </div>

      <TaskForm onAddTask={onAddTask} />

      <TaskList
        tasks={filteredTasks}
        onToggleTask={onToggleTask}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
        showStats={false}
      />
    </div>
  );
};

export default TasksScreen;
