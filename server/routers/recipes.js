const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
require('dotenv').config();

router.get('/search', (req, res) => {
  const query = req.query.query;
  const apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}`;
  if (query.includes(',')) {
    axios
      .get(`${apiURL}&includeIngredients=${query}&number=100`)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    axios
      .get(`${apiURL}&query=${query}&number=100`)
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
});

router.get('/random', (req, res) => {
  const apiURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=8`;
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/information', (req, res) => {
  const recipeId = req.query.id;
  const apiURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`;
  axios
    .get(apiURL)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
