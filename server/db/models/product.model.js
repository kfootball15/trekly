'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    tags: {
        type: [String],
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        default: '/assets/images/placeholder.jpg'
    },
    inventory: {
        type: Number,
        min: 0
    },
    coordinates: {
        type: [Number]
    }
});

mongoose.model('Product', schema);
