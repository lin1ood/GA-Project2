const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
	title:String,
	date: Date,
	time: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
