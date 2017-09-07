var ops = require('./ops');
var Promise = require('bluebird');
module.exports = {
    createUser: function (n, email, passwd, picurl, res) {
        var p = ops.addANewUser(n, email, passwd, picurl);
        p.then(function (data) {
            res.send({
                err: 0
            });
        }, function (err) {
            throw err;
        });
    }
    , getUserForLogin: function (em, pw, req, res, bcrypt) {
        //console.log(em,pw);
        var p = ops.getUserByEmail(em);
        p.then(function (data) {
            if (!data) {
                console.log(data);
                res.send('Incorrect email');
            }
            else {
                bcrypt.compare(pw, data.passwd, function (err, resp) {
                    if (resp) {
                        req.session.user = data;
                        res.send({
                            user: data
                        });
                    }
                    else {
                        res.send('Incorrect password');
                    }
                });
            }
        }, function (err) {
            console.log(err);
            throw err;
        });
    }
    , findInSession: function (session, req, res, next) {
        ops.getUserByEmail(session.user.email).then(function (data) {
            if (data) {
                req.user = data;
                delete req.user.password; // delete the password from the session
                req.session.user = data; //refresh the session value
                res.locals.user = data;
            }
            // finishing processing the middleware and run the route
            next();
        }, function (err) {
            console.log(err);
        });
    }
    , newProject: function (uid, title, desc, url, res) {
        var p = ops.addProject(uid, title, desc, url);
        p.then(function (data) {
            res.sendStatus(200);
        }, function (err) {
            console.log(err);
            throw err;
        });
    }
    , getProject: function (res) {
        var p = ops.getProjectsData();
        p.then(function (data) {
            res.send(data);
        }, function (err) {
            console.log(err);
            throw err;
        });
    }
    , projectPage: function (id, res) {
        var a = ops.projectPage(id);
        var b = a.then(function (pdata) {
            return ops.discussionOfPost(id);
        });
        return Promise.join(a, b, function (pdata, ddata) {
            res.send({
                pdata: pdata
                , ddata: cdata
            });
        });
    }
    , discuss: function (uid, com, pid, res) {
        ops.addDiscussion(uid, com, pid).then(function (data) {
            return ops.discussionOfPost(pid);
        }, function (err) {
            console.log(err);
        }).then(function (newdata) {
            res.send(newdata);
        });
    }
    , profile: function (uid, res) {
        var a = ops.getUserById(uid);
        var b = a.then(function (udata) {
            return ops.getProjectsByUserId(uid);
        });
        var c = b.then(function (pdata) {
            return ops.getDiscussionByUserId(uid);
        });
        return Promise.join(a, b, c, function (udata, pdata, ddata) {
            res.send({
                udata: udata
                , pdata: pdata
                , ddata: ddata
            });
        });
    }
    , profup: function (n, id, res) {
            ops.updateProfile(n, id).then(function (data) {
                res.send(data);
            });
        }
        /* , uvpost: function (uid, pid, res) {
             var a = ops.upvotepost(uid, pid);
             var c = a.then(function (pdata) {
                 return ops.adduvpostdata(pdata.userId,pid, uid);
             });
             var b = c.then(function (ndata) {
                 return ops.commentsOfPost(pid);
             });
             return Promise.join(a, c, b, function (pdata, ndata, cdata) {
                 res.send({
                     pdata: pdata
                     , cdata: cdata
                 });
             });
         }
         , dvpost: function (uid, pid, res) {
             var a = ops.downvotepost(uid, pid);
             var c = a.then(function (pdata) {
                 return ops.adddownpostdata(pdata.userId,pid, uid);
             });
             var b = c.then(function (ndata) {
                 return ops.commentsOfPost(pid);
             });
             return Promise.join(a, c, b, function (pdata, ndata, cdata) {
                 res.send({
                     pdata: pdata
                     , cdata: cdata
                 });
             });
         }
         , uvcomment: function (uid, pid, cid, res) {
             var a = ops.upvotecomment(uid, cid);
             var c = a.then(function (ctdata) {
                 return ops.adduvcommentdata(ctdata.userId,cid, uid);
             });
             var b = c.then(function (ndata) {
                 return ops.commentsOfPost(pid);
             });
             return Promise.join(a, c, b, function (ctdata, ndata, cdata) {
                 res.send({
                     cdata: cdata
                 });
             });
         }
         , dvcomment: function (uid, pid, cid, res) {
             var a = ops.downvotecomment(uid, cid);
             var c = a.then(function (ctdata) {
                 return ops.adddowncommentdata(ctdata.userId,cid, uid);
             });
             var b = c.then(function (ndata) {
                 return ops.commentsOfPost(pid);
             });
             return Promise.join(a, c, b, function (ctdata, ndata, cdata) {
                 res.send({
                     cdata: cdata
                 });
             });
         }
         , updatePost: function (pid, title, desc, url, res) {
             var p = ops.updatePost(pid, title, desc, url);
             p.then(function (data) {
                 res.sendStatus(200);
             }, function (err) {
                 console.log(err);
                 throw err;
             });
         }
         , updatePostNP: function (pid, title, desc, res) {
             var p = ops.updatePostNP(pid, title, desc);
             p.then(function (data) {
                 res.sendStatus(200);
             }, function (err) {
                 console.log(err);
                 throw err;
             });
         }
         , upComment: function (cid, com, res) {
             ops.updateComment(cid, com).then(function (comdata) {
                 return ops.commentsOfPost(comdata.postId);
             }).then(function (cdata) {
                 res.send({
                     cdata: cdata
                 });
             });
         }*/
};