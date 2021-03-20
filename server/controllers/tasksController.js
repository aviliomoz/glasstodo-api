const { request, response } = require('express');
const Task = require('../models/taskModel');

const getTasks = (req = request, res = response) => {
  Task.find({}, (err, tasksDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'Error en el servidor',
        err,
      });
    }

    if (!tasksDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro ninguna tarea',
      });
    }

    return res.status(200).json({
      ok: true,
      tasks: tasksDB,
    });
  });
};

const createTask = (req = request, res = response) => {
  const { title, completed = false } = req.body.task;
  const task = new Task({
    title,
    completed,
  });

  task.save({}, (err, taskDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'Error en el servidor',
        err,
      });
    }

    if (!taskDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se pudo guardar la tarea',
      });
    }

    return res.status(200).json({
      ok: true,
      msg: 'Tarea guardada correctamente',
      task: taskDB,
    });
  });
};

const updateTask = (req = request, res = response) => {
  const id = req.params.id;
  const { title, completed } = req.body.task;

  Task.findById(id, {}, {}, (err, taskDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'Error en el servidor',
        err,
      });
    }

    if (!taskDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar la tarea',
      });
    }

    taskDB.title = title;
    taskDB.completed = completed;

    taskDB.save({}, (err, updatedTask) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: 'Error en el servidor',
          err,
        });
      }

      if (!updatedTask) {
        return res.status(404).json({
          ok: false,
          msg: 'No se pudo actualizar la tarea',
        });
      }

      return res.status(200).json({
        ok: true,
        msg: 'Tarea actualizada exitosamente',
        task: updatedTask,
      });
    });
  });
};

const deleteTask = (req = request, res = response) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id, {}, (err, taskDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: 'Error en el servidor',
        err,
      });
    }

    if (!taskDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No se encontro la tarea',
      });
    }

    return res.status(200).json({
      ok: true,
      msg: 'Tarea eliminada exitosamente',
      task: taskDB,
    });
  });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
