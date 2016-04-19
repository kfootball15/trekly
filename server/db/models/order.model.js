'use strict';

var mongoose = require('mongoose');
// var _ = require('lodash');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionId: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    status: {
        type: String,
        enum:   ['cart',
                'confirmed',
                'processing',
                'cancelled',
                'complete'],
        default: 'cart'
    }
});

// virtual to get total price
schema.virtual('totalPrice').get = function() {
    // ***** NOTE: ADDED IF TO ESCAPE IF NO LONGER CART STATUS, IE CHECKED OUT
    if (this.status !== 'cart') return this.finalPrice;

    return this.populate('products').exec()
    .then(function(orderPopulatedWithArrayOfProducts) {
        var total = 0;
        orderPopulatedWithArrayOfProducts.products.forEach(function(product) {
            total += product.price;
        });
        return total;
    });
};

// method to add to order
schema.methods.addProduct = function (productId, quantity) {
    if (this.status !== 'cart') return;

    var number = quantity || 1;
    for (var i = 0; i < number; i++) {
        this.products.push(productId);
    }

    return this.save();
};

// method to remove product from order


// method to initialize cart




// // generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// // are all used for local authentication security.
// var generateSalt = function () {
//     return crypto.randomBytes(16).toString('base64');
// };

// var encryptPassword = function (plainText, salt) {
//     var hash = crypto.createHash('sha1');
//     hash.update(plainText);
//     hash.update(salt);
//     return hash.digest('hex');
// };

// schema.pre('save', function (next) {

//     if (this.isModified('password')) {
//         this.salt = this.constructor.generateSalt();
//         this.password = this.constructor.encryptPassword(this.password, this.salt);
//     }

//     next();

// });

// schema.statics.generateSalt = generateSalt;
// schema.statics.encryptPassword = encryptPassword;

// schema.method('correctPassword', function (candidatePassword) {
//     return encryptPassword(candidatePassword, this.salt) === this.password;
// });

mongoose.model('Order', schema);
