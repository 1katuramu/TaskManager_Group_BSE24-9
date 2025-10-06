const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Database file path
const DB_FILE = path.join(__dirname, 'data', 'tasks.json');
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Middleware
app.use(cors({
  origin: true, // Allow all origins for debugging
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Manager API is running!',
    version: '1.0.1',
    endpoints: {
      tasks: '/tasks',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files (for API tester)
app.use(express.static('../'));

// Database functions
function loadTasks() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
  
  // Default tasks for first run
  return [
    {
      id: 1,
      title: 'Learn React',
      completed: false,
      dueDate: null,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Build Task Manager',
      completed: false,
      dueDate: null,
      createdAt: new Date().toISOString()
    }
  ];
}

function saveTasks(tasks) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
}

function getNextId(tasks) {
  return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}

// Load tasks from database
let tasks = loadTasks();

// Routes

// GET /tasks - return all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - add a new task
app.post('/tasks', (req, res) => {
  const { title, dueDate } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const newTask = {
    id: getNextId(tasks),
    title: title.trim(),
    completed: false,
    dueDate: dueDate || null,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - update a task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const taskId = parseInt(id);

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Update task properties if provided
  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({ error: 'Task title cannot be empty' });
    }
    tasks[taskIndex].title = title.trim();
  }
  
  if (completed !== undefined) {
    tasks[taskIndex].completed = completed;
    if (completed) {
      tasks[taskIndex].completedAt = new Date().toISOString();
    } else {
      tasks[taskIndex].completedAt = null;
    }
  }

  saveTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskId = parseInt(id);

  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
