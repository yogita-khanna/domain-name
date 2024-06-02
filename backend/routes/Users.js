// import express from 'express';
const express = require('express');
const user = require('../controller/Users.js')
// import { Login, Logout, Register} from '../controllers/userController.js';
// import isAuthenticated from '../config/Auth.js';

const router = express.Router();

router.post('/user/register', user.Register);
router.post('/user/login', user.Login);
router.get('/user/logout', user.Logout);

// router.route('/register').post(Register);
// router.route('/login').post(Login);
// router.route('/logout').get(Logout);

// export default router;
module.exports = router;