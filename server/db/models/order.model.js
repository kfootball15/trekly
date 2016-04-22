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
                // 'confirmed',
                // 'processing',
                'cancelled',
                'complete'
                ],
        default: 'cart'
    }
});

//get total price ARRAY of all products AT CURRENT PRICE IN DATABASE
schema.methods.getPriceArray = function(){
    console.log('in get price array function');
    return mongoose.model('Order').findById(this._id).populate('products')
    .then(function(populatedOrder) {
        return populatedOrder.products.map(function(product) {
            return product.price;
        });
    })
    .catch(function(err){
        console.error(err);
    })
}

//get total price of all products
schema.methods.getTotalPrice = function(){
    return this.getPriceArray()
    .then(function(priceArray){
        return priceArray.reduce(function(prev, curr){return prev+curr});
    })
    .catch(function(err){
        console.error(err);
    })
}

//route to change status to 'complete' calls this method
schema.methods.cartToComplete = function(){
    console.log('in cart to complete method')
    var self = this;
    return this.getPriceArray()
    .then(function(priceArray){
        self.finalPrice = priceArray;
        self.status = 'complete';
        return self.save()
    })
    .then(function(updatedOrder){
        return mongoose.model('Product').decreaseInventory(updatedOrder.products);
    })
    .then(function(updatedProducts){
        return self;
    })
    .catch(function(err){
        console.error(err);
    })
}


//route to change status to 'cancelled' calls this method
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
    .catch(function(err){
        console.error(err);
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
schema.methods.deleteOneProduct = function (productId) {
    if (this.status !== 'cart') return;
    var firstIndex = this.products.indexOf(productId);
    this.products.splice(firstIndex, 1);
    return this.save();
};


schema.methods.deleteProduct = function (productId) {
    if (this.status !== 'cart') return;
    while (this.products.indexOf(productId) > -1){
        var firstIndex = this.products.indexOf(productId);
        if (this.products.length > 1) this.products.splice(firstIndex, 1);
        else this.products = [];
    }
    return this.save();
};


mongoose.model('Order', schema);
