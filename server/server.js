const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const userRouter = require('./routers/users');
const recipeRouter = require('./routers/recipes');
const path = require('path');

const origin =
  process.env.NODE_ENV === 'production'
    ? 'https://feast-finder2-d0271ea4d475.herokuapp.com/'
    : 'http://localhost:5173';

app.use(
  cors({
    origin: origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.options(
  '*',
  cors({
    origin: origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());
app.use('/users', userRouter);
app.use('/recipes', recipeRouter);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

mongoose.connect(process.env.CONNECTION_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connection successful'));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
