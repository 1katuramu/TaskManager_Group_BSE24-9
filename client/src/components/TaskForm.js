import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim()) {
      const taskData = {
        title: title.trim(),
        dueDate: dueDate || null
      };
      onAddTask(taskData);
      setTitle('');
      setDueDate('');
      setShowAdvanced(false);
    }
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task..."
            className="form-input"
            maxLength="200"
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Simple' : 'Advanced'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="advanced-options">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date (Optional):</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={getMinDate()}
                className="form-input"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
