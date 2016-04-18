'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
module.exports = router;

router.get('/', function(req, res, next) {
    Order.find({}).exec()
    .then(function(orders) {
        res.status(200).send(orders);
    })
    .catch(next);
});

router.get('/:sessionId/session', function(req, res, next) {
    Order.findOne({sessionId: req.params.sessionId}).exec()
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});

router.get('/:userId/user', function(req, res, next) {
    Order.findOne({userId: req.params.userId}).exec()
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
    Order.create(req.body)
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});