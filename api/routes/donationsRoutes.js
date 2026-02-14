const express = require('express');
const { verifyToken, checkRole } = require('../middleware/jwtMiddleware');
const donationRouter = express.Router();

const {
  createDonation,
  updateDonationStatus,
  getDonations
} = require('../controllers/donationControllers');

donationRouter.get(
  '/',
  verifyToken,
  checkRole('admin', 'viewer'),
  getDonations
);

donationRouter.post(
  '/',
  verifyToken,
  checkRole('admin','viewer'),
  createDonation
);

donationRouter.put(
  '/:id/status',
  verifyToken,
  checkRole('admin'),
  updateDonationStatus
);


module.exports = donationRouter;
