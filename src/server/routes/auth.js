var express = require('express');
var router = express.Router();

var githubAuth = require('../auth/github');


router.get('/github',
  githubAuth.authenticate('github')
);

router.get('/github-callback',
githubAuth.authenticate('github', { failureRedirect: '/'}),
function(req, res, next) {
  res.redirect('/');
});

router.get('/logout', ensureAuthenticated, function(req, res, next) {
  req.logout();
  res.redirect('/');
});


// *** Helper Functions *** //

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}


module.exports = router;