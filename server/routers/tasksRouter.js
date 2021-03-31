const router = require('express').Router();
const tasksController = require('../controllers/tasksController');
const { verifyJWT } = require('../middlewares/authMiddleware');

router.get('/:uid', verifyJWT, tasksController.getTasks);
router.post('/', verifyJWT, tasksController.createTask);
router.put('/:id', verifyJWT, tasksController.updateTask);
router.delete('/:id', verifyJWT, tasksController.deleteTask);

module.exports = router;
