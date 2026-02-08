const express = require('express');
const dashboardRouter = express.Router();
const {
  getDashboardStats,
  getDonationsPerCampaign,
  getDonations,
} = require('../controllers/dashboardController');
const {verifyToken} = require('../middleware/jwtMiddleware');

dashboardRouter.get('/stats', verifyToken, getDashboardStats);
dashboardRouter.get('/', verifyToken, getDonations);
dashboardRouter.get('/donations-per-campaign', verifyToken, getDonationsPerCampaign);

module.exports = dashboardRouter;
