const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

// const authorsController = require('./controllers/authors.js');
// app.use('/authors', authorsController);
// const articlesController = require('./controllers/articles.js');
// app.use('/articles', articlesController);
//
app.get('/', (req, res)=>{
  res.send('Hello for the Root Route!!')
	// res.render('index.ejs');
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vounteer';

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
