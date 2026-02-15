const pool = require('../models/db');

// ===== DASHBOARD STATS =====
const getDashboardStats = async (req, res) => {
  try {
    const campaignsCount = await pool.query(
      'SELECT COUNT(*) FROM campaigns'
    );

    const activeCampaigns = await pool.query(
      "SELECT COUNT(*) FROM campaigns WHERE status = 'active'"
    );

    const donationsCount = await pool.query(
      'SELECT COUNT(*) FROM donations'
    );

const approvedDonationsSum = await pool.query(
  "SELECT COALESCE(SUM(amount), 0) AS total FROM donations WHERE status = 'approved'"
);

res.json({
  totalCampaigns: Number(campaignsCount.rows[0].count),
  activeCampaigns: Number(activeCampaigns.rows[0].count),
  totalDonations: Number(donationsCount.rows[0].count),
  approvedDonationsSum: Number(approvedDonationsSum.rows[0].total),
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

// ===== DONATIONS PER CAMPAIGN =====
const getDonationsPerCampaign = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.title,
        COALESCE(SUM(d.amount), 0) AS total
      FROM campaigns c
      LEFT JOIN donations d ON d.campaign_id = c.id AND d.status = 'approved'
      GROUP BY c.title
      ORDER BY total DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
};



module.exports = {
  getDashboardStats,
  getDonationsPerCampaign,
};
