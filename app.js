const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const {errorHandler} = require('./middlewares/errorHandler.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const movieRoutes = require('./routes/movieRoutes.js');
const genreRoutes = require('./routes/genreRoutes.js');
const personRoutes = require('./routes/personRoutes.js');
const myListRoutes = require('./routes/myListRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const app = express();
app.use(express.json());
app.use(errorHandler);

app.use('/api/auth/', authRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/movies/', movieRoutes);
app.use('/api/genres/', genreRoutes);
app.use('/api/persons/', personRoutes);
app.use('/api/myList/', myListRoutes);
app.use('/api/reviews/', reviewRoutes);




module.exports = app;