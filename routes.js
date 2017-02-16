var express = require('express');
var router = express.Router();
var Message = require('./models/message');

router.use(function timeLog(req, res, next) {
    console.log('Request Received: ', dataDisplayed(Date.now()));
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the REST API' });
});

router.route('/messages')
    .get(function(req, res) {
        Message.find(function(err, messages) {
            if (err)
                res.send(err);
            res.json(messages);
        });
    });

module.exports = router;

function dataDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " 
    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}