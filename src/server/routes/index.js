var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/users');


router.get('/', ensureAuthenticated, function(req, res, next) {
  res.json({
    user: req.user
  });
});

router.get('/ping', function(req, res, next) {
  res.send('pong!');
});

router.get('/user', ensureAuthenticated, function(req, res, next) {
  User.findById(req.user._id)
  .then(function(user){
    res.json({
      user: user
    });
  })
  .catch(function(err){
    next(err);
  });
});


// *** Helper Functions *** //

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({
      error: 'please login!'
    });
  }
}


module.exports = router;