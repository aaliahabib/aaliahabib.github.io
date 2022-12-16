precision mediump float;

varying float vHeight;
varying float vWeight;
varying vec2 vUv;
varying float vTime;
varying float vFreq;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float numSquares = 10.0;

void main() 
{
  float strength = 1.0-step(0.01, abs(length(vUv-0.5)-0.25+0.1*sin(vFreq*vUv.x*30.0)));
  gl_FragColor = vec4(strength, strength, strength, 1.0);
  // gl_FragColor = vec4(strength*0.75*(1.0/vHeight), strength*0.35*(1.0/vHeight), strength*0.55, 1.0);  
} 