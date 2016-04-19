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
var Review = mongoose.model('Review');

var wipeCollections = function () {
    var models = [User, Order, Product, Review];

    return Promise.map(models, function(model) {
        return model.remove({}).exec();
    });
};

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
        sessionId: '1234567',
        status: 'cart',
        products: []
    },
    {
        sessionId: '1234567',
        status: 'confirmed',
        products: []
    },
    {
        sessionId: '1234567',
        status: 'processing',
        products: []
    },
    {
        sessionId: '1234567',
        status: 'cancelled',
        products: []
    },
    {
        sessionId: '1234567',
        status: 'complete',
        products: []
    }
];

var productSeed = [
    {
        name: 'Package 1',
        description: 'The number one holiday',
        price: 5000,
        quantity: 5,
        country: 'United Kingdom',
        activities: ['Big Ben', 'London Eye', 'Meet the Queen']
    },
    {
        name: 'Package 2',
        description: 'The number two holiday',
        price: 3000,
        quantity: 5,
        country: 'France',
        activities: ['Eiffel Tower', 'Arc de Triomphe', 'Champs Elysee', 'Louvre']
    },
    {
        name: 'Package 3',
        description: 'The number three holiday',
        price: 4000,
        quantity: 5,
        country: 'China',
        activities: ['Pandas', 'Ice City', 'Shaolin Temple']
    },
    {
        name: 'Package 4',
        description: 'The number four holiday',
        price: 2000,
        quantity: 5,
        country: 'South Africa',
        activities: ['Safari']
    },
    {
        name: 'Package 5',
        description: 'The number five holiday',
        price: 10000,
        quantity: 5,
        country: 'Bahamas',
        activities: ['Beach', 'Scuba diving', 'Jet ski']
    },
    {
        name: 'Package 6',
        description: 'The number six holiday',
        price: 15000,
        quantity: 5,
        country: 'Egypt',
        activities: ['Pyramids', 'The Nile', 'Sphinx']
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
