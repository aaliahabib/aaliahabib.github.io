uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix; 

// For 27
uniform vec2 uFrequency;
uniform float uTime;
uniform float uNoiseWeightLow;
uniform float uNoiseWeightHigh;

attribute vec3 position;
attribute vec2 uv;
attribute float aRandom;

varying float vRandom;
varying float vHeight;

void main() 
{
  // for 27
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * uFrequency.x+uTime) * 0.05;
  modelPosition.z += sin(modelPosition.y * uFrequency.y+uTime) * 0.05;
  modelPosition.z += aRandom*(uNoiseWeightHigh*(1.0-uv.x));
  modelPosition.z += aRandom*(uNoiseWeightLow*uv.x);

  vRandom = aRandom;
  
  gl_Position = projectionMatrix*viewMatrix*modelPosition;
  vHeight = gl_Position.z;
}