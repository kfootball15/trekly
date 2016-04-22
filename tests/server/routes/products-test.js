// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Products Route', function() {

    beforeEach('Establish DB connection', function(done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function(done) {
        clearDB(done);
    });

    describe('Creating a product', function() {

        var clientA = supertest.agent(app);

        it('POST one', function(done) {
            clientA
                .post('/api/product')
                .send({
                    title: 'Package Paradise',
                    price: 1000000
                })
                .expect(201)
                .end(function(err, res) {
                    if (err) return done(err);
                    expect(res.body.title).to.equal('Package Paradise');
                    expect(res.body._id).to.exist;
                    Product.findById(res.body._id, function(err, b) {
                        if (err) return done(err);
                        expect(b).to.not.be.null;
                        done();
                    });
                });
        });

    });

});
