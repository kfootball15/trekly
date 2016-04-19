'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },    
    country: {
        type: String
    },
    activities: [{
        type: String
    }],
});

mongoose.model('Product', schema);
