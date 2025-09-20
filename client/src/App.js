import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TasksScreen from './components/TasksScreen';
import Analytics from './components/Analytics';
import Settings from './components/Settings';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Error loading tasks: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Error adding task: ' + err.message);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Error updating task: ' + err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Error deleting task: ' + err.message);
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  const clearAllTasks = async () => {
    try {
      // Delete all tasks one by one
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      for (const task of tasks) {
        await fetch(`${API_URL}/tasks/${task.id}`, {
          method: 'DELETE',
        });
      }
      setTasks([]);
    } catch (err) {
      setError('Error clearing tasks: ' + err.message);
    }
  };

  const importTasks = async (importedTasks) => {
    try {
      // Add each imported task
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      for (const task of importedTasks) {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            title: task.title,
            completed: task.completed || false
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to import task');
        }
      }
      
      // Refresh tasks
      await fetchTasks();
    } catch (err) {
      setError('Error importing tasks: ' + err.message);
    }
  };

  const renderCurrentScreen = () => {
    if (loading) {
      return <div className="loading">Loading tasks...</div>;
    }

    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard tasks={tasks} />;
      case 'tasks':
        return (
          <TasksScreen
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        );
      case 'analytics':
        return <Analytics tasks={tasks} />;
      case 'settings':
        return (
          <Settings 
            tasks={tasks}
            onClearAllTasks={clearAllTasks}
            onImportTasks={importTasks}
          />
        );
      default:
        return <Dashboard tasks={tasks} />;
    }
  };

  return (
    <div className="app">
      <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
      
      <main className="main-content">
        {error && (
          <div className="error">
            {error}
          </div>
        )}
        
        {renderCurrentScreen()}
      </main>
    </div>
  );
}

export default App;
