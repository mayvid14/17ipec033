var object = require('./object');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var discussSchema = new object.mongoose.Schema({
    comment: {
        type: String
    }
    , createdOn: {
        type: Number
        , default: Date.now
    }
    , projectId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'projects'
    }
    , userId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }
    , upvote: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , downvote: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
});
module.exports = object.db.model('discussions', discussSchema);