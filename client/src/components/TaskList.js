import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleTask, onUpdateTask, onDeleteTask, showStats = true }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Add your first task above to get started!</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="task-list">
      {totalTasks > 0 && showStats && (
        <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
          <small style={{ color: '#666' }}>
            {completedTasks} of {totalTasks} tasks completed
          </small>
        </div>
      )}
      
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
