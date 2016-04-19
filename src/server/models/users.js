var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
  username: {
    type: String,
    required: true
  },
  oauthID: {
    type: String,
    required: true
  },
});


module.exports = mongoose.model('users', User);