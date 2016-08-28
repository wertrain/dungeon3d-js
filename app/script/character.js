'use strict';

{
    /** キャラクター */
    let CharaData = function() {
        this.x = 0; // 2D マップ上のX位置
        this.y = 0; // 2D マップ上のY位置
        this.direction = 0; // 方向
        this.pose = 0; // 姿勢
        this.type = 0; // キャラタイプ
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
    CharaManager.prototype.putChara = function(x, y, dir, type) {
        let chara = new CharaData();
        chara.x = x;
        chara.y = y;
        chara.direction = dir;
        chara.type = type;
        chara.pose = 0;
        chara.position = [chara.x + 0.5, 0, chara.y + 0.5];
        this.charaArray.push(chara);
        return true;
    };
    CharaManager.prototype.getCharaArray = function() {
        return this.charaArray;
    };
    /** キャラクター描画 */
    let CharaRenderer = function() {
        this.charaManager = null;
    };
    CharaRenderer.prototype.initalize = function(charaManager, sgl, resouces) {
        let gl = sgl.getGL();
        let vs = sgl.compileShader(0, resouces[0]);
        let fs = sgl.compileShader(1, resouces[1]);
        let ptex = sgl.createTexture(resouces[2]);

        this.charaManager = charaManager;
        let charaV = [[-0.5, 0.0, -0.5], [-0.5, 0.0, 0.5], [0.5, 0.0, 0.5], [0.5, 0.0, -0.5]];
        let charaUV = [[0, 0], [0, 1], [1, 1], [1, 0]];
        
        let charaArray = this.charaManager.getCharaArray();
        let vboArray = [], tboArray = [], textureIndexArray = [];
        for (let i = 0; i < charaArray.length; ++i) {
            let vertices = [], uvs = [];
            for (let i = 0; i < 4; ++i) {
                Array.prototype.push.apply(vertices, charaV[i]);
                Array.prototype.push.apply(uvs, charaUV[i]);
            }
            let vbo = sgl.createVBO(vertices);
            vboArray.push(vbo);
            let tbo = sgl.createVBO(uvs);
            tboArray.push(tbo);
            textureIndexArray.push(charaArray[i].type);
        }
    };
    CharaRenderer.getNeedResouces = function() {
        return ['shader/vertex.vs', 'shader/fragment.fs', 'image/player_move.png'];
    };

    if (typeof dungeon3d === 'undefined') {
        exports.CharaRenderer = CharaRenderer;
        exports.CharaManager = CharaManager;
    } else {
        dungeon3d.CharaRenderer = CharaRenderer;
        dungeon3d.CharaManager = CharaManager;
    }
}
