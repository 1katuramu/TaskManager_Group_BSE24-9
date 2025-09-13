# Task Manager

A professional task management application we built to help organize and track daily productivity. It's a full-stack application with a modern React frontend and a robust Node.js backend.

## What it does

This app helps you stay productive with:
- **Smart Task Management** - Add, edit, and delete tasks with ease
- **Visual Progress Tracking** - See completed tasks with strikethrough styling and progress counters
- **Due Date Support** - Set deadlines for your tasks to stay on track
- **Professional Dashboard** - Get insights into your productivity patterns
- **Analytics & Insights** - Track your daily and weekly completion rates
- **Multiple Views** - Switch between Dashboard, Tasks, Analytics, and Settings
- **Theme Customization** - Choose between light and dark modes
- **Data Management** - Export and import your tasks for backup

## How it's organized

```
TaskManager/
├── client/                 # The React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Navigation.js     # Sidebar navigation
│   │   │   ├── Dashboard.js     # Overview dashboard
│   │   │   ├── TasksScreen.js   # Task management with filtering
│   │   │   ├── Analytics.js     # Productivity insights
│   │   │   ├── Settings.js      # App configuration
│   │   │   ├── TaskForm.js      # Add tasks with due dates
│   │   │   ├── TaskList.js      # Display tasks
│   │   │   └── TaskItem.js      # Individual task item
│   │   ├── App.js          # Main app with routing
│   │   ├── index.js
│   │   └── index.css       # Professional styling
│   └── package.json
├── server/                 # The Node.js backend
│   ├── server.js          # API server with timestamps
│   └── package.json
├── api-tester.html        # Interactive API testing tool
└── README.md
```

## ✨ Key Features

### 🎯 **Professional Interface**
- **Multi-Screen Navigation** - Dashboard, Tasks, Analytics, and Settings
- **Responsive Design** - Works perfectly on desktop and mobile
- **Theme Support** - Light and dark modes with smooth transitions
- **Modern UI** - Clean, professional design with smooth animations

### 📊 **Smart Analytics**
- **Productivity Dashboard** - Visual overview of your task completion
- **Weekly Charts** - See your productivity patterns over time
- **Daily Goals** - Track progress toward daily task targets
- **Completion Insights** - Get motivational feedback on your progress

### ⏰ **Time Management**
- **Due Dates** - Set deadlines for your tasks
- **Completion Timestamps** - Track exactly when tasks are finished
- **Progress Tracking** - Visual indicators for completed vs pending tasks
- **Smart Filtering** - View all, pending, or completed tasks

### 🔧 **Advanced Features**
- **Data Export/Import** - Backup and restore your tasks
- **Settings Persistence** - Your preferences are saved automatically
- **Browser Notifications** - Get notified of important actions
- **API Testing Tool** - Built-in tool to test all endpoints

## Getting started

You'll need Node.js installed on your computer. If you don't have it, download it from [nodejs.org](https://nodejs.org).

## Setup

First, install the backend dependencies:

```bash
cd server
npm install
```

Then, install the frontend dependencies:

```bash
cd ../client
npm install
```

## Running the app

### 🚀 **Quick Start**

1. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```
   You should see "Server is running on port 5000"

2. **Start the frontend (in a new terminal):**
   ```bash
   cd client
   npm start
   ```
   The app will open at `http://localhost:3000`

3. **Test the API (optional):**
   Open `http://localhost:5000/api-tester.html` to test all endpoints

### 🎯 **Using the App**

- **Dashboard** - Overview of your productivity and recent tasks
- **Tasks** - Manage your tasks with filtering (All/Pending/Completed)
- **Analytics** - View productivity charts and completion insights
- **Settings** - Customize themes, notifications, and manage data

### 💡 **Pro Tips**

- Use the **Advanced** button in the task form to set due dates
- Switch to **Dark Mode** in Settings for better night-time use
- Export your tasks regularly for backup
- Check Analytics daily to track your productivity patterns

## 🔧 How the backend works

The backend provides a RESTful API with these endpoints:

- `GET /tasks` - Retrieve all tasks with timestamps
- `POST /tasks` - Create a new task (supports due dates)
- `PUT /tasks/:id` - Update task title, completion status, or due date
- `DELETE /tasks/:id` - Remove a task permanently

### 📊 **Enhanced Data Structure**
Each task now includes:
- `id` - Unique identifier
- `title` - Task description
- `completed` - Boolean completion status
- `dueDate` - Optional deadline (ISO date string)
- `createdAt` - When the task was created
- `completedAt` - When the task was finished (if completed)

## API Testing

### 🧪 **Interactive API Tester**

We've included a professional API testing tool that fits perfectly in your browser without scrolling:

1. **Start your server** (make sure it's running on port 5000)
2. **Open the API tester** at: `http://localhost:5000/api-tester.html`
3. **Test all endpoints** with the compact, professional interface

> **Note:** Always access through the server URL - opening the HTML file directly won't work due to browser security.

**Features:**
- ✅ **GET** - Retrieve all tasks
- ➕ **POST** - Add new tasks with due dates
- ✏️ **PUT** - Update existing tasks
- 🗑️ **DELETE** - Remove tasks
- 🔄 **Complete Flow Test** - Automated CRUD testing
- 📝 **Bulk Operations** - Add multiple test tasks
- 📊 **Real-time Results** - See responses instantly in the compact result panel

### Manual API Testing

If you prefer to test the API directly with code, here are some examples:

```javascript
// Get all tasks with timestamps
fetch('http://localhost:5000/tasks')
  .then(response => response.json())
  .then(tasks => console.log(tasks));

// Add a new task with due date
fetch('http://localhost:5000/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    title: 'Complete project', 
    dueDate: '2024-12-31' 
  })
})
.then(response => response.json())
.then(task => console.log('Added:', task));

// Update task title and mark as completed
fetch('http://localhost:5000/tasks/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    title: 'Updated task title',
    completed: true 
  })
})
.then(response => response.json())
.then(task => console.log('Updated:', task));

// Delete a task
fetch('http://localhost:5000/tasks/1', {
  method: 'DELETE'
})
.then(() => console.log('Task deleted'));
```

### API Endpoints Reference

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/tasks` | Get all tasks with timestamps | - |
| `POST` | `/tasks` | Create a new task | `{ "title": "Task name", "dueDate": "2024-12-31" }` |
| `PUT` | `/tasks/:id` | Update task properties | `{ "title": "New name", "completed": true, "dueDate": "2024-12-31" }` |
| `DELETE` | `/tasks/:id` | Delete a task permanently | - |

### Troubleshooting the API Tester

**If the API tester isn't working:**

1. **Make sure your server is running** - You should see "Server is running on port 5000" in your terminal
2. **Use the correct URL** - Always go to `http://localhost:5000/api-tester.html`, not the file directly
3. **Check the browser console** - Press F12 and look for any error messages
4. **Try the "Test Complete Flow" button** - This tests all endpoints automatically and shows you exactly what's happening

**Common issues:**
- **"Failed to fetch"** - Server isn't running or wrong URL
- **"CORS error"** - You're opening the HTML file directly instead of through the server
- **"JSON parsing error"** - Usually means the server isn't responding properly

## Development tips

If you're working on the backend and want it to restart automatically when you make changes:

```bash
cd server
npm run dev
```

The frontend already reloads automatically when you save changes.

## Building for production

When you're ready to deploy, build the frontend:

```bash
cd client
npm run build
```

This creates optimized files in a `build` folder that you can serve from any web server.

## 🛠️ What we used to build this

**Frontend Technologies:**
- **React 18** with modern hooks and functional components
- **Professional CSS** with flexbox, grid, and smooth animations
- **Responsive Design** that works on all screen sizes
- **Local Storage** for settings persistence
- **Browser Notifications API** for user feedback

**Backend Technologies:**
- **Node.js** with Express framework
- **RESTful API** design with proper HTTP methods
- **CORS** enabled for cross-origin requests
- **JSON** data format with timestamps
- **In-memory storage** (perfect for development and testing)

**Development Features:**
- **Hot Reload** - Frontend updates automatically when you save
- **API Testing Tool** - Built-in endpoint testing interface
- **Error Handling** - Graceful error messages throughout
- **Type Safety** - Consistent data structures

**Note:** Tasks are stored in memory, so they reset when you restart the server. For production, you'd want to add a database like MongoDB or PostgreSQL, but this keeps things simple and fast for development!
