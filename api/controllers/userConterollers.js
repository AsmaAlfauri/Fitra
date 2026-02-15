const pool = require("../models/db");
const bcrypt = require("bcrypt");

// GET ALL USERS → Admin only
const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, name, email, role, status FROM users ORDER BY id ASC"
    );
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET USER BY ID → Admin or owner
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    if (requesterId !== Number(id) && requesterRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const user = await pool.query(
      "SELECT id, name, email, role, status FROM users WHERE id = $1",
      [id]
    );

    if (user.rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE USER → Admin or owner
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, status } = req.body;

    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    if (requesterId !== Number(id) && requesterRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const fields = ["name", "email"];
    const values = [name, email];
    let query = "UPDATE users SET name = $1, email = $2";
    let index = 3;

    if (hashedPassword) {
      query += `, password = $${index++}`;
      values.push(hashedPassword);
    }

    // Only admin can update role/status
    if (requesterRole === "admin") {
      if (role) {
        query += `, role = $${index++}`;
        values.push(role);
      }
      if (status !== undefined) {
        query += `, status = $${index++}`;
        values.push(status);
      }
    }

    query += ` WHERE id = $${index} RETURNING id, name, email, role, status`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE USER → Admin or owner
const deleteUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    if (requesterId !== Number(id) && requesterRole !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    await client.query("BEGIN");

    const userCheck = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    if (userCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "User not found" });
    }

    await client.query("DELETE FROM donations WHERE user_id = $1", [id]);

  
    const deletedUser = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, name, email, role",
      [id]
    );

    await client.query("COMMIT");

    res.json({ message: "User and related donations deleted successfully", user: deletedUser.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
};


module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
