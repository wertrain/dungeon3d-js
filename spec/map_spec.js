'use strict';

var exports = require('../app/script/map.js');

describe('test case name', function() {
    beforeEach(function() {
        this.map = new exports.Map();
        this.map.initalize();
    });
    it('test', function () {
        expect(this.map.getWidth()).toBe(20);
        expect(this.map.getHeight()).toBe(20);
    });
});
