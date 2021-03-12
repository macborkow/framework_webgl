import { useEffect } from "react";
import webglUtils from "../utils/webgl-utils.js";

const Framework = () => {
  const createShader = (gl, type, source) => {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  };

  const createProgram = (gl, vertexShader, fragmentShader) => {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  };

  useEffect(() => {
    let canvas = document.querySelector("#c");
    let gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("no gl2 for you");
    var vertexShaderSource = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;

    var fragmentShaderSource = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`;
    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    let program = createProgram(gl, vertexShader, fragmentShader);

    let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation);
    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.CLEAR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    let primitiveType = gl.TRIANGLES;
    offset = 0;
    let count = 3;
    gl.drawArrays(primitiveType, offset, count);


  });

  return <canvas id="c" height="480" width="640" ></canvas>;
};

export default Framework;
