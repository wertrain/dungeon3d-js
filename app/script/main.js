'use strict';

{
    let sgl = new SimpleGL();
    sgl.initalize('canvas', 640, 480);
    sgl.loadFiles(['shader/vertex.vs', 'shader/fragment.fs']).then(responses => {
        let gl = sgl.getGL();
        let vs = sgl.compileShader(0, responses[0]);
        let fs = sgl.compileShader(1, responses[1]);

        let map = new dungeon3d.Map();
        map.initalize();
        let mapRenderer = new dungeon3d.MapRenderer();
        mapRenderer.initalize(map, sgl, vs, fs);

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
