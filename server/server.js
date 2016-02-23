var http = require("http");
var fs = require('fs');
var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('client'));

app.listen(app.get('port'), function(){
	console.log('Node app is running on port', app.get('port'));
});