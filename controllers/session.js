const express = require('express');
const router = express.Router();
const User   = require('../models/user');
const bcrypt = require('bcrypt');


router.get('/login', (req, res, next) => {
  res.render('users/login.ejs', {message: req.session.message})
});

//get the user id/pw as session params
router.post('/login', (req, res, next) => {

  User.findOne({username: req.body.username}, (err, user) => {

      if(user){
                     //now compare hash with the password from the form
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message  = '';
                req.session.username = req.body.username;
                req.session.logged   = true;
                console.log(req.session, req.body)

                res.redirect('/volunteers')
            } else {
              console.log('else in bcrypt compare')
              req.session.message = 'Username or password are incorrect or not a registered Username.';
              res.redirect('/sessions/login')

            }

      } else {

          req.session.message = 'Username or password are incorrect or not a registered Username.';
          res.redirect('/sessions/login')

      } //end of if user
  });

})

router.get('/register', (req, res, next) => {
  res.render('users/register.ejs', {})
})

router.post('/registration', (req, res) => {
  const password = req.body.password;
  const passWordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passWordHash;

  User.create(userDbEntry, (err, user) => {
    console.log(user);
    req.session.username = user.username;
    req.session.logged   = true;
    req.session.message = '';
    res.redirect('/events');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      //do something
    } else {
      res.redirect('/');
    }
  });
});

// export the controller
module.exports = router;
