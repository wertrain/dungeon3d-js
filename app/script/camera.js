'use strict';

{
    /** カメラ管理 */
    let Camera = function() {
        
    };
    Camera.prototype.initalize = function() {

    };

    if (typeof dungeon3d === 'undefined') {
        exports.Camera = Camera;
    } else {
        dungeon3d.Camera = Camera;
    }
}
