precision mediump float;

varying float vHeight;
varying float vWeight;
varying vec2 vUv;

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float numSquares = 10.0;

void main() 
{
  float move = step(0.5, vWeight);
  float numSquaresToMove = move*floor(vWeight*numSquares);
  float strength = 1.0-random(vec2(floor((vUv.x+(numSquaresToMove/numSquares)) * numSquares) / numSquares, floor(vUv.y * numSquares) / numSquares)); 
  
  gl_FragColor = vec4(strength*0.75*(1.0/vHeight), strength*0.35*(1.0/vHeight), strength*0.55, 1.0);  
} 