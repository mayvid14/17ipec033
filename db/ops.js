var users = require('./userschema');
var projects = require('./projectschema');
var discuss = require('./discussschema');
var reply = require('./repliesschema');
module.exports = {
    addANewUser: function (n, email, passwd, picurl) {
        var user = new users({
            name: n
            , email: email
            , passwd: passwd
            , dp: picurl
            , projects: []
        });
        return user.save();
    }
    , getUserByEmail: function (em) {
        return users.findOne({
            email: em
        }).exec();
    }
    , addProject: function (uid, title, desc, url) {
        var project = new projects({
            title: title
            , abstract: desc
            , userId: uid
            , cool: []
            , innovative: []
            , okay: []
            , irreletaive: []
            , outofthebox: []
            , keywords: []
            , sourcecode: [url]
        });
        return project.save();
    }
    , getProjectsData: function () {
        return projects.find().populate('userId', 'dp name _id').exec();
    }
    , projectPage: function (id) {
        return projects.findOne({
            _id: id
        }).populate('userId', 'dp name _id').exec();
    }
    , discussionOfPost: function (id) {
        return discuss.find({
            projectId: id
        }).populate('userId', 'dp name _id').exec();
    }
    , addDiscussion: function (uid, com, pid) {
        var discusse = new discuss({
            comment: com
            , projectId: pid
            , userId: uid
            , upvote: []
            , downvote: []
        });
        return discusse.save();
    }
    , getUserById: function (uid) {
        return users.findOne({
            _id: uid
        }).exec();
    }
    , getProjectsByUserId: function (uid) {
        return projects.find({
            userId: uid
        }).populate('userId', 'dp name _id').exec();
    }
    , getDiscussionByUserId: function (uid) {
        return discuss.find({
            userId: uid
        }).populate('userId', 'dp name _id').exec();
    }
    , updateProfile: function (n, id) {
        return users.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                name: n
            }
        }, {
            new: true
        }).exec();
    }
    , obpost: function (uid, pid) {
        return projects.findOneAndUpdate({
            _id: pid
        }, {
            $addToSet: {
                outofthebox: uid
            }
        }, {
            new: true
        }).exec();
    }
    , opost: function (uid, pid) {
        return projects.findOneAndUpdate({
            _id: pid
        }, {
            $addToSet: {
                okay: uid
            }
        }, {
            new: true
        }).exec();
    }
    , cpost: function (uid, pid) {
        return projects.findOneAndUpdate({
            _id: pid
        }, {
            $addToSet: {
                cool: uid
            }
        }, {
            new: true
        }).exec();
    }
    , ipost: function (uid, pid) {
        return projects.findOneAndUpdate({
            _id: pid
        }, {
            $addToSet: {
                innovative: uid
            }
        }, {
            new: true
        }).exec();
    }
    , rpost: function (uid, pid) {
            return projects.findOneAndUpdate({
                _id: pid
            }, {
                $addToSet: {
                    irrelevant: uid
                }
            }, {
                new: true
            }).exec();
        }
        /*
            , adduvpostdata: function (puid, pid, uid) {
                return users.findOneAndUpdate({
                    _id: puid
                }, {
                    $addToSet: {
                        postfav: {
                            pid: pid
                            , uid: uid
                        }
                    }
                }, {
                    new: true
                }).exec();
            }
            , adddownpostdata: function (puid, pid, uid) {
                return users.findOneAndUpdate({
                    _id: puid
                }, {
                    $addToSet: {
                        postsad: {
                            pid: pid
                            , uid: uid
                        }
                    }
                }, {
                    new: true
                }).exec();
            }*/
        
    , upvotecomment: function (uid, cid) {
            return discuss.findOneAndUpdate({
                _id: cid
            }, {
                $addToSet: {
                    upvote: uid
                }
            }, {
                new: true
            }).exec();
        }
        /*, adduvcommentdata: function (cuid, cid, uid) {
            return users.findOneAndUpdate({
                _id: cuid
            }, {
                $addToSet: {
                    comfav: {
                        cid: cid
                        , uid: uid
                    }
                }
            }, {
                new: true
            }).exec();
        }*/
        
    , downvotecomment: function (uid, cid) {
            return discuss.findOneAndUpdate({
                _id: cid
            }, {
                $addToSet: {
                    downvote: uid
                }
            }, {
                new: true
            }).exec();
        }
        /*
                , adddowncommentdata: function (cuid, cid, uid) {
                    return users.findOneAndUpdate({
                        _id: cuid
                    }, {
                        $addToSet: {
                            comsad: {
                                cid: cid
                                , uid: uid
                            }
                        }
                    }, {
                        new: true
                    }).exec();
                }*/
        
    , updatePost: function (pid, title, desc, url) {
        return projects.findOneAndUpdate({
            _id: pid
        }, {
            $set: {
                title: title
                , abstract: desc
            }
            , $addToSet: {
                sourcecode: url
            }
        }, {
            new: true
        }).exec();
    }
    , updatePostNP: function (pid, title, desc) {
        return projects.findOneAndUpdate({
            _id: pid
        }, {
            $set: {
                title: title
                , abstract: desc
            }
        }, {
            new: true
        }).exec();
    }
    , updateComment: function (cid, com) {
        return discuss.findOneAndUpdate({
            _id: cid
        }, {
            $set: {
                comment: com
            }
        }, {
            new: true
        }).exec();
    }
};