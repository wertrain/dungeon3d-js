'use strict';

{
    let sgl = new SimpleGL();
    sgl.initalize('canvas', 640, 480);
    let files = new Array();
    files[0] = dungeon3d.MapRenderer.getNeedResouces();
    sgl.loadFiles(files).then(responses => {
        let map = new dungeon3d.Map();
        map.initalize();
        let mapRenderer = new dungeon3d.MapRenderer();
        mapRenderer.initalize(map, sgl, responses[0]);

        let gl = sgl.getGL();
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mapRenderer.render(gl);
        gl.flush();
    })
    .catch((e) => {
        console.log('error: ' + e);
    });
}
