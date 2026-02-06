const pool = require('../models/db');

// GET DONATIONS (admin + viewer) — by campaign
const getDonations = async (req, res) => {
  try {
    const { campaign_id } = req.query;

    if (!campaign_id) {
      return res.status(400).json({ error: 'campaign_id is required' });
    }

    const result = await pool.query(
      `
      SELECT 
        d.id,
        d.amount,
        d.status,
        d.created_at,
        u.name AS user_name,
        c.title AS campaign_title
      FROM donations d
      JOIN users u ON d.user_id = u.id
      JOIN campaigns c ON d.campaign_id = c.id
      WHERE d.campaign_id = $1
      ORDER BY d.created_at DESC
      `,
      [campaign_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
};

// CREATE DONATION
const createDonation = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { campaign_id, amount } = req.body;

    if (!campaign_id || !amount) {
      return res.status(400).json({ error: 'campaign_id and amount are required' });
    }

    const result = await pool.query(
      `
      INSERT INTO donations (user_id, campaign_id, amount)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [user_id, campaign_id, amount]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE STATUS
const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const result = await pool.query(
      `UPDATE donations SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createDonation,
  updateDonationStatus,
  getDonations
};
