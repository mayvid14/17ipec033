var object = require('./object');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var userSchema = new object.mongoose.Schema({
    name: {
        type: String
        , required: true
    }
    , email: {
        type: String
        , required: true
        , unique: true
    }
    , passwd: {
        type: String
        , required: true
    }
    , admin: {
        type: Boolean
        , default: false
    }
    , projects: []
    , dp: {
        type: String
    }
});
module.exports = object.db.model('users', userSchema);