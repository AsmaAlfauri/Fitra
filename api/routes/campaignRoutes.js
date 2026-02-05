const express = require('express');
const campaignRouter = express.Router();
const { getAllCampaigns, createCampaign, updateCampaign, deleteCampaign } = require('../controllers/campaignControllers');
const { verifyToken, checkRole } = require('../middleware/jwtMiddleware');

// GET → All
campaignRouter.get('/', verifyToken, checkRole('admin', 'operations', 'viewer'), getAllCampaigns);

// POST → Admin / Operations 
campaignRouter.post('/', verifyToken, checkRole('admin', 'operations'), createCampaign);

// PUT → Admin / Operations 
campaignRouter.put('/:id', verifyToken, checkRole('admin', 'operations'), updateCampaign);

// DELETE → Admin 
campaignRouter.delete('/:id', verifyToken, checkRole('admin'), deleteCampaign);

module.exports = campaignRouter;
