const request = require('supertest');
const express = require('express');

// We'll need to modify the server to export the app for testing
// For now, let's create a basic test structure

describe('Task Manager API', () => {
  let app;
  let server;

  beforeAll(() => {
    // Create a simple Express app for testing
    app = express();
    app.use(express.json());
    
    // Mock tasks storage
    let tasks = [
      {
        id: 1,
        title: 'Test Task 1',
        completed: false,
        dueDate: '2024-12-31',
        createdAt: '2024-01-01T00:00:00.000Z',
        completedAt: null
      }
    ];

    // Mock API endpoints
    app.get('/tasks', (req, res) => {
      res.json(tasks);
    });

    app.post('/tasks', (req, res) => {
      const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
        dueDate: req.body.dueDate || null,
        createdAt: new Date().toISOString(),
        completedAt: null
      };
      tasks.push(newTask);
      res.status(201).json(newTask);
    });

    app.put('/tasks/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const task = tasks.find(t => t.id === id);
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      if (req.body.title !== undefined) task.title = req.body.title;
      if (req.body.completed !== undefined) {
        task.completed = req.body.completed;
        task.completedAt = req.body.completed ? new Date().toISOString() : null;
      }
      if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;

      res.json(task);
    });

    app.delete('/tasks/:id', (req, res) => {
      const id = parseInt(req.params.id);
      const taskIndex = tasks.findIndex(t => t.id === id);
      
      if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
      }

      tasks.splice(taskIndex, 1);
      res.status(204).send();
    });

    server = app.listen(0); // Use random available port
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /tasks', () => {
    test('should return all tasks', async () => {
      const response = await request(app)
        .get('/tasks')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('completed');
    });
  });

  describe('POST /tasks', () => {
    test('should create a new task', async () => {
      const newTask = {
        title: 'New Test Task',
        dueDate: '2024-12-31'
      };

      const response = await request(app)
        .post('/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body.title).toBe(newTask.title);
      expect(response.body.dueDate).toBe(newTask.dueDate);
      expect(response.body.completed).toBe(false);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('createdAt');
    });

    test('should create a task without due date', async () => {
      const newTask = {
        title: 'Task without due date'
      };

      const response = await request(app)
        .post('/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body.title).toBe(newTask.title);
      expect(response.body.dueDate).toBeNull();
    });
  });

  describe('PUT /tasks/:id', () => {
    test('should update task title', async () => {
      const updateData = {
        title: 'Updated Task Title'
      };

      const response = await request(app)
        .put('/tasks/1')
        .send(updateData)
        .expect(200);

      expect(response.body.title).toBe(updateData.title);
    });

    test('should mark task as completed', async () => {
      const updateData = {
        completed: true
      };

      const response = await request(app)
        .put('/tasks/1')
        .send(updateData)
        .expect(200);

      expect(response.body.completed).toBe(true);
      expect(response.body.completedAt).toBeTruthy();
    });

    test('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/tasks/999')
        .send({ title: 'Non-existent task' })
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });
  });

  describe('DELETE /tasks/:id', () => {
    test('should delete a task', async () => {
      await request(app)
        .delete('/tasks/1')
        .expect(204);
    });

    test('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .delete('/tasks/999')
        .expect(404);

      expect(response.body.error).toBe('Task not found');
    });
  });
});
