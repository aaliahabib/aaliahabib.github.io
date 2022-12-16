uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix; 

attribute vec3 position;
attribute vec2 uv;

uniform float uWeight;

varying float vWeight;
varying vec2 vUv;
varying float vHeight;

void main() 
{
  gl_Position = projectionMatrix*viewMatrix*modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vHeight = gl_Position.z;
  vWeight = uWeight;
}