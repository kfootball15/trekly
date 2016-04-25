'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Promise = require('bluebird');

// var _ = require('lodash');

var productChildSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        min: 0
    },
    finalPrice: {
        type: Number
    }
});

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionId: {
        type: String
    },
    products: [productChildSchema],
    // finalPrice: [{
    //     type: Number,
    // }], //array of product prices
    status: {
        type: String,
        enum:   ['cart',
                // 'confirmed',
                // 'processing',
                'paid',
                'cancelled',
                'complete'
                ],
        default: 'cart'
    }
});

//get total price ARRAY of all products AT CURRENT PRICE IN DATABASE
schema.methods.getLiveProductPrices = function(){
    console.log('in get live product prices')
    return mongoose.model('Order').findById(this._id)
    .then(function(order) {
        console.log('order',order);
        if (!order.products) return;
        var promises = order.products.map(function(product) {
            console.log('product', product.product)
            return mongoose.model('Product').findById(product.product);
        });
        return Promise.all(promises);
    })
    .then(function(arrayOfProducts) {
        console.log('arrayOfProducts', arrayOfProducts);
        return arrayOfProducts.map(product => product.price);
    });
};

//get total final price of all products
schema.methods.getTotalFinalPrice = function(){
    return this.products
    .map(productChild => productChild.finalPrice)
    .reduce((a, b) => a + b);
};

//route to change status to 'complete' calls this method
schema.methods.cartToComplete = function(){
    var thisOrder;
    return this.getLiveProductPrices()
    .then((liveProductPrices) => {
        console.log('liveProductPrices', liveProductPrices);
        liveProductPrices.forEach((price, index) => {
            this.products[index].finalPrice = price;
        });
        this.status = 'complete';
        return this.save();
    })
    .then(function(updatedOrder){
        thisOrder = updatedOrder;
        return mongoose.model('Product')
        .changeInventory(
            updatedOrder.products.map(productChild => productChild.product),
            updatedOrder.products.map(productChild => -1 * productChild.quantity)
        );
    })
    .then(function(){
        return thisOrder;
    });
};


//route to change status to 'cancelled' calls this method
schema.methods.cancel = function(){
    var thisOrder = this;
    thisOrder.status = 'cancelled';
    return thisOrder.save()
    .then(function(updatedOrder){
        thisOrder = updatedOrder;
        return mongoose.model('Product').changeInventory(
            updatedOrder.products.map(productChild => productChild.product),
            updatedOrder.products.map(productChild => productChild.quantity)
        );
    })
    .then(function(updatedProducts){
        return thisOrder;
    });
};




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
            return newOrder.save();
        }
        else return order;
    });
};

// method to add to order
schema.methods.addProduct = function (productId, quantity) {
    if (this.status !== 'cart') return;
    var number = quantity || 1;

    // if this.products has an element with a product matching productId, then increment the quantity on that element

    console.log('productIdArray', this.products.map(productChild => productChild.product));
    console.log('productIdToFind', productId);

    var index = this.products.map(productChild => productChild.product.toString()).indexOf(productId);
    console.log(index);
    if (index !== -1) {
        this.products[index].quantity += +number;
    }
    // else push a new product child to the order's products array
    else {
        var newProductChildToAdd = {
            product: productId,
            quantity: number
        };
        this.products.push(newProductChildToAdd);
    }
    return this.save();
};


// method to remove product from order
schema.methods.deleteOneProduct = function (productId) {
    if (this.status !== 'cart') return;
    var index = this.products.map(productChild => productChild.product.toString()).indexOf(productId);
    console.log(this.products.map(productChild => productChild.product.toString()));
    console.log(productId)
    this.products[index].quantity--;
    return this.save();
};


schema.methods.deleteProduct = function (productId) {
    if (this.status !== 'cart') return;
    var index = this.products.map(productChild => productChild.product.toString()).indexOf(productId);
    this.products.splice(index, 1);
    // while (this.products.indexOf(productId) > -1){
    //     var firstIndex = this.products.indexOf(productId);
    //     if (this.products.length > 1) this.products.splice(firstIndex, 1);
    //     else this.products = [];
    // }
    return this.save();
};


mongoose.model('Order', schema);
schema.plugin(deepPopulate);

