'use strict';

{
    let sgl = new SimpleGL();
    sgl.initalize('canvas', 640, 480);
    let files = new Array();
    files[0] = dungeon3d.MapRenderer.getNeedResouces();
    files[1] = dungeon3d.CharaRenderer.getNeedResouces();
    sgl.loadFiles(files).then(responses => {
        let map = new dungeon3d.Map();
        let mapRenderer = new dungeon3d.MapRenderer();
        map.initalize();
        mapRenderer.initalize(map, sgl, responses[0]);
        let camera = new dungeon3d.PerspectiveCamera();
        let config = dungeon3d.PerspectiveCamera.getConfig();
        config.position = [0.0, 5.0, 0.0];
        config.target = [10, 0, 10];
        camera.initalize(config);

        let charaManager = new dungeon3d.CharaManager();
        charaManager.putChara(47, 39, 0, 0);
        let charaRenderer = new dungeon3d.CharaRenderer();
        charaRenderer.initalize(charaManager, sgl, responses[1]);

        let gl = sgl.getGL();
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);

        camera.update();
        setInterval(() => {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            mapRenderer.render(gl, camera.getViewMatrix(), camera.getProjectionMatrix());
            charaRenderer.render(gl, camera.getViewMatrix(), camera.getProjectionMatrix());
            gl.flush();
        }, 32);
    })
    .catch((e) => {
        console.log('error: ' + e);
    });
}
