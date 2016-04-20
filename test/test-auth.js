process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');

var server = require('../src/server/app');
var testUtilities = require('./utilities');
var User = require('../src/server/models/users');

chai.use(chaiHttp);


describe('index routes', function() {

  describe('when unauthenticated', function() {

    before(function(done) {
      testUtilities.dropDatabase(done);
    });

    after(function(done) {
      testUtilities.dropDatabase(done);
    });

    describe('GET /', function() {
      it('should redirect', function(done) {
        chai.request(server)
        .get('/')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('please login!');
          done();
        });
      });
    });

    describe('GET /ping', function() {
      it('should send a reponse', function(done) {
        chai.request(server)
        .get('/ping')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.equal('pong!');
          done();
        });
      });
    });

  });

describe('when authenticated', function() {

    before(function(done) {
      testUtilities.dropDatabase(done);
    });

    after(function(done) {
      testUtilities.dropDatabase(done);
    });

    describe('GET /', function() {
      it('should not redirect', function(done) {
        chai.request(server)
        .get('/')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          done();
        });
      });
    });

    describe('GET /ping', function() {
      it('should send a reponse', function(done) {
        chai.request(server)
        .get('/ping')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.equal('pong!');
          done();
        });
      });
    });

  });

});