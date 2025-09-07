import React from 'react';

const Navigation = ({ currentScreen, onScreenChange }) => {
  const screens = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <h2>TaskManager</h2>
      </div>
      <div className="nav-menu">
        {screens.map(screen => (
          <button
            key={screen.id}
            className={`nav-item ${currentScreen === screen.id ? 'active' : ''}`}
            onClick={() => onScreenChange(screen.id)}
          >
            <span className="nav-icon">{screen.icon}</span>
            <span className="nav-label">{screen.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
