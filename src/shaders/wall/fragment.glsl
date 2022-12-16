#define PI 3.1415926535897932384626433832795
precision mediump float;

varying float vHeight;

void main() 
{
  gl_FragColor = vec4(0.75*(1.0/vHeight), 0.35*(1.0/vHeight), 0.55, 1);
}