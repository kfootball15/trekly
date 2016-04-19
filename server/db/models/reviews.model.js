'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema

var schema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    },
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    product: {
      type: Schema.Types.ObjectId, 
      ref: 'Product'
    }
});

mongoose.model('Reviews', schema);