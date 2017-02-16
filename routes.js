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
    })
    .post(function(req, res) {
        var message = new Message();
        message.text = req.body.text;
        message.user = req.body.user;
        message.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Message Created successfully' });
        });
    });

router.route('/messages/:message_id')
    .get(function(req, res) {
        Message.findById(req.params.message_id, function(err, message) {
            if (err)
                res.send(err);
            res.json(message);
        });
    })
    .put(function(req, res) {
        Message.findById(req.params.message_id, function(err, message) {
            if (err)
                res.send(err);
            message.text = req.body.text;
            message.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Message successfully updated!' });
            })
        });
    })
    .delete(function(req, res) {
        Message.remove({
            _id: req.params.message_id
        }, function(err, message) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted message!' });
        });
    })

module.exports = router;

function dataDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " 
    + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}