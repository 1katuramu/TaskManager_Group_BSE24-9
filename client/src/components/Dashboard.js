import React from 'react';

const Dashboard = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const recentTasks = tasks.slice(-3).reverse();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back! Here's your task summary.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{completedTasks}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{pendingTasks}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="progress-section">
          <h3>Progress Overview</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="progress-text">{completedTasks} of {totalTasks} tasks completed</p>
        </div>

        <div className="recent-tasks">
          <h3>Recent Tasks</h3>
          {recentTasks.length > 0 ? (
            <div className="recent-tasks-list">
              {recentTasks.map(task => (
                <div key={task.id} className={`recent-task ${task.completed ? 'completed' : ''}`}>
                  <span className="task-status">
                    {task.completed ? '✅' : '⏳'}
                  </span>
                  <span className="task-title">{task.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-tasks">No tasks yet. Add your first task!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
