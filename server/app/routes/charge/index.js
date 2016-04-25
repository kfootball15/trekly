'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var stripe = require("stripe")(
  "sk_test_j9izz0pjlArqO0FALGyuOqwt"
);

router.post('/', function(req, res,next) {
 console.log('in post to cart', req.body)
  var stripeToken = req.body.stripeToken;
//CHANGE THIS TO ACTUAL CHARGE AMOUNT
  var amount = 999

  // ensure amount === actual product amount to avoid fraud

  stripe.charges.create({
    card: stripeToken,
    currency: 'usd',
    amount: amount
  },
  function(err, charge) {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      res.send('success');
    }
  });
});

module.exports = router;
