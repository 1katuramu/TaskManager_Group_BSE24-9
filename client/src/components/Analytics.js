import React from 'react';

const Analytics = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Calculate productivity metrics
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Calculate tasks completed today
  const today = new Date().toDateString();
  const tasksCompletedToday = tasks.filter(task => {
    if (!task.completed) return false;
    // If task has completion date, check if it's today
    if (task.completedAt) {
      return new Date(task.completedAt).toDateString() === today;
    }
    // For tasks without completion date, assume they were completed recently
    return true;
  }).length;

  // Calculate weekly productivity (last 7 days)
  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];
      const dayString = date.toDateString();
      
      // Count tasks completed on this day
      const completedOnDay = tasks.filter(task => {
        if (!task.completed) return false;
        if (task.completedAt) {
          return new Date(task.completedAt).toDateString() === dayString;
        }
        // For tasks without completion date, distribute them across recent days
        return Math.random() > 0.7; // Random distribution for demo
      }).length;
      
      // Count total tasks created on this day
      const totalOnDay = tasks.filter(task => {
        if (task.createdAt) {
          return new Date(task.createdAt).toDateString() === dayString;
        }
        return Math.random() > 0.5; // Random distribution for demo
      }).length;
      
      weeklyData.push({
        day: dayName,
        completed: completedOnDay,
        total: Math.max(totalOnDay, completedOnDay),
        date: dayString,
        isToday: i === 0
      });
    }
    
    return weeklyData;
  };

  const weeklyData = getWeeklyData();

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h2>Analytics & Insights</h2>
        <p>Track your productivity and task completion patterns</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>📊 Productivity Metrics</h3>
          <div className="metric">
            <span className="metric-label">Completion Rate</span>
            <span className="metric-value">{completionRate}%</span>
          </div>
          <div className="metric">
            <span className="metric-label">Tasks Completed</span>
            <span className="metric-value">{completedTasks}</span>
          </div>
          <div className="metric">
            <span className="metric-label">Tasks Pending</span>
            <span className="metric-value">{pendingTasks}</span>
          </div>
        </div>

        <div className="analytics-card">
          <h3>📈 Weekly Productivity</h3>
          <div className="weekly-chart">
            {weeklyData.map((day, index) => {
              const maxTasks = Math.max(...weeklyData.map(d => Math.max(d.total, d.completed)), 1);
              const productivityRate = day.total > 0 ? (day.completed / day.total) * 100 : 0;
              
              return (
                <div key={day.day} className={`day-bar ${day.isToday ? 'today' : ''}`}>
                  <div className="bar-container">
                    <div 
                      className="total-bar" 
                      style={{ height: `${(day.total / maxTasks) * 100}%` }}
                    ></div>
                    <div 
                      className="completed-bar" 
                      style={{ height: `${(day.completed / maxTasks) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`day-label ${day.isToday ? 'today-label' : ''}`}>
                    {day.day}
                    {day.isToday && ' (Today)'}
                  </span>
                  <span className="day-stats">{day.completed}/{day.total}</span>
                  <div className={`productivity-indicator ${productivityRate >= 80 ? 'excellent' : productivityRate >= 60 ? 'good' : productivityRate >= 40 ? 'fair' : 'poor'}`}>
                    {productivityRate > 0 ? `${Math.round(productivityRate)}%` : 'No tasks'}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color completed"></div>
              <span>Completed</span>
            </div>
            <div className="legend-item">
              <div className="legend-color total"></div>
              <span>Total Tasks</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>🎯 Today's Progress</h3>
          <div className="goal-item">
            <span className="goal-label">Tasks Completed Today</span>
            <div className="goal-progress">
              <div className="goal-bar">
                <div 
                  className="goal-fill" 
                  style={{ width: `${Math.min((tasksCompletedToday / 5) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="goal-value">{tasksCompletedToday}/5</span>
            </div>
            <div className="goal-description">
              {tasksCompletedToday >= 5 ? '🎉 Excellent! You\'ve hit your daily goal!' : 
               tasksCompletedToday >= 3 ? '👍 Good progress! Keep it up!' :
               tasksCompletedToday >= 1 ? '💪 Getting started! Every task counts!' :
               '🚀 Ready to tackle your first task today?'}
            </div>
          </div>
          <div className="goal-item">
            <span className="goal-label">Weekly Completion Rate</span>
            <div className="goal-progress">
              <div className="goal-bar">
                <div 
                  className="goal-fill" 
                  style={{ width: `${Math.min(completionRate, 100)}%` }}
                ></div>
              </div>
              <span className="goal-value">{completionRate}%</span>
            </div>
            <div className="goal-description">
              {completionRate >= 80 ? '🌟 Outstanding productivity this week!' :
               completionRate >= 60 ? '📈 Great progress! You\'re on track!' :
               completionRate >= 40 ? '📊 Steady progress! Keep building momentum!' :
               '💡 Focus on completing tasks to boost your productivity!'}
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h3>💡 Insights</h3>
          <div className="insights">
            {completionRate >= 80 ? (
              <p className="insight positive">🎉 Excellent productivity! You're completing most of your tasks.</p>
            ) : completionRate >= 60 ? (
              <p className="insight neutral">👍 Good progress! You're on track with your tasks.</p>
            ) : (
              <p className="insight improvement">💪 Keep going! Focus on completing more tasks to boost productivity.</p>
            )}
            
            {pendingTasks > completedTasks && (
              <p className="insight improvement">📝 You have more pending tasks than completed ones. Consider prioritizing!</p>
            )}
            
            {totalTasks === 0 && (
              <p className="insight neutral">🚀 Ready to start? Add your first task to begin tracking your productivity!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
