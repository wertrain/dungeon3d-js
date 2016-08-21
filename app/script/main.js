'use strict';

{
    let sgl = new SimpleGL();
    sgl.initalize('canvas', 640, 480);
    let files = new Array();
    files[0] = dungeon3d.MapRenderer.getNeedResouces();
    sgl.loadFiles(files).then(responses => {
        let map = new dungeon3d.Map();
        let mapRenderer = new dungeon3d.MapRenderer();
        map.initalize();
        mapRenderer.initalize(map, sgl, responses[0]);
        let camera = new dungeon3d.PerspectiveCamera();
        let config = dungeon3d.PerspectiveCamera.getConfig();
        config.position = [0.0, 10.0, 0.0];
        config.target = [10, 0, 10];
        camera.initalize(config);

        let gl = sgl.getGL();
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        camera.update();
        mapRenderer.render(gl, camera.getViewMatrix(), camera.getProjectionMatrix());
        gl.flush();
    })
    .catch((e) => {
        console.log('error: ' + e);
    });
}
