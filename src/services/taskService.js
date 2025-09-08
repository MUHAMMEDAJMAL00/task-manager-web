import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const taskService = {
  async fetchTasks() {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`, {
        params: {
          _limit: 10,
        },
      });
      
      return response.data.map(task => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        userId: task.userId,
        createdAt: new Date().toISOString(),
      }));
    } catch (error) {
      throw new Error('Failed to fetch tasks from server');
    }
  },

  generateId() {
    return Date.now() + Math.random();
  },

  createTask(taskData) {
    return {
      id: this.generateId(),
      title: taskData.title,
      completed: false,
      userId: taskData.userId || 1,
      createdAt: new Date().toISOString(),
    };
  },

  updateTask(taskId, updates) {
    return {
      ...updates,
      id: taskId,
      updatedAt: new Date().toISOString(),
    };
  },
};