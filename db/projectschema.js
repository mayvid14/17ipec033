var object = require('./object');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var projectSchema = new object.mongoose.Schema({
    title: {
        type: String
        , required: true
    }
    , abstract: {
        type: String
        , required: true
    }
    , createdOn: {
        type: String
        , default: Date.now
    }
    , userId: {
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }
    , cool: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , innovative: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , okay: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , irrelevant: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , outofthebox: [{
        type: mongoose.Schema.Types.ObjectId
        , ref: 'users'
    }]
    , keywords: []
    , sourcecode: []
});
module.exports = object.db.model('projects', projectSchema);