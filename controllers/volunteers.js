const express = require('express');
const Volunteer = require('../models/volunteer.js');
const Event = require('../models/events.js');
const router = express.Router();

router.get('/', (req, res)=>{
	Volunteer.find({}, (err, foundVolunteers)=>{
		Event.find({}, (err, foundEvents) =>{
				console.log(foundEvents);		res.render('volunteers/index.ejs', {
				volunteers: foundVolunteers,
				events: foundEvents
			});
		});
	})
});

router.post('/', (req, res)=>{
	Volunteer.create(req.body, (err, createdVolunteer)=>{
		res.redirect('volunteers');
	});
});

router.get('/new', (req, res)=>{
	res.render('volunteers/new.ejs');
});

router.get('/:id', (req, res)=>{
	Volunteer.findById(req.params.id, (err, foundVolunteer)=>{
		res.render('volunteers/show.ejs', {
			volunteer: foundVolunteer
		});
	});
});

router.delete('/:id', (req, res)=>{
	Volunteer.findByIdAndRemove(req.params.id, (err, foundVolunteer)=>{
		const eventIds = [];
		for (let i = 0; i < foundVolunteer.events.length; i++) {
			eventIds.push(foundVolunteer.events[i]._id);
		}
		Event.remove(
			{
				_id : {
					$in: eventIds
				}
			},
			(err, data)=>{
				res.redirect('/volunteers');
			}
		);
	});
});

router.get('/:id/edit', (req, res)=>{
	Volunteer.findById(req.params.id, (err, foundVolunteer)=>{
		res.render('volunteers/edit.ejs', {
			volunteer: foundVolunteer
		});
	});
});

router.put('/:id', (req, res)=>{
	console.log('PUT from Edit', req.body)
	Volunteer.findByIdAndUpdate(req.params.id, req.body, ()=>{
		res.redirect('/volunteers');
	});
});

module.exports = router;
