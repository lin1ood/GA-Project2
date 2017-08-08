const express = require('express');
const router = express.Router();
const Event = require('../models/events.js');
const Volunteer = require('../models/volunteer.js')

router.get('/', (req, res)=>{
	if (!req.session.logged) {
		res.redirect('/sessions/login');
	};
	Event.find({}, (err, foundEvents)=>{
		res.render('events/index.ejs', {
			events: foundEvents
		});
	})
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
            });
        });
    });
});

router.get('/:id', (req, res)=>{
    Event.findById(req.params.id, (err, foundEvent)=>{
        Volunteer.findOne({'events._id':req.params.id}, (err, foundVolunteer)=>{
            res.render('events/show.ejs', {
                volunteer:foundVolunteer,
                Event: foundEvent
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
					Event: foundEvent,
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
