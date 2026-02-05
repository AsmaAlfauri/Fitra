const pool = require('../models/db');

// GET ALL DONATIONS (optionally by campaign_id)
const getAllDonations = async (req, res) => {
  try {
    const { campaign_id } = req.query;

    let query = 'SELECT * FROM donations ORDER BY id ASC';
    let values = [];

    if (campaign_id) {
      query = 'SELECT * FROM donations WHERE campaign_id=$1 ORDER BY id ASC';
      values = [campaign_id];
    }

    const donations = await pool.query(query, values);
    res.json(donations.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE DONATION
const createDonation = async (req, res) => {
  try {
    const { user_id, campaign_id, amount } = req.body;

    const newDonation = await pool.query(
      'INSERT INTO donations (user_id, campaign_id, amount) VALUES ($1, $2, $3) RETURNING *',
      [user_id, campaign_id, amount]
    );

    res.status(201).json(newDonation.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE DONATION STATUS
const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // pending / approved / rejected

    const updatedDonation = await pool.query(
      'UPDATE donations SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    );

    if (updatedDonation.rows.length === 0) return res.status(404).json({ error: 'Donation not found' });

    res.json(updatedDonation.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE DONATION
const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDonation = await pool.query(
      'DELETE FROM donations WHERE id=$1 RETURNING *',
      [id]
    );

    if (deletedDonation.rows.length === 0) return res.status(404).json({ error: 'Donation not found' });

    res.json({ message: 'Donation deleted successfully', donation: deletedDonation.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllDonations, createDonation, updateDonationStatus, deleteDonation };
