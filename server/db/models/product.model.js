'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
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
    categories: {
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

// Schema.statics.addToCategories = function(category, cb){
//     this.categories.push(category)
// }

mongoose.model('Product', Schema);
