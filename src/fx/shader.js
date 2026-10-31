import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderTarget,
} from "three";

const VERT = /* glsl */ `void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const COMMON = /* glsl */ `
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0., a = .5; for(int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.03 + 11.7; a *= .5; } return v; }
float bayer2(vec2 a){ a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
float bayer4(vec2 a){ return bayer2(.5 * a) * .25 + bayer2(a); }
`;

/* Campo de blocos: ruído deformado, quantizado em 5 cores chapadas, tempo "picotado".
   O mouse abre uma lente que desloca a paleta; a velocidade do scroll entorta o campo. */
const FIELD = /* glsl */ `
uniform vec2  uRes;
uniform vec2  uMouse;   // px do buffer, origem embaixo à esquerda
uniform float uTime;
uniform float uCell;    // lado do bloco em px do buffer
uniform float uIntro;
uniform float uLens;
uniform float uVel;
uniform vec3  uP0, uP1, uP2, uP3, uP4;

vec3 pal(float i){
  if(i < .5) return uP0;
  if(i < 1.5) return uP1;
  if(i < 2.5) return uP2;
  if(i < 3.5) return uP3;
  return uP4;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 id = floor(frag / uCell);
  vec2 p = (id + .5) * uCell / uRes.y;
  vec2 m = uMouse / uRes.y;
  float t = floor(uTime * 5.) / 5.;

  vec2 q = p * 2.4;
  q.x += uVel * .9;
  vec2 w = vec2(fbm(q + vec2(t * .22, 0.)), fbm(q + vec2(5.2, 1.3) - t * .18));
  q += (w - .5) * 1.9;

  float d = length(p - m);
  float rip = sin(d * 34. - uTime * 6.) * exp(-d * 4.5) * uLens;
  float v = fbm(q * 1.15 + rip * .9) + rip * .4;
  float lvl = floor(clamp((v - .28) * 8., 0., 4.99));

  float R = .08 + uLens * .17;
  float ring = step(abs(d - R), uCell / uRes.y * .9);
  if(d < R) lvl = mod(lvl + 2., 5.);
  vec3 col = pal(lvl);
  if(ring > .5 && uLens > .02) col = uP4;

  float rv = uIntro * 1.5 - (frag.x / uRes.x) * .5;
  if(hash12(id + 9.) > rv) col = uP2;
  gl_FragColor = vec4(col, 1.);
}
`;

const POSTER = /* glsl */ `
uniform vec2  uRes;
uniform float uSeed;

float px;
float cv(float d){ return 1. - smoothstep(-px, px, d); }
float sdBox(vec2 p, vec2 b){ vec2 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, q.y), 0.); }
float sdSeg(vec2 p, vec2 a, vec2 b){ vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h); }
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

// Cada composição devolve (tinta preta, tinta laranja) em 0..1. 1 = sólido, entre 0 e 1 = meio-tom.

// 0 · TunnelRat: túnel em perspectiva, tela que "cai" até um ponto
vec2 c0(vec2 p){
  vec2 q = p - vec2(.07, -.03);
  float m = max(abs(q.x) * .78, abs(q.y)) + .0001;
  float lv = log2(m * 4.5) * 1.7;
  float band = floor(lv), f = fract(lv);
  float odd = mod(band, 2.);
  float a = (1. - odd) * mix(1., .22, f);
  float b = odd * mix(1., .3, f);
  float core = cv(m - .018);
  return vec2(a * (1. - core), max(b, core));
}

// 1 · LeTopeiras: bolha de chat com forma de onda de voz
vec2 c1(vec2 p){
  float bub = cv(sdBox(p - vec2(-.04, .06), vec2(.4, .22)) - .1);
  bub = max(bub, cv(sdSeg(p, vec2(-.3, -.2), vec2(-.42, -.38)) - .05));
  float x = p.x + .02;
  float i = floor(x / .048);
  float cx = (i + .5) * .048;
  float h = .025 + .17 * abs(sin(i * 1.7) * .7 + sin(i * .55 + 1.) * .5);
  float bar = cv(sdBox(vec2(x - cx, p.y - .06), vec2(.013, h))) * step(abs(i + .5 - .0), 8.5);
  float bg = (1. - bub) * smoothstep(.55, -.45, p.y + p.x * .3) * .75;
  return vec2(max(bar * bub, bg), bub);
}

// 2 · Framework de RPA: grade de passos automatizados com um caminho em execução
vec2 c2(vec2 p){
  float n = 6.4;
  vec2 g = p * n + vec2(.5, .0);
  vec2 id = floor(g), l = fract(g) - .5;
  float h = hash12(id + 3.);
  float box = cv(sdBox(l, vec2(.36)) / n);
  float a = 0., b = 0.;
  if(h < .3) a = box;
  else if(h < .55) b = box;
  else if(h < .75){ a = box * (.2 + .8 * (l.y + .5)); }
  else a = cv(abs(sdBox(l, vec2(.36))) / n - .004);
  float path = step(abs(id.x - id.y - 1.), .1);
  float dot = cv(length(l) / n - .035);
  b = max(b, path * cv(sdBox(l, vec2(.36)) / n));
  a = mix(a, max(a * (1. - path), path * dot), path);
  return vec2(a, b);
}

// 3 · WaveGains: camadas de ondas sob um sol
vec2 c3(vec2 p){
  float a = smoothstep(.5, -.5, p.y) * .3;
  float b = cv(length(p - vec2(.34, .26)) - .13);
  for(int k = 0; k < 5; k++){
    float fi = 4. - float(k);
    float y = -.34 + fi * .12 + .05 * sin(p.x * (6. + fi * 1.2) + fi * 1.9 + uSeed);
    float below = 1. - smoothstep(-px, px, p.y - y);
    float val = mix(1., .28, clamp((y - p.y) / .4, 0., 1.));
    if(mod(fi, 2.) < .5){ a = mix(a, val, below); b = mix(b, 0., below); }
    else { b = mix(b, val, below); a = mix(a, 0., below); }
  }
  return vec2(a, b);
}

// 4 · Shadow Calendar: grade de dias com sombra dura, um dia em destaque
vec2 c4(vec2 p){
  float cw = .15, ch = .118;
  vec2 q = p - vec2(0., -.05);
  vec2 u = vec2(q.x / cw + 3.5, (.2 - q.y) / ch);
  vec2 id = floor(u);
  vec2 lp = (fract(u) - .5) * vec2(cw, ch);
  float inG = step(0., id.x) * step(id.x, 6.) * step(0., id.y) * step(id.y, 4.);
  vec2 hs = vec2(cw, ch) * .5 - .012;
  float face = cv(sdBox(lp, hs));
  float sh = cv(sdBox(lp - vec2(.011, -.011), hs));
  float h = hash12(id + 2.);
  float a = inG * max(sh - face, 0.);
  a = max(a, inG * face * step(.78, h) * .6);
  float today = inG * face * step(abs(id.x - 3.) + abs(id.y - 2.), .1);
  float head = cv(sdBox(q - vec2(0., .2 + ch * .5 + .05), vec2(cw * 3.5 - .012, .042)));
  a = max(a, head);
  a = max(a, cv(sdBox(q - vec2(-.25, .33), vec2(.008, .04))));
  a = max(a, cv(sdBox(q - vec2(.25, .33), vec2(.008, .04))));
  float bgb = smoothstep(.75, -.75, p.x - p.y * .7) * .5 * (1. - inG * face) * (1. - head);
  return vec2(a, max(today, bgb));
}

// 5 · React NBA: bola de basquete
vec2 c5(vec2 p){
  float R = .36;
  vec2 q = p;
  float disc = cv(length(q) - R);
  float shade = .6 + .4 * smoothstep(-R, R, -q.x * .7 - q.y * .7);
  float lines = max(cv(abs(q.x) - .007), cv(abs(q.y) - .007));
  lines = max(lines, cv(abs(length(q - vec2(-.62, 0.)) - .44) - .007));
  lines = max(lines, cv(abs(length(q - vec2(.62, 0.)) - .44) - .007));
  float ring = cv(abs(length(q) - R) - .009);
  float a = max(lines * disc, ring);
  float bg = (1. - disc) * smoothstep(-.55, .55, p.x * .6 - p.y) * .7;
  float sh = cv(length((p - vec2(.04, -.43)) * vec2(1., 3.2)) - .3) * (1. - disc);
  return vec2(max(max(a, bg), sh), disc * shade);
}

// 6 · Gallery Viewer: mosaico de imagens
vec2 c6(vec2 p){
  vec2 u = vec2(p.x * 3.6 + 2.5, p.y * 4. + 2.);
  vec2 id = floor(u), l = fract(u) - .5;
  float inG = step(0., id.x) * step(id.x, 4.) * step(0., id.y) * step(id.y, 3.);
  float box = cv(sdBox(l, vec2(.45)) * .26) * inG;
  float h = hash12(id + 7.);
  float a = 0., b = 0.;
  if(h < .22) a = box;
  else if(h < .45) b = box;
  else if(h < .65) a = box * (.1 + .9 * (l.y + .5));
  else if(h < .82) b = box * (.15 + .85 * (.5 - l.x));
  else { b = box * .45; a = box * cv(length(l) * .26 - .075); }
  return vec2(a, b);
}

// 7 · E-commerce de camisas: camiseta com sombra dura
vec2 c7(vec2 p){
  vec2 q = p - vec2(0., -.02);
  float body = sdBox(q - vec2(0., -.07), vec2(.19, .26));
  float sl = sdSeg(vec2(abs(q.x), q.y), vec2(.17, .2), vec2(.35, .05)) - .075;
  float neck = length(q - vec2(0., .26)) - .08;
  float d = max(min(body, sl), -neck);
  float shirt = cv(d);
  vec2 qs = q - vec2(.035, -.035);
  float body2 = sdBox(qs - vec2(0., -.07), vec2(.19, .26));
  float sl2 = sdSeg(vec2(abs(qs.x), qs.y), vec2(.17, .2), vec2(.35, .05)) - .075;
  float d2 = max(min(body2, sl2), -(length(qs - vec2(0., .26)) - .08));
  float shadow = cv(d2) * (1. - shirt);
  float collar = cv(abs(neck) - .009) * step(q.y, .3) * shirt;
  float stripe = shirt * step(.5, fract((q.x + q.y * .5) * 9.)) * .55 * step(abs(q.x), .19);
  float bg = (1. - shirt) * (1. - shadow) * smoothstep(-.7, .6, p.x * .5 + p.y) * .55;
  return vec2(max(max(shadow, collar), max(stripe, bg)), shirt);
}

// 8 · Jokenpo: pedra, papel e tesoura
vec2 c8(vec2 p){
  float a = 0., b = smoothstep(.9, -.5, p.x * .7 + p.y) * .45;
  vec2 q = p - vec2(-.42, -.02);
  float rock = cv(length(q) - .16);
  a = max(a, rock * (.7 + .3 * smoothstep(.12, -.12, q.x + q.y)));
  q = p - vec2(0., -.02);
  float paper = cv(sdBox(q, vec2(.12, .17)) - .012);
  float ln = cv(abs(mod(q.y + .14, .065) - .0325) - .004) * step(abs(q.y), .11) * step(abs(q.x), .08);
  b = max(b * (1. - paper), paper);
  a = max(a * (1. - paper), ln * paper);
  q = p - vec2(.42, .0);
  float s1 = cv(sdSeg(q, vec2(-.1, -.15), vec2(.1, .18)) - .02);
  float s2 = cv(sdSeg(q, vec2(.1, -.15), vec2(-.1, .18)) - .02);
  float bl = max(s1, s2);
  b = max(b * (1. - bl), bl);
  a = a * (1. - bl);
  float r1 = cv(abs(length(q - vec2(-.1, -.21)) - .055) - .011);
  float r2 = cv(abs(length(q - vec2(.1, -.21)) - .055) - .011);
  a = max(a, max(max(r1, r2), cv(length(q) - .014)));
  a = max(a, cv(abs(p.y + .31) - .006));
  return vec2(a, b);
}

// 9 · Product Management System: prateleiras de estoque
vec2 c9(vec2 p){
  float a = 0., b = 0.;
  for(int r = 0; r < 3; r++){
    float fr = float(r);
    float y0 = .17 - fr * .29;
    a = max(a, cv(sdBox(p - vec2(0., y0), vec2(.62, .008))));
    float x = -.6;
    for(int k = 0; k < 5; k++){
      float hh1 = hash12(vec2(fr, float(k)) + 5.);
      float hh2 = hash12(vec2(float(k), fr) + 11.);
      float w = .07 + .06 * hh1;
      float hgt = .07 + .07 * hh2;
      vec2 cc = vec2(x + w, y0 + .008 + hgt);
      float bx = cv(sdBox(p - cc, vec2(w, hgt)));
      float t = hash12(vec2(fr * 3. + float(k), 2.));
      if(t < .4) a = max(a, bx);
      else if(t < .72){ b = max(b, bx); a = max(a, cv(sdBox(p - cc - vec2(0., hgt * .35), vec2(w * .12, hgt * .65))) * bx); }
      else { a = max(a, bx * (.15 + .6 * clamp((cc.y + hgt - p.y) / (2. * hgt), 0., 1.))); b = max(b, bx * .35); }
      x += w * 2. + .028;
    }
  }
  return vec2(a, b);
}

// 10 · ProjectMGMT: quadro kanban com um cartão sendo arrastado
vec2 c10(vec2 p){
  float a = 0., b = 0.;
  for(int i = 0; i < 3; i++){
    float fi = float(i);
    vec2 c = vec2((fi - 1.) * .44, 0.);
    a = max(a, cv(abs(sdBox(p - c, vec2(.19, .42))) - .006));
    a = max(a, cv(sdBox(p - c - vec2(-.06, .35), vec2(.09, .012))));
    float y = .27;
    for(int k = 0; k < 3; k++){
      float hh = .045 + .05 * hash12(vec2(fi, float(k)) + 9.);
      vec2 cc = vec2(c.x, y - hh);
      float card = cv(sdBox(p - cc, vec2(.15, hh)));
      float t = hash12(vec2(fi * 7. + float(k), 4.));
      float v = t < .5 ? .92 : .3 + .25 * clamp((cc.y + hh - p.y) / (2. * hh), 0., 1.);
      if(!(i == 2 && k == 1)) a = max(a, card * v);
      y -= hh * 2. + .04;
    }
  }
  mat2 R = rot(.14);
  vec2 dq = R * (p - vec2(.16, .02));
  float shadow = cv(sdBox(R * (p - vec2(.16, .02) - vec2(.016, -.016)), vec2(.155, .075)));
  float card = cv(sdBox(dq, vec2(.155, .075)));
  a = mix(a, 1., shadow);
  a *= 1. - card;
  b = max(b * (1. - card), card);
  a = max(a, cv(sdBox(dq - vec2(-.04, .02), vec2(.09, .009))) + cv(sdBox(dq - vec2(-.07, -.03), vec2(.06, .009))));
  b = max(b, smoothstep(.8, -.6, p.x - p.y * .5) * .35 * (1. - a));
  return vec2(a, b);
}

uniform vec3 uAcc;
const vec3 PAPER = vec3(.953, .953, .933);
const vec3 INK   = vec3(.043, .043, .043);

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag - .5 * uRes) / uRes.y;
  px = 1.5 / uRes.y;
  int id = int(floor(uSeed + .5)) - 1;
  vec2 ab;
  if(id == 0) ab = c0(p);
  else if(id == 1) ab = c1(p);
  else if(id == 2) ab = c2(p);
  else if(id == 3) ab = c3(p);
  else if(id == 4) ab = c4(p);
  else if(id == 5) ab = c5(p);
  else if(id == 6) ab = c6(p);
  else if(id == 7) ab = c7(p);
  else if(id == 8) ab = c8(p);
  else if(id == 9) ab = c9(p);
  else ab = c10(p);

  // 1 bit: dither ordenado, três cores chapadas (papel, cor do projeto, preto)
  float cell = max(2., floor(uRes.x / 190.));
  float th = bayer4(floor(frag / cell)) * .9 + .05;
  vec3 col = PAPER;
  if(ab.y >= th) col = uAcc;
  if(ab.x >= th) col = INK;
  gl_FragColor = vec4(col, 1.);
}
`;

const mat = (frag, uniforms) =>
  new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: COMMON + frag,
    uniforms,
    depthTest: false,
    depthWrite: false,
  });

const makeRenderer = (canvas) => {
  try {
    const r = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    return r.getContext() ? r : null;
  } catch {
    return null;
  }
};

const quadScene = () => {
  const scene = new Scene();
  const cam = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new Mesh(new PlaneGeometry(2, 2));
  quad.frustumCulled = false;
  scene.add(quad);
  return { scene, cam, quad };
};

const hex3 = (h) => {
  const n = parseInt(h.slice(1), 16);
  return new Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

/** Campo de blocos animado num <canvas> visível. pal = 5 cores hex. */
export function createField(canvas, pal) {
  const renderer = makeRenderer(canvas);
  if (!renderer) return null;
  const { scene, cam, quad } = quadScene();
  const u = {
    uRes: { value: new Vector2(1, 1) },
    uMouse: { value: new Vector2(0, 0) },
    uTime: { value: 0 },
    uCell: { value: 20 },
    uIntro: { value: 1 },
    uLens: { value: 0 },
    uVel: { value: 0 },
  };
  pal.forEach((c, i) => (u["uP" + i] = { value: hex3(c) }));
  const material = mat(FIELD, u);
  quad.material = material;
  return {
    setSize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      u.uRes.value.copy(renderer.getDrawingBufferSize(new Vector2()));
    },
    render(s) {
      u.uMouse.value.set(s.mx, s.my);
      u.uTime.value = s.time;
      u.uCell.value = s.cell;
      u.uIntro.value = s.intro;
      u.uLens.value = s.lens;
      u.uVel.value = s.vel;
      renderer.render(scene, cam);
    },
    dispose() {
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
    },
  };
}

/** Gera os pôsteres dos projetos (canvas fora da página) → URL de imagem. */
export function createGL(canvas) {
  const renderer = makeRenderer(canvas);
  if (!renderer) return null;
  const { scene, cam, quad } = quadScene();
  return {
    async bake(seed, w, h, acc) {
      const bm = mat(POSTER, {
        uRes: { value: new Vector2(w, h) },
        uSeed: { value: seed },
        uAcc: { value: hex3(acc) },
      });
      const rt = new WebGLRenderTarget(w, h, { depthBuffer: false, stencilBuffer: false });
      quad.material = bm;
      renderer.setRenderTarget(rt);
      renderer.render(scene, cam);
      const buf = new Uint8Array(w * h * 4);
      renderer.readRenderTargetPixels(rt, 0, 0, w, h, buf);
      renderer.setRenderTarget(null);
      rt.dispose();
      bm.dispose();

      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      const img = ctx.createImageData(w, h);
      const row = w * 4;
      for (let y = 0; y < h; y++) img.data.set(buf.subarray((h - 1 - y) * row, (h - y) * row), y * row);
      ctx.putImageData(img, 0, 0);
      return new Promise((res) => c.toBlob((b) => res(URL.createObjectURL(b)), "image/png"));
    },
    dispose() {
      quad.geometry.dispose();
      renderer.dispose();
    },
  };
}
