const api = require('express')();

const tasksRouter = require('./routers/tasksRouter');
const authRouter = require('./routers/authRouter');

api.use('/tasks', tasksRouter);
api.use('/auth', authRouter);

module.exports = api;
