const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://*.vercel.app',   // Vercel deployments
    'https://*.netlify.app'   // Netlify deployments (if needed)
  ],
  credentials: true
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Task Manager API is running!',
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

// In-memory storage for tasks
let tasks = [
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

let nextId = 3;

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
    id: nextId++,
    title: title.trim(),
    completed: false,
    dueDate: dueDate || null,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
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
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
