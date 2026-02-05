const express = require('express');
const donationsRouter = express.Router();
const { getAllDonations, createDonation, updateDonationStatus, deleteDonation } = require('../controllers/donationControllers');
const { verifyToken, checkRole } = require('../middleware/jwtMiddleware');

// GET → anyone
donationsRouter.get('/', verifyToken, checkRole('admin', 'operations', 'viewer'), getAllDonations);

// POST → Admin / Operations 
donationsRouter.post('/', verifyToken, checkRole('admin', 'operations'), createDonation);

// PUT → Admin / Operations 
donationsRouter.put('/:id/status', verifyToken, checkRole('admin', 'operations'), updateDonationStatus);

// DELETE → Admin 
donationsRouter.delete('/:id', verifyToken, checkRole('admin'), deleteDonation);

module.exports = donationsRouter;
