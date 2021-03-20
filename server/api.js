const api = require('express')();

const tasksRouter = require('./routers/tasksRouter');

api.use('/tasks', tasksRouter);

module.exports = api;
