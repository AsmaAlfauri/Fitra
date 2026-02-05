const pool = require("../models/db");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT id, name, email, role, status FROM users ORDER BY id ASC');
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE USER (role/status)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    const updatedUser = await pool.query(
      'UPDATE users SET role = $1, status = $2 WHERE id = $3 RETURNING id, name, email, role, status',
      [role, status, id]
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING id, name, email, role',
      [id]
    );

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', user: deletedUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
