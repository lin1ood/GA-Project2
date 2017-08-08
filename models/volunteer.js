const mongoose = require('mongoose');
const Event = require('./events.js');

const volSchema = mongoose.Schema({
	name: String,
	email: {type: String, required:true},
  memberID: {type: String, unique: true},
	events: [Event.schema]
});

const Volunteer = mongoose.model('Volunteer', volSchema);

module.exports = Volunteer;
