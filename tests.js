const request = require('supertest');
const assert = require('assert');
let server = require('./server.js');
describe('loading express', function () {
    // Attempted to make the tests 'cleaner' by closing and starting a new connection each test
    // let server;
    beforeEach(function () {
        server = require('./server.js');
    });
    afterEach(function (done) {
        server.close();
        done();
    });
    it('GET to /', function testRoot(done) {
        request(server)
            .get('/')
            .expect(200)
            .end(done);
    });
    // Expect to get a 1 for x coordinate
    it('GET to /room', function testMain(done) {
        request(server)
            .get('/room/1/0')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, result) {
                assert.equal(result.body.ords[0], 1);
                done();
            });
    });
    it('404 everything else', function testPath(done) {
        console.log('test 404');
        request(server)
            .get('/fail/whale')
            .expect(404)
            .end(done);
    });
});