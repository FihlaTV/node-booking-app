const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');
const Date = require('../models/Date')

// Do work here

router.get('/', (req, res) => {
  res.send('Hey! It works!');
});

router.get('/add', (req, res) => {
  res.render('slots');
});

router.get('/map', (req, res) => {
  res.render('booking');
});

router.post('/add', catchErrors(storeController.createStore));
// API

router.get('/api/calendar', (req, res, next) => {
  Date.find()
    .exec()
    .then((counter) => res.json(counter))
    .catch((err) => next(err));
});

module.exports = router;
