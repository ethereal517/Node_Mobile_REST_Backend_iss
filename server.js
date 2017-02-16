// var http = require('http');

// var server = http.createServer(function(request, response) {
//     response.writeHead(200, {"Content-Type": "text/plain"});
//     response.end("Hello From Your Http Server\n");
// });

// server.listen(3000);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use('/', routes);

app.listen(port);
console.log('RESTAPI listening on port: ' + port);