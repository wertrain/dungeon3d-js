'use strict';

{
    /** 
     * ルート探索用の足跡クラス 
     * @constructor 
     */
    let Footprint = function() {
        this.start = null;
        this.depth = 0;
        this.width = 0;
        this.footprint = null;
    };
    /** 
     * 初期化
     * @param {Array.<number>} start 探索開始位置 [x, y] 
     * @param {number} maxdepth 最大深度
     */
    Footprint.prototype.initalize = function(start, maxdepth) {
        this.start = start; // [x, y]
        this.depth = maxdepth;
        this.width = maxdepth * 2 + 1;
        // 配列作成 & 0 初期化
        // NOTE: この方法は速度的にどうか調べる
        this.footprint = Array.apply(null, Array(this.width * this.width))
                              .map(function () {return 0;});
    };
    /** 
     * 探索済みの位置をマークする
     * @param {Array.<number>} pos 探索位置 [x, y] 
     * @param {number} no 設定する数値
     */
    Footprint.prototype.mark = function(pos, no) {
        // pos === [x, y]
        let x = pos[0] - this.start[0] + this.depth;
        let y = pos[1] - this.start[1] + this.depth;
        this.footprint[y * this.width + x] = no;
    };
    /** 
     * 指定された位置に移動可能か判定する
     * @param {Array.<number>} pos 探索位置 [x, y] 
     * @param {number} count 設定する数値
     * @return {boolean} 移動可能なら true
     */
    Footprint.prototype.isMove = function(pos, count) {
        let x = pos[0] - this.start[0] + this.depth;
        let y = pos[1] - this.start[1] + this.depth;
        let mark = this.footprint[y * this.width + x];
        return mark === 0 || mark === count;
    };
    /** @const */
    let DIRECTION = {
        UP: 0,
        DN: 1,
        LE: 2,
        RI: 3,
        UL: 4,
        UR: 5,
        DL: 6,
        DR: 7
    };
    /** 
     * ルート探索クラス 
     * @constructor 
     */
    let RouteFinder = function() {
        
    };

    if (typeof dungeon3d === 'undefined') {
        exports.Footprint = Footprint;
        exports.RouteFinder = RouteFinder;
    } else {
        dungeon3d.RouteFinder = RouteFinder;
    }
}
