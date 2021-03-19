const tasksRouter = require('./routers/tasksRouter');

const api = require('express')();

api.use('/tasks', tasksRouter);

module.exports = api;
