const mongoose = require('mongoose');
const Date = mongoose.model('Date');
const fs = require('fs');
const path = require('path');

exports.createStore = async (req, res) => {
  const date = await (new Date(req.body).save());
  req.flash('success', `Successfully created Date`);
  res.redirect('/add');
};