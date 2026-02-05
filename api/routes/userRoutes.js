const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userConterollers');
const { verifyToken, checkRole } = require('../middleware/jwtMiddleware');

const userRouter = express.Router();

// GET /users → Admin Only
userRouter.get('/', verifyToken, checkRole('admin'), getAllUsers);

// PUT /users/:id → Admin Only
userRouter.put('/:id', verifyToken, checkRole('admin'), updateUser);

// DELETE /users/:id → Admin Only
userRouter.delete('/:id', verifyToken, checkRole('admin'), deleteUser);

module.exports = userRouter;
