const { request, response } = require('express');
const Task = require('../models/taskModel');

const getTasks = async (req = request, res = response) => {
  try {
    const tasks = await Task.find();

    return res.status(200).json({
      ok: true,
      tasks,
    });
  } catch (error) {
    console.log('Error en el servidor', error);
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
      error,
    });
  }
};

const createTask = async (req = request, res = response) => {
  try {
    const { title } = req.body.task;
    const task = new Task({
      title,
    });

    const savedTask = await task.save();

    if (savedTask) {
      return res.status(200).json({
        ok: true,
        msg: 'Tarea guardada corectamente',
        task: savedTask,
      });
    } else {
      return res.status(400).json({
        ok: false,
        msg: 'No se pudo guardar la tarea',
      });
    }
  } catch (error) {
    console.log('Error en el servidor', error);
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
      error,
    });
  }
};

const updateTask = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const { title, completed } = req.body.task;

    await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true },
      (error, updatedTask) => {
        if (error) {
          res.status(400).json({
            ok: false,
            msg: 'No se pudo actualizar la tarea',
          });
        }

        if (updatedTask) {
          res.status(200).json({
            ok: true,
            msg: 'Tarea actualizada exitosamente',
            task: updatedTask,
          });
        }
      },
    );
  } catch (error) {
    console.log('Error en el servidor', error);
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
      error,
    });
  }
};

const deleteTask = async (req = request, res = response) => {
  try {
    const id = req.params.id;

    await Task.findByIdAndDelete(id, (error, deletedTask) => {
      if (error) {
        res.status(400).json({
          ok: false,
          msg: 'No se pudo eliminar la tarea',
        });
      }

      if (deletedTask) {
        res.status(200).json({
          ok: true,
          msg: 'Tarea eliminada exitosamente',
          task: deletedTask,
        });
      }
    });
  } catch (error) {
    console.log('Error en el servidor', error);
    return res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
      error,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
