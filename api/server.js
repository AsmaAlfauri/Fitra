require('dotenv').config();
const express = require('express');
const expressCoreValidator = require('express-core-validator');
const cors = require('cors');
const db = require ('./models/db')
const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const campaignRouter = require('./routes/campaignRoutes');
const donationRouter = require('./routes/donationsRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');

app.use(cors());
app.use(express.json());
app.use(expressCoreValidator());

// Routers
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/campaigns', campaignRouter);
app.use('/donations', donationRouter);
app.use('/dashboard', dashboardRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
