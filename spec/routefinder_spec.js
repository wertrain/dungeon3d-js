'use strict';

var exports = require('../app/script/routefinder.js');

describe('Footprint', function() {
    beforeEach(function() {
        this.footprint = new exports.Footprint();
        this.footprint.initalize([0, 0], 10);
    });
    it('test', function () {
        this.footprint.mark([0, 1], 1);
        this.footprint.mark([0, 2], 1);
        this.footprint.mark([0, 3], 1);
        this.footprint.mark([1, 4], 1);
        this.footprint.mark([2, 4], 1);
        this.footprint.mark([3, 4], 1);
        this.footprint.mark([4, 4], 1);
        this.footprint.mark([5, 4], 1);

        expect(this.footprint.isMove([6, 4], 1)).toBeTruthy();
        expect(this.footprint.isMove([5, 4], 2)).toBeFalsy();
        expect(this.footprint.isMove([4, 4], 2)).toBeFalsy();
        expect(this.footprint.isMove([5, 4], 1)).toBeTruthy();
        expect(this.footprint.isMove([4, 4], 1)).toBeTruthy();
    });
});
