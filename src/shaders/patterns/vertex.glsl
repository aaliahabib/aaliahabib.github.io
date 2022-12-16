uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix; 

attribute vec3 position;
attribute vec2 uv;

uniform float uWeight;
uniform float uTime; 
uniform float uFreq;

varying vec2 vUv;
varying float vTime;
varying float vFreq;
varying float vHeight;
varying float vWeight;

void main() 
{
  gl_Position = projectionMatrix*viewMatrix*modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vHeight = gl_Position.z;
  vWeight = uWeight;
  vTime = uTime; 
  vFreq = uFreq;
}