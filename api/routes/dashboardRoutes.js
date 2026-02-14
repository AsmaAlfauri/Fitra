const express = require('express');
const dashboardRouter = express.Router();
const {
  getDashboardStats,
  getDonationsPerCampaign,
} = require('../controllers/dashboardController');
const {verifyToken} = require('../middleware/jwtMiddleware');
const { getDonations } = require('../controllers/donationControllers');

dashboardRouter.get('/stats', verifyToken, getDashboardStats);
dashboardRouter.get('/', verifyToken, getDonations);
dashboardRouter.get('/donations-per-campaign', verifyToken, getDonationsPerCampaign);

module.exports = dashboardRouter;
