'use strict';

{
    /** カメラ */
    let Camera = function() {
        this.position = [];
        this.target = [];
        this.up = [];
        this.near = 0;
        this.far = 0;
    };
    /** 透視投影カメラ */
    let PerspectiveCamera = function() {
        this.fovy = 0;
        this.aspect = 0;
        this.view = null;
        this.projection = null;
    };
    PerspectiveCamera.getConfig = function() {
        return {
            position: [0.0, 0.0, 0.0],
            target: [0, 0, 0],
            up: [0, 1, 0],
            near: 0.001,
            far: 1000,
            fovy: 45.0,
            aspect: 640 / 480
        };
    };
    Object.setPrototypeOf(PerspectiveCamera.prototype, Camera.prototype);
    PerspectiveCamera.prototype.initalize = function(config) {
        this.position = config.position;
        this.target = config.target;
        this.up = config.up;
        this.near = config.near;
        this.far = config.far;
        this.fovy = config.fovy;
        this.aspect = config.aspect;
    };
    PerspectiveCamera.prototype.update = function() {
        var m = new matIV();
        this.view = m.identity(m.create());
        this.projection = m.identity(m.create());
        m.lookAt(this.position, this.target, this.up, this.view);
        m.perspective(this.fovy, this.aspect, this.near, this.far, this.projection);
    };
    PerspectiveCamera.prototype.getViewMatrix = function() {
        return this.view;
    };
    PerspectiveCamera.prototype.getProjectionMatrix = function() {
        return this.projection;
    };

    if (typeof dungeon3d === 'undefined') {
        exports.PerspectiveCamera = PerspectiveCamera;
    } else {
        dungeon3d.PerspectiveCamera = PerspectiveCamera;
    }
}
