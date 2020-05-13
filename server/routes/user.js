const router = require('express').Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

router.post('/login', UserController.loginAdmin);
router.get('/check-user', authentication, UserController.dataAdmin);

module.exports = router;