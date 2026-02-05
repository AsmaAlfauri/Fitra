const express = require('express');
const {createNewUser , login} = require ('../controllers/authControllers')

const authRouter = express.Router();

// ===== SIGNUP =====
authRouter.post('/signup', createNewUser);

// ===== SIGN-IN =====
authRouter.post('/login', login);

module.exports = authRouter;
