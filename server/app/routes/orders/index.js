'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Promise = require('bluebird');
module.exports = router;


router.get('/', function(req, res, next) {
    Order.find({}).populate('products').exec()
    .then(function(orders) {
        res.status(200).send(orders);
    })
    .catch(next);
});

router.put('/:id', function(req, res, next){
    Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(function(order){
        if (!order) res.sendStatus(404);
        else res.send(order);
    })
    .then(null, next)
    .catch(next);
});

router.get('/getComplete/:userId', function(req, res, next) {
    Order.find({user: req.params.userId, status: 'complete'}).populate('products.product user')
    .then(function(orders) {
        res.status(200).send(orders);
    })
    .catch(next);
});

// //*******WILL THIS STILL BE USED?**************
// router.get('/findOneOrder', function(req, res, next) {
//     Order.findOne({sessionId: req.session.id}).exec()
//     .then(function(order) {
//         res.status(200).send(order);
//     })
//     .catch(next);
// });


router.get('/getCart', function(req, res, next) {
    Order.findOne({sessionId: req.session.id, status: 'cart'})
    .populate('products.product')
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});


router.get('/getRecentComplete/:orderId', function(req, res, next){
    Order.findOne({sessionId: req.session.id, _id: req.params.orderId, status: 'complete'})
    .populate('products.product')
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});

router.get('/getAllComplete', function(req, res, next){
    Order.find({sessionId: req.session.id, status: 'complete'})
    .populate('products')
    .then(function(orders) {
        res.status(200).send(orders);
    })
    .catch(next);
});


router.put('/addToCart/:productId', function(req,res,next){
    Order.findOrCreate(req.session.id)
    .then(function(order){
        return order.addProduct(req.params.productId, req.body.quantity);
    })
    .then(function(updatedCart){
        res.send(updatedCart);
    })
    .catch(next);
});

router.put('/removeOneFromCart/:productId', function(req,res,next){
    Order.findOne({sessionId: req.session.id})
    .then(function(order){
        return order.deleteOneProduct(req.params.productId);
    })
    .then(function(updatedCart){
        res.send(updatedCart);
    })
    .catch(next);
});

router.put('/removeFromCart/:productId', function(req,res,next){
    Order.findOne({sessionId: req.session.id})
    .then(function(order){
        return order.deleteProduct(req.params.productId);
    })
    .then(function(updatedCart){
        res.send(updatedCart);
    })
    .catch(next);
});

router.get('/findOneOrderById/:orderId', function(req, res, next) {
    Order.findOne({_id: req.params.orderId}).populate('products').exec()
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});

router.put('/changeStatus/:newStatus', function(req, res, next){
    var newStatus = req.params.newStatus;
    return Order.findOne({sessionId: req.session.id}).exec()
    .then(function(order){
        var currentStatus = order.status;
        if (currentStatus === 'cart' && newStatus === 'complete') {
            return order.cartToComplete();
        }
        if (currentStatus === 'complete' && newStatus === 'cancelled') {
            return order.cancel();
        }
        else {
            return order
        }
    })
    .then(function(updatedOrder){
        res.json(updatedOrder);
    })
    .catch(next);
})
