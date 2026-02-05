const express = require('express');
const { getUsers } = require('../controllers/userConterollers');

const userRouter = express.Router();

userRouter.get('/', getUsers);

module.exports = userRouter;
