/*jshint esversion: 6 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

User.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

User.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);
