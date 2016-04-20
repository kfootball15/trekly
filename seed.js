/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');
var Review = mongoose.model('Reviews');



var userSeed = [
    {
        email: 'admin@me.com',
        password: '123',
        isAdmin: true
    },
    {
        email: 'me@me.com',
        password: '123',
        isAdmin: false
    },
    {
        email: 'me1@me.com',
        password: '123',
        isAdmin: false
    }
];

var orderSeed = [
    {
        sessionId: '111',
        status: 'cart',
        products: []
    },
    {
        sessionId: '222',
        status: 'cart',
        products: []
    },
    {
        sessionId: '333',
        status: 'processing',
        products: []
    },
    {
        sessionId: '444',
        status: 'cart',
        products: []
    },
    {
        sessionId: '555',
        status: 'complete',
        products: []
    }
];

var productSeed = [
    {
        title: 'Package 1',
        description: 'The number one holiday',
        location: 'United Kingdom',
        categories: ['Big Ben', 'London Eye', 'Meet the Queen'],
        price: 5000,
        inventory: 5,
    },
    {
        title: 'Package 2',
        description: 'The number two holiday',
        location: 'France',
        categories: ['Eiffel Tower', 'Arc de Triomphe', 'Champs Elysee', 'Louvre'],
        price: 3000,
        inventory: 5,
    },
    {
        title: 'Package 3',
        description: 'The number three holiday',
        location: 'China',
        categories: ['Pandas', 'Ice City', 'Shaolin Temple'],
        price: 4000,
        inventory: 5,
    },
    {
        title: 'Package 4',
        description: 'The number four holiday',
        location: 'South Africa',
        categories: ['Safari'],
        price: 2000,
        inventory: 5,
    },
    {
        title: 'Package 5',
        description: 'The number five holiday',
        location: 'Bahamas',
        categories: ['Beach', 'Scuba diving', 'Jet ski'],
        price: 10000,
        inventory: 5,
    },
    {
        title: 'Package 6',
        description: 'The number six holiday',
        location: 'Egypt',
        categories: ['Pyramids', 'The Nile', 'Sphinx'],
        price: 15000,
        inventory: 5,
    }
];

var reviewSeed = [
    {
        rating: 5,
        comment: 'This is a great package'
    },
    {
        rating: 4,
        comment: 'I really enjoyed this package'
    },
    {
        rating: 3,
        comment: 'Totally amazing'
    }
];

var wipeCollections = function () {
    var models = [User, Order, Product, Review];

    return Promise.map(models, function(model) {
        return model.remove({}).exec();
    });
};

var seedDB = function() {
    var randomizeSelector = function(array) {
      var random = Math.floor(Math.random() * array.length);
      var randomSelection = array[random];
      return randomSelection;
    };

    var productsList;
    var usersList;

    return Product.create(productSeed)
    .then(function(products) {
        productsList = products;
        return User.create(userSeed);
    })
    .then(function(users){
        usersList = users;
        return Promise.map(orderSeed, function(order) {
            order.user = randomizeSelector(users);
            order.products.push(randomizeSelector(productsList));
            order.products.push(randomizeSelector(productsList));
            return Order.create(order);
        });
    })
    .then(function(orders) {
        return Promise.map(reviewSeed, function(review) {
            review.user = randomizeSelector(usersList);
            review.product = randomizeSelector(productsList);
            return Review.create(review);
        });
    });
};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedDB();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
