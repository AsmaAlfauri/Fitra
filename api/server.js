require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require ('./models/db')
const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

// Routers
app.use('/users', userRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
