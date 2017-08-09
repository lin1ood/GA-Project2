const express = require('express');
const router = express.Router();
const dateFormat = require('dateformat');
const Event = require('../models/events.js');
const Volunteer = require('../models/volunteer.js');
const Nexmo = require('nexmo');
const YOUR_API_KEY = 'd574ba15';
const YOUR_API_SECRET = '86aa0dbd1b068549';
const YOUR_VIRTUAL_NUMBER = '12028525641';
const nexmo = new Nexmo({
  apiKey: YOUR_API_KEY,
  apiSecret: YOUR_API_SECRET
});
const from = 'Nexmo';
const volMessBase = 'Thanks for volunteering to help with ';

router.get('/', (req, res) => {
	if (!req.session.logged) {
		console.log('user not logged');
		res.redirect('/sessions/login');
	};
	Event.find({}, (err, foundEvents) => {
		if (err) {
			res.send('There are currently no Events');
		} else {
			Volunteer.find({}, (err, foundVolunteers)=>{
  			res.render('events/index.ejs', {
				events: foundEvents,
        volunteers: foundVolunteers
        });
  		});
    }
  });
});

router.get('/new', (req, res)=>{
    Volunteer.find({}, (err, allVolunteers)=>{
        res.render('events/new.ejs', {
            volunteers: allVolunteers
        });
    });
});

router.post('/', (req, res)=>{
    Volunteer.findById(req.body.volunteerId, (err, foundVolunteer)=>{
        Event.create(req.body, (err, createdEvent)=>{
            foundVolunteer.events.push(createdEvent);
            foundVolunteer.save((err, data)=>{
                res.redirect('/events');
								// build and send SMS to the Volunteer
								let cell = foundVolunteer.cell.split('-');
								cell = '1' + cell.join('');
								// console.log('cell', cell);
								let message = volMessBase + createdEvent.title + ' ' + createdEvent.time + ' ' + createdEvent.date;
                //using nexmo
								nexmo.message.sendSms(
							  YOUR_VIRTUAL_NUMBER, cell, message,
							    (err, responseData) => {
							      if (err) {
							        console.log(err);
							      } else {
							        // console.dir(responseData);
							      }
							    });
            });
        });
    });
});

router.get('/:id', (req, res)=>{
    Event.findById(req.params.id, (err, foundEvent)=>{
        Volunteer.findOne({'events._id':req.params.id}, (err, foundVolunteer)=>{
            res.render('events/show.ejs', {
                volunteer:foundVolunteer,
                event: foundEvent
            });
        })
    });
});

router.delete('/:id', (req, res)=>{
    Event.findByIdAndRemove(req.params.id, (err, foundEvent)=>{
        Volunteer.findOne({'events._id':req.params.id}, (err, foundVolunteer)=>{
            foundVolunteer.events.id(req.params.id).remove();
            foundVolunteer.save((err, data)=>{
                res.redirect('/events');
            });
        });
    });
});

router.get('/:id/edit', (req, res)=>{
	Event.findById(req.params.id, (err, foundEvent)=>{
		Volunteer.find({}, (err, allVolunteers)=>{
			Volunteer.findOne({'events._id':req.params.id}, (err, foundEventVolunteer)=>{
				res.render('events/edit.ejs', {
					event: foundEvent,
					volunteers: allVolunteers,
					eventVolunteer: foundEventVolunteer
				});
			});
		});
	});
});

router.put('/:id', (req, res)=>{
    Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEvent)=>{
        Volunteer.findOne({ 'events._id' : req.params.id }, (err, foundVolunteer)=>{
			if(foundVolunteer._id.toString() !== req.body.VolunteerId){
				foundVolunteer.events.id(req.params.id).remove();
				foundVolunteer.save((err, savedFoundVolunteer)=>{
					Volunteer.findById(req.body.VolunteerId, (err, newVolunteer)=>{
						newVolunteer.events.push(updatedEvent);
						newVolunteer.save((err, savedNewVolunteer)=>{
			                res.redirect('/events/'+req.params.id);
			            });
					});
	            });
			} else {
				foundVolunteer.events.id(req.params.id).remove();
	            foundVolunteer.events.push(updatedEvent);
	            foundVolunteer.save((err, data)=>{
	                res.redirect('/events/'+req.params.id);
	            });
			}
        });
    });
});

module.exports = router;
