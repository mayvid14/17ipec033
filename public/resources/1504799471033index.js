var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');

app.use(express.static(path.join(__dirname,'public')));
app.use('/nm',express.static(path.join(__dirname,'node_modules')));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname,'public','views','main.html'));
});

app.listen(1357,function(){
	console.log("Started at 1357");
});
