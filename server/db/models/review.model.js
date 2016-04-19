'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
});

mongoose.model('Review', schema);
