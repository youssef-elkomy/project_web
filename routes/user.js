const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', (req, res) => res.render('index.ejs'));

// Static/specific routes should come before dynamic ones
router.get('/', userController.getAllUsers);
router.get('/get/count', userController.getUserCount);
router.post('/register', userController.registerUser);
router.post('/', userController.createUser);

// Dynamic route comes last to avoid conflict
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
