const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userConterollers");
const { verifyToken } = require("../middleware/jwtMiddleware");

const userRouter = express.Router();

// GET all users → Admin only
userRouter.get("/", verifyToken, (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  next();
}, getAllUsers);

// GET single user → Admin or owner
userRouter.get("/:id", verifyToken, getUserById);

// UPDATE user → Admin or owner
userRouter.put("/:id", verifyToken, updateUser);

// DELETE user → Admin or owner
userRouter.delete("/:id", verifyToken, deleteUser);

module.exports = userRouter;
