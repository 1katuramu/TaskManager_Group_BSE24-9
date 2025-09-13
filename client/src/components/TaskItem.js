import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = async () => {
    if (editTitle.trim() && editTitle.trim() !== task.title) {
      await onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="task-checkbox"
      />
      
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleSave} className="btn btn-small btn-success">
            Save
          </button>
          <button onClick={handleCancel} className="btn btn-small btn-secondary">
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </h3>
          </div>
          
          <div className="task-actions">
            <button onClick={handleEdit} className="btn btn-small btn-secondary">
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-small btn-danger">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
