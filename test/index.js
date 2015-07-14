/**
 * Created by xiner on 7/12/15.
 */
var assert = require("assert");
var request = require('supertest');
var app = require('../app');


describe('Course', function() {
    it('测试搜索API GET /api/search?keyword=:keyword&searchClass=:searchClass', function(done) {
        request(app)
            .get('/api/search?keyword=s&searchClass=subject')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                assert.equal(Array.isArray(res.body) && res.body.length > 0, true, 'can\'t get a non-empty array');
                done();
            });
    });
    it('查询所有课程 GET /api/course', function(done) {
        request(app)
            .get('/api/course')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                assert.equal(Array.isArray(res.body) && res.body.length > 0, true, 'can\'t get a non-empty array');
                done();
            });
    });
});

