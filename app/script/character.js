'use strict';

{
    /** キャラクター */
    let CharaData = function() {
        this.x = 0; // 2D マップ上のX位置
        this.y = 0; // 2D マップ上のY位置
        this.direction = 0; // 方向
        this.pose = 0; // 姿勢
        this.position = []; // 3D 上の位置
    };
    /** キャラクター管理 */
    let CharaManager = function() {
        this.map = null;
        this.camera = null;
        this.charaArray = [];
    };
    CharaManager.prototype.initalize = function(map, camera) {
        this.map = map;
        this.camera = camera;
    };
    CharaManager.prototype.putChara = function(x, y, dir) {
        let chara = new CharaData();
        chara.x = x;
        chara.y = y;
        chara.direction = dir;
        chara.pose = 0;
        chara.position = [chara.x + 0.5, 0, chara.y + 0.5];
        this.charaArray.push(chara);
        return true;
    };
    /** キャラクター描画 */
    let CharaRenderer = function() {
        this.charaManager = null;
    };
    CharaRenderer.prototype.initalize = function(charaManager, resouces) {
        this.charaManager = charaManager;
    };
    CharaRenderer.getNeedResouces = function() {
        return ['image/player_move.png'];
    };

    if (typeof dungeon3d === 'undefined') {
        exports.CharaRenderer = CharaRenderer;
        exports.CharaManager = CharaManager;
    } else {
        dungeon3d.CharaRenderer = CharaRenderer;
        dungeon3d.CharaManager = CharaManager;
    }
}
