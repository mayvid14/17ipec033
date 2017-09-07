var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var server = require('http').Server(app);
var urlenc = bodyParser.urlencoded({
    extended: false
});
var jsonenc = bodyParser.json();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var session = require('client-sessions');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'resources'))
    }
    , filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});
var upload = multer({
    storage: storage
});
var dbfunc = require(path.join(__dirname, 'db', 'dbfunctions.js'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/nm', express.static(path.join(__dirname, 'node_modules')));
app.set('port', process.env.PORT || 1357);
app.use(session({
    cookieName: 'session'
    , secret: 'appearances are deceiving'
    , duration: 90 * 60 * 1000
    , activeDuration: 15 * 60 * 1000
, }));
app.post('/log', jsonenc, function (req, res) {
    dbfunc.getUserForLogin(req.body.em, req.body.pw, req, res, bcrypt);
});
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});
app.get('/imgup', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'imgup.html'));
});
app.post('/add', upload.single('file'), function (req, res) {
    var picurl = '../resources/' + req.file.filename;
    bcrypt.hash(req.body.passwd, saltRounds, function (err, hash) {
        dbfunc.createUser(req.body.n, req.body.email, hash, picurl, res);
    });
});
app.use(function (req, res, next) {
    if (req.session && req.session.user) {
        dbfunc.findInSession(req.session, req, res, next);
    }
    else {
        next();
    }
});

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        next();
    }
};
app.get('/', requireLogin, function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
})
app.post('/logout', function (req, res) {
    req.session.reset();
    res.redirect('/login');
});
/*-------------------------------------------------------------------------*/
app.post('/newpost', requireLogin, upload.single('file'), jsonenc, function (req, res) {
    var picurl = '';
    if (typeof req.file === 'undefined') picurl = '';
    else picurl = '../resources/' + req.file.filename;
    dbfunc.newPost(req.body.uid, req.body.title, req.body.description, picurl, res);
});
app.post('/getproject', requireLogin, function (req, res) {
    dbfunc.getProject(res);
});
app.post('/discuss', requireLogin, jsonenc, function (req, res) {
    dbfunc.discuss(req.body.uid, req.body.com, req.body.pid, res);
});
app.post('/project', requireLogin, jsonenc, function (req, res) {
    dbfunc.projectPage(req.body.id, res);
});
app.post('/profile', requireLogin, jsonenc, function (req, res) {
    dbfunc.profile(req.body.uid, res);
});
/*app.post('/profup', requireLogin, jsonenc, function (req, res) {
    dbfunc.profup(req.body.fn, req.body.ln, req.body.bio, req.body.id, res);
});
app.post('/uvpost', requireLogin, jsonenc, function (req, res) {
    dbfunc.uvpost(req.body.uid, req.body.pid, res);
});
app.post('/dvpost', requireLogin, jsonenc, function (req, res) {
    dbfunc.dvpost(req.body.uid, req.body.pid, res);
});
app.post('/uvcomment', requireLogin, jsonenc, function (req, res) {
    dbfunc.uvcomment(req.body.uid, req.body.pid, req.body.cid, res);
});
app.post('/dvcomment', requireLogin, jsonenc, function (req, res) {
    dbfunc.dvcomment(req.body.uid, req.body.pid, req.body.cid, res);
});
app.post('/updatepost', requireLogin, upload.single('file'), jsonenc, function (req, res) {
    var picurl = '';
    if (typeof req.file === 'undefined') {
        dbfunc.updatePostNP(req.body.pid, req.body.title, req.body.description, res);
    }
    else {
        picurl = '../resources/' + req.file.filename;
        dbfunc.updatePost(req.body.pid, req.body.title, req.body.description, picurl, res);
    }
});
app.post('/updatecomment', requireLogin, jsonenc, function (req, res) {
    dbfunc.upComment(req.body.cid, req.body.comment, res);
});*/
app.listen(app.get('port'), function () {
    console.log('Connected to 8080');
});