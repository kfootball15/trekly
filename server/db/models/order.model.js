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
        ref: 'Product',
    }],
    finalPrice: [{
        type: Number,
    }], //array of product prices 
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

//virtual to get total price ARRAY of all products AT CURRENT PRICE IN DATABASE
// schema.virtual('totalPriceArray').get = function(){
//     console.log('got into total price array virtual')
//     // if (this.status !== 'cart') return this.finalPrice;
//     return this.populate('products')
//     .then(function(orderPopulatedWithArrayOfProducts) {
//         console.log('order populated with array of products', orderPopulatedWithArrayOfProducts)
//         // return orderPopulatedWithArrayOfProducts.products.map(function(product) {
//         //     return product.price;
//         // });
//     });
// }

// // virtual to get total price of all products
// schema.virtual('totalPrice').get = function() {
//     // ***** NOTE: ADDED IF TO ESCAPE IF NO LONGER CART STATUS, IE CHECKED OUT
//     return this.totalPriceArray.reduce(function(prev, curr){return prev+curr});
// };

schema.methods.getPriceArray = function(){
    console.log('in get price array function');
    return mongoose.model('Order').findById(this._id).populate('products')
    .then(function(populatedOrder) {
        return populatedOrder.products.map(function(product) {
            return product.price;
        });
    });
}

schema.methods.getTotalPrice = function(){
    return this.getPriceArray()
    .then(function(priceArray){
        return priceArray.reduce(function(prev, curr){return prev+curr});
    })
}


schema.methods.cartToProcessing = function(){
    var self = this;
    return this.getPriceArray()
    .then(function(priceArray){
        self.finalPrice = priceArray;
        self.status = 'processing';
        return self.save()
    })
    .then(function(updatedOrder){
        return mongoose.model('Product').decreaseInventory(updatedOrder.products);
    })
    .then(function(updatedProducts){
        return self;
    })
}

schema.methods.cancel = function(){
    var self = this;
    self.status = 'cancelled';
    return self.save()
    .then(function(updatedOrder){
        return mongoose.model('Product').increaseInventory(updatedOrder.products);
    })
    .then(function(updatedProducts){
        return self;
    })
}

schema.methods.processingToComplete = function(){
    this.status = 'complete';
    return this.save()
    .then(function(updatedOrder){
        return updatedOrder;
    })
}


//find cart by sessionID or create a new card, specifying product ID, session ID, and user ID if exists
schema.statics.findOrCreate = function(sessionId, userId){
    var self = this;
    return this.findOne({sessionId: sessionId, status: 'cart'})
    .exec()
    .then(function(order){
        if (!order){
            var newOrder = new self();
            newOrder.sessionId = sessionId;
            if (userId) newOrder.userId = userId;
            return newOrder.save()
            .then(function(newOrder){
                return newOrder;
            })
        }
        else return order;
    })
    .catch(function(err){
        console.error(err);
    })
}

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
schema.methods.deleteProduct = function (productId) {
    if (this.status !== 'cart') return;

    var firstIndex = this.products.indexOf(productId);
    this.products.splice(firstIndex, 1);
    
    return this.save();
};






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
