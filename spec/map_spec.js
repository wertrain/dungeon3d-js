'use strict';

var exports = require('../app/script/map.js');

describe('Array2d', function() {
    beforeEach(function() {
        this.array2d = new exports.Array2d(50, 40);
        this.array2d[1][0] = 64;
    });
    it('test', function () {
        expect(this.array2d[1][0]).toBe(64);
        expect(this.array2d.getWidth()).toBe(50);
        expect(this.array2d.getHeight()).toBe(40);
    });
});

describe('Map', function() {
    beforeEach(function() {
        this.map = new exports.Map();
        this.map.initalize();
    });
    it('test', function () {
        expect(this.map.getWidth()).toBe(20);
        expect(this.map.getHeight()).toBe(20);
    });
});
