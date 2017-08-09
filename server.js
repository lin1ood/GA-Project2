const express 				= require('express');
const app 						= express();
const mongoose 				= require('mongoose');
const bodyParser 			= require('body-parser');
const methodOverride 	= require('method-override')
const session 				= require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
//session middleware
//req.session param created
app.use(session({
	secret: "This is a random secret",
	resave: false,
	saveUninitialized: false
}));

const authorsController = require('./controllers/volunteers.js');
app.use('/volunteers', authorsController);
const articlesController = require('./controllers/events.js');
app.use('/events', articlesController);
const sessionsController = require('./controllers/session.js');
app.use('/sessions', sessionsController);

app.get('/', (req, res)=>{
	res.render('index.ejs');
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/volunteer';
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log('---------------------------------');
  console.log('Server running on port: ' + port);
  console.log('---------------------------------');
});
