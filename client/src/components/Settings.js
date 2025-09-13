import React, { useState, useEffect } from 'react';

const Settings = ({ tasks, onClearAllTasks, onExportTasks, onImportTasks }) => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
    showCompletedTasks: true
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('taskManagerSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.body.className = `theme-${settings.theme}`;
  }, [settings.theme]);

  const handleSettingChange = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    localStorage.setItem('taskManagerSettings', JSON.stringify(newSettings));
    
    // Show notification if enabled
    if (settings.notifications) {
      showNotification(`Setting updated: ${key}`);
    }
  };

  const showNotification = (message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Task Manager', { body: message });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Task Manager', { body: message });
        }
      });
    }
  };

  const handleExportTasks = async () => {
    setIsExporting(true);
    try {
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showNotification('Tasks exported successfully!');
    } catch (error) {
      alert('Error exporting tasks: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportTasks = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setIsImporting(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedTasks = JSON.parse(e.target.result);
            if (Array.isArray(importedTasks)) {
              onImportTasks(importedTasks);
              showNotification('Tasks imported successfully!');
            } else {
              throw new Error('Invalid file format');
            }
          } catch (error) {
            alert('Error importing tasks: ' + error.message);
          } finally {
            setIsImporting(false);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear ALL tasks? This action cannot be undone.')) {
      if (window.confirm('This will permanently delete all your tasks. Are you absolutely sure?')) {
        onClearAllTasks();
        showNotification('All tasks cleared!');
      }
    }
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>Settings & Preferences</h2>
        <p>Customize your Task Manager experience</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>🎨 Appearance</h3>
          <div className="setting-item">
            <label htmlFor="theme">Theme</label>
            <select 
              id="theme"
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>🔔 Notifications</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              Enable notifications
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>💾 Data & Storage</h3>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
              />
              Auto-save changes
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.showCompletedTasks}
                onChange={(e) => handleSettingChange('showCompletedTasks', e.target.checked)}
              />
              Show completed tasks
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>📊 About</h3>
          <div className="about-info">
            <div className="about-item">
              <strong>Version:</strong> 1.0.0
            </div>
            <div className="about-item">
              <strong>Built with:</strong> React, Node.js, Express
            </div>
            <div className="about-item">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>🛠️ Actions</h3>
          <div className="action-buttons">
            <button 
              className="btn btn-secondary"
              onClick={handleExportTasks}
              disabled={isExporting || tasks.length === 0}
            >
              {isExporting ? 'Exporting...' : 'Export Tasks'}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleImportTasks}
              disabled={isImporting}
            >
              {isImporting ? 'Importing...' : 'Import Tasks'}
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleClearAllTasks}
              disabled={tasks.length === 0}
            >
              Clear All Tasks
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h3>📞 Support</h3>
          <div className="support-info">
            <p>Need help or have suggestions?</p>
            <div className="support-links">
              <a href="#" className="support-link">📧 Contact Support</a>
              <a href="#" className="support-link">📖 User Guide</a>
              <a href="#" className="support-link">🐛 Report Bug</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
