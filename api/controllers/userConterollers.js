const pool = require("../models/db");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, status, created_at FROM users ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {getUsers}