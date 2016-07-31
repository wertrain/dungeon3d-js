'use strict'
{
    /** 四角形のインデックス情報 */
    let RectBlock = function() {
        this.index = [0, 0, 0, 0];
    };
    
    /** 四角形の配置管理 */
    let RectManager = function() {
        this.rect = [];
        this.rectOrder = [];
        this.vertexArray = [];
        this.wall = null;
        
        this.width = 0;
        this.height = 0;
        
        this.wallNum = 0;
        this.rectNum = 0;
        this.end_vertex = 0;
        this.section = [0, 0, 0, 0];
    };
    RectManager.prototype.initalize = function(map, width, height) {
        this.width = width;
        this.height = height;
        
        let count = 0;
        for (let z = 1; z < this.height; ++z) {
            for (let x = 0; x < this.width; ++x) {
                if (map[z-1][x] != map[z][x]) {
                    ++count;
                }
            }
        }
        for (let z = 0; z < this.height; ++z) {
            for (let x = 1; x < this.width; ++x) {
                ++count;
            }
        }
        console.log('MAP C:' + count);
    };
    
    let Map = function() {
        this.map = null;
        this.width = 0;
        this.height = 0;
    };
    Map.prototype.initalize = function() {
        this.width = 20;
        this.height = 20;
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1],
            [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1],
            [1,0,1,0,0,1,0,1,0,1,0,1,1,1,0,0,0,1,0,1],
            [1,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
            [1,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
            [1,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
            [1,0,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,1,0,1],
            [1,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1],
            [1,0,1,0,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
            [1,0,1,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1],
            [1,0,1,0,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1],
            [1,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];
        var rectManager = new RectManager();
        rectManager.initalize(this.map, this.width, this.height);
        return true;
    };
    dungeon3d.Map = Map;
}