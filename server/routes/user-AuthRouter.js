const express = require('express');
const AuthController = require('../controllers/user-auth-controller')
const router = express.Router();

router.post('/register',AuthController.userRegister)


module.exports = router