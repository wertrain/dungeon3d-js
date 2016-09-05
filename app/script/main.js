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
        config.position = [0.0, 20.0, 0.0];
        config.target = [10, 0, 10];
        camera.initalize(config);
        
        let charaManager = new dungeon3d.CharaManager();
        charaManager.initalize(map, null);
        charaManager.putChara(10, 10, 0, 0);
        let charaRenderer = new dungeon3d.CharaRenderer();
        charaRenderer.initalize(charaManager, sgl, responses[1]);
        
        let cameraRotX = Math.PI * 0.3;
        let cameraRotY = 0;
        let cameraZoom = 4.0;

        $(window).on('mousewheel', function(event) {
            if (event.deltaY < 0) {
                cameraZoom += 0.25;
                if (cameraZoom > 6.0) {
                    cameraZoom = 6.0;
                }
            } else {
                cameraZoom -= 0.25;
                if (cameraZoom <= 2.5) {
                    cameraZoom = 2.5;
                }
            }
        });

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
            camera.setViewParams(cameraRotX, -cameraRotY, -cameraZoom, charaManager.getChara(0).position);
            mapRenderer.render(gl, camera.getViewMatrix(), camera.getProjectionMatrix());
            charaRenderer.render(sgl, gl, camera);
            gl.flush();
        }, 32);
    })
    .catch((e) => {
        console.log('error: ' + e);
    });
}
