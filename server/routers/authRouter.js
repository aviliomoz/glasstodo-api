const router = require('express').Router();
const authController = require('../controllers/authController');
const { verifyJWT } = require('../middlewares/authMiddleware');

router.post('/signin', authController.signin);
router.post('/login', authController.login);
router.post('/renew/:uid', verifyJWT, authController.renew);

module.exports = router;
