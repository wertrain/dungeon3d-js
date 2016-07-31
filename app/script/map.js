'use strict';

{
    /** 配列拡張 */
    let Array2d = function(width, height) {
        let o = new Array(height);
        for (let i = 0; i < o.length; ++i) {
            o[i] = new Array(width);
        }
        o.getWidth = function() {
            return width;
        };
        o.getHeight = function() {
            return height;
        };
        return o;
    };
    
    /** 四角形の配置管理 */
    let RectManager = function() {
        this.rect = null;
        this.rectOrder = null;
        this.vertexArray = null;
        this.wall = null;
        
        this.width = 0;
        this.height = 0;
        
        this.wallNum = 0;
        this.rectNum = 0;
        this.endVertex = 0;
        this.section = [0, 0, 0, 0];
    };
    RectManager.prototype.initalize = function(map, width, height) {
        this.width = width;
        this.height = height;
        
        this.rect = new Array2d(this.width, this.height);
        
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
        this.wall = new Array((this.width + this.height) * 2 + count);
        this.rectOrder = new Array((this.width * this.height) + this.width);
        this.vertexArray = new Array((this.width * this.height * 4) + (this.width * 4));
    };
    RectManager.prototype.makeFloor = function(map, mulx, muly) {
        let index = 0;
        for (let z = 0; z < this.height; ++z) {
            for (let x = 0; x < this.width; ++x) {
                let y = map[z][x];
                if (y <= 0) {
                    let x1 = x;
                    let x2 = x + 1;
                    let z1 = z;
                    let z2 = z + 1;
                    let u1 = x1 * mulx;
                    let v1 = z1 * muly;
                    let u2 = x2 * mulx;
                    let v2 = z2 * muly;

                    let flag = 0;
                    if (x > 0 && map[z][x-1] == y) {
                        flag = 1;
                    }
                    if (z > 0) {
                        if (map[z-1][x] == y) {
                            flag += 2;
                        } else if (x < this.width - 1 && map[z-1][x+1] == y) {
                            flag += 4;
                        }
                    }
                    this.rect[z][x] = new Array(4);
                    switch (flag) {
                        case 0:
                            this.rect[z][x][0] = index; this.vertexArray[index++] = [x1, y, z1, 0, 1, 0, u1, v1];
                            this.rect[z][x][1] = index; this.vertexArray[index++] = [x1, y, z2, 0, 1, 0, u1, v2];
                            this.rect[z][x][2] = index; this.vertexArray[index++] = [x2, y, z2, 0, 1, 0, u2, v2];
                            this.rect[z][x][3] = index; this.vertexArray[index++] = [x2, y, z1, 0, 1, 0, u2, v1];
                            break;

                        case 1:
                            this.rect[z][x][0] = this.rect[z][x-1][3];
                            this.rect[z][x][1] = this.rect[z][x-1][2];
                            this.rect[z][x][2] = index; this.vertexArray[index++] = [x2, y, z2, 0, 1, 0, u2, v2];
                            this.rect[z][x][3] = index; this.vertexArray[index++] = [x2, y, z1, 0, 1, 0, u2, v1];
                            break;

                        case 2:
                            this.rect[z][x][0] = this.rect[z-1][x][1];
                            this.rect[z][x][1] = index; this.vertexArray[index++] = [x1, y, z2, 0, 1, 0, u1, v2];
                            this.rect[z][x][2] = index; this.vertexArray[index++] = [x2, y, z2, 0, 1, 0, u2, v2];
                            this.rect[z][x][3] = this.rect[z-1][x][2];
                            break;

                        case 3:
                            this.rect[z][x][0] = this.rect[z][x-1][3];
                            this.rect[z][x][1] = this.rect[z][x-1][2];
                            this.rect[z][x][2] = index; this.vertexArray[index++] = [x2, y, z2, 0, 1, 0, u2, v2];
                            this.rect[z][x][3] = this.rect[z-1][x][2];
                            break;

                        case 4:
                            this.rect[z][x][0] = index; this.vertexArray[index++] = [x1, y, z1, 0, 1, 0, u1, v1];
                            this.rect[z][x][1] = index; this.vertexArray[index++] = [x1, y, z2, 0, 1, 0, u1, v2];
                            this.rect[z][x][2] = index; this.vertexArray[index++] = [x2, y, z2, 0, 1, 0, u2, v2];
                            this.rect[z][x][3] = this.rect[z-1][x+1][1];
                            break;

                        case 5:
                            this.rect[z][x][0] = this.rect[z][x-1][3];
                            this.rect[z][x][1] = this.rect[z][x-1][2];
                            this.rect[z][x][2] = index; this.vertexArray[index++] = [x2, y, z2, 0, 1, 0, u2, v2];
                            this.rect[z][x][3] = this.rect[z-1][x+1][1];
                            break;
                    }
                    this.rectOrder[this.rectNum++] = this.rect[z][x];
                }
            }
        }
        this.section[0] = this.rectNum * 2;
        this.endVertex = index;
    };
    RectManager.prototype.debugPrint = function() {
        for (let z = 0; z < this.height; ++z) {
            for (let x = 0; x < this.width; ++x) {
                console.log('this.rect[' + z + '][' + x + ']: ' + this.rect[z][x]);
            }
        }
        console.log('this.rectOrder: ' + this.rectOrder.length);
        console.log('this.section[0]: ' + this.section[0]);
        console.log('this.endVertex: ' + this.endVertex);
    }
    
    /** マップ */
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
        rectManager.makeFloor(this.map, 10, 10);
        rectManager.debugPrint();
        return true;
    };
    Map.prototype.getWidth = function() {
        return this.width;
    };
    Map.prototype.getHeight = function() {
        return this.height;
    }
    if (typeof dungeon3d === 'undefined') {
        exports.Map = Map;
        exports.Array2d = Array2d;
    } else {
        dungeon3d.Map = Map;
    }
}
