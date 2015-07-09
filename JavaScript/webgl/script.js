/*global initShaders, initBuffers, drawScene, window, document, alert */
(function () {
    "use strict";
    function webGLStart() {
        var canvas = document.getElementById("lesson01-canvas");
        var gl = initWebGL(canvas);
        initShaders();
        initBuffers();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        drawScene();
    }
    
    var gl; // A global variable for the WebGL context

    function start() {
      var canvas = document.getElementById("glcanvas");

      gl = initWebGL(canvas);      // Initialize the GL context
  
      // Only continue if WebGL is available and working
  
      if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Set clear color to black, fully opaque
        gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
        gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Clear the color as well as the depth buffer.
      }
    }
    
    function initWebGL(canvas) {
      var gl = null;
  
      try {
        // Try to grab the standard context. If it fails, fallback to experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      }
      catch(e) {}
  
      // If we don't have a GL context, give up now
      if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
      }
  
      return gl;
    }

    window.addEventListener("load", webGLStart());
}());
