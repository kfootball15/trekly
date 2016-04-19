'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Reviews = mongoose.model('Reviews');
module.exports = router;


router.get('/product/:productId', function(req, res, next){
    Reviews.find({product: req.params.productId})
    .populate('user')
    .then(function(reviews){
        if (!reviews) res.sendStatus(404);
        res.json(reviews);
    })
    .then(null, next)
});

router.get('/user/:userId', function(req, res, next){
    Reviews.find({user: req.params.userId})
    .populate('product')
    .then(function(reviews){
        if (!reviews) res.sendStatus(404);
        else res.json(reviews);
    })
    .then(null, next);
});

router.post('/', function(req, res, next){
    Reviews.create(req.body)
    .then(function(review){
        res.status(201).send(review);
    })
    .then(null, next);
});



router.delete('/:reviewId', function(req, res, next) {

    Reviews.remove({_id: req.params.reviewId})
    .then(function(reviews) {
        if (reviews.result.n === 0) res.sendStatus(404);
        else res.sendStatus(204);
    })
    .then(null, next);

});


//Get Reviews by Product ID
//Get Reviews by User ID
//POST Reviews
//
