var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  name: {
    name: [{firstname: String, lastname: String}],
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    default: Date.now
  },
  gender: String,
  emailAddress: {
    type: String,
    unique: true,
    required: true,
    email: String
  },
  address: {
    address: [{address1: String,
    address2: String}],
    type: String
  },
  city: String,
  state: String,
  zipCode: Number,
  telephoneNum: Number,
  cpNum: Number,
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
