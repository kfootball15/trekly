'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');
module.exports = router;

router.get('/', function(req, res, next) {
    Order.find({}).populate('products').exec()
    .then(function(orders) {
        res.status(200).send(orders);
    })
    .catch(next);
});

//Update a Single Order
router.put('/:id', function(req, res, next){
    console.log(req.params.id)
    console.log(req.body)
    Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(function(order){
        if (!order) res.sendStatus(404)
        else res.send(order)
    })
    .then(null, next)
})

router.put('/addToCart', function(req,res,next){
    Order.findOrCreate(req.session.id)
    .then(function(order){
        return order.addProduct(req.body.productId, req.body.quantity)
    })
    .then(function(updatedCart){
        res.send(updatedCart);
    })
})

router.put('/removeFromCart', function(req,res,next){
    Order.findOne({sessionId: req.session.id})
    .then(function(order){
        return order.deleteProduct(req.body.productId)
    })
    .then(function(updatedCart){
        res.send(updatedCart);
    })
})

router.get('/findOneOrder', function(req, res, next) {
    Order.findOne({sessionId: req.session.id}).exec()
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});

router.get('/findOneOrderById/:orderId', function(req, res, next) {
    console.log("BACK-END:", req.params.orderId)
    Order.findOne({_id: req.params.orderId}).populate('products').exec()
    .then(function(order) {
        res.status(200).send(order);
    })
    .catch(next);
});

router.put('/:newStatus', function(req, res, next){
    var newStatus = req.params.newStatus;
    return Order.findOne({sessionId: req.session.id}).exec()
    .then(function(order){
        var currentStatus = order.status;
        if (currentStatus === 'cart' && newStatus === 'processing') {
            return order.cartToProcessing();
        }
        else if (currentStatus === 'processing' && newStatus === 'cancelled') {
            return order.cancel();
        }
        else if (currentStatus === 'processing' && newStatus === 'complete') {
            return order.processingToComplete();
        }
        if (currentStatus === 'complete' && newStatus === 'cancelled') {
            return order.cancel();
        }
        else return order
    })
    .then(function(updatedOrder){
        res.send(updatedOrder);
    })
})

// router.get('/checkout')
// //get checkout info

