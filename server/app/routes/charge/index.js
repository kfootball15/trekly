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
  var amount = req.body.amount
  console.log("in charge route", req.body)

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
      res.redirect('/complete')
    }
  });
});

module.exports = router;
