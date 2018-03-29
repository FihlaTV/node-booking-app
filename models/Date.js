const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const moment = require('moment');

const dateSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  slots: [String]
});

dateSchema.pre('save', async function(next) {
	if (!this.isModified('date')) {
		next(); // skip it
		return; // stop this function from running
	}
  this.date = moment(this.date).toISOString();
  const storesDate = await this.constructor.find({date: this.date});
  
  next();
	// TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Date', dateSchema);