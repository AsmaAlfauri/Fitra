const pool = require('../models/db');

// GET ALL CAMPAIGNS
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await pool.query('SELECT * FROM campaigns ORDER BY id ASC');
    res.json(campaigns.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// CREATE CAMPAIGN
const createCampaign = async (req, res) => {
  try {
    
    const { title, description, start_date, end_date, status } = req.body;

    const newCampaign = await pool.query(
      'INSERT INTO campaigns (title, description, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, start_date, end_date, status]
    );

    res.status(201).json(newCampaign.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE CAMPAIGN
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, start_date, end_date, status } = req.body;

    const updatedCampaign = await pool.query(
      'UPDATE campaigns SET title=$1, description=$2, start_date=$3, end_date=$4, status=$5 WHERE id=$6 RETURNING *',
      [title, description, start_date, end_date, status, id]
    );

    if (updatedCampaign.rows.length === 0) return res.status(404).json({ error: 'Campaign not found' });

    res.json(updatedCampaign.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE CAMPAIGN
const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCampaign = await pool.query(
      'DELETE FROM campaigns WHERE id=$1 RETURNING *',
      [id]
    );

    if (deletedCampaign.rows.length === 0) return res.status(404).json({ error: 'Campaign not found' });

    res.json({ message: 'Campaign deleted successfully', campaign: deletedCampaign.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
                                                                                                                        
module.exports = { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign };
