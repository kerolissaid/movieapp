const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const {errorHandler} = require('./middlewares/errorHandler.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const app = express();
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth/', authRoutes);
app.use('/api/users/', userRoutes);




module.exports = app;