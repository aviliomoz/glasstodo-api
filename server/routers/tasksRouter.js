const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

const tasksRouter = express.Router();

tasksRouter.get('/', getTasks);

tasksRouter.post('/', createTask);

tasksRouter.put('/:id', updateTask);

tasksRouter.delete('/:id', deleteTask);

module.exports = tasksRouter;
