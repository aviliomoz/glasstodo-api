const router = require('express').Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getTasks);

router.post('/', tasksController.createTask);

router.put('/:id', tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;
