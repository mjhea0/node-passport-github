require('dotenv').config();

var passport = require('passport');
var GitHubStrategy = require('passport-github2');
var User = require('../models/users');


passport.use(new GitHubStrategy({
    clientID: process.env.githubClientID,
    clientSecret: process.env.githubClientSecret,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({oauthID: profile.id}, function(err, user) {
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          username: profile.username,
          oauthID: profile.id
        });
        user.save(function(err) {
          if (err) {
            done(err);
          } else {
            done(null, user);
          }
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (!err) {
      done(null, user);
    } else {
      done(err, null);
    }
  });
});

module.exports = passport;