import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  Group,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  CircleGeometry,
  PlaneGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  DirectionalLight,
  HemisphereLight,
  CanvasTexture,
  RepeatWrapping,
  SRGBColorSpace,
  NearestFilter,
  BasicShadowMap,
  Vector3,
} from "three";

/* Paleta do site: concreto, tinta e o vermelho do MASP */
const SKY = "#d2d2d2";
const CONCRETE = "#ecebe6";
const RED = "#ff3d00";
const INK = "#0a0a0a";
const HILL = "#2a2a2a";

/* Calçadão de Copacabana: ondas pretas e brancas */
const waveTexture = () => {
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d");
  g.fillStyle = "#f2f2f2";
  g.fillRect(0, 0, S, S);
  const bands = 4;
  const h = S / bands;
  g.fillStyle = INK;
  // faixas pretas alternadas, cada uma entre duas ondas
  for (let b = 0; b < bands; b += 2) {
    g.beginPath();
    for (let x = 0; x <= S; x += 4) {
      const y = b * h + h * 0.5 + Math.sin((x / S) * Math.PI * 2) * h * 0.38;
      x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
    }
    for (let x = S; x >= 0; x -= 4) {
      const y = (b + 1) * h + h * 0.5 + Math.sin((x / S) * Math.PI * 2) * h * 0.38;
      g.lineTo(x, y);
    }
    g.closePath();
    g.fill();
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(11, 11);
  t.anisotropy = 4;
  return t;
};

/* vidro escuro com montantes claros */
const glassTexture = () => {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 64;
  const g = c.getContext("2d");
  g.fillStyle = INK;
  g.fillRect(0, 0, 128, 64);
  g.fillStyle = "#6b6b6b";
  for (let x = 0; x < 128; x += 16) g.fillRect(x, 0, 2, 64);
  g.fillRect(0, 0, 128, 2);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(2.4, 1);
  t.magFilter = NearestFilter;
  return t;
};

const ease = (t) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const lerp = (a, b, t) => a + (b - a) * t;

/** MASP (pórticos vermelhos e caixa de vidro suspensa) sobre o piso de ondas, com o Pão de Açúcar ao fundo. */
export function createBrasilia(canvas) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = BasicShadowMap; // sombra de borda dura, no espírito brutalista

  const scene = new Scene();
  scene.background = new Color(SKY);

  const camera = new PerspectiveCamera(35, 1, 0.5, 500);

  scene.add(new HemisphereLight("#ffffff", "#9a9a9a", 1.05));
  const sun = new DirectionalLight("#ffffff", 3.2);
  sun.position.set(-22, 28, 16);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  const sc = sun.shadow.camera;
  sc.left = -48;
  sc.right = 48;
  sc.top = 48;
  sc.bottom = -48;
  sc.near = 1;
  sc.far = 120;
  sun.shadow.bias = -0.0006;
  scene.add(sun);

  const world = new Group();
  scene.add(world);

  const concrete = new MeshStandardMaterial({ color: CONCRETE, roughness: 1, flatShading: true });
  const red = new MeshStandardMaterial({ color: RED, roughness: 0.8, flatShading: true });
  const make = (geo, mat, x, y, z, shadow = true) => {
    const m = new Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = shadow;
    m.receiveShadow = true;
    world.add(m);
    return m;
  };

  /* piso de ondas */
  const ground = new Mesh(
    new PlaneGeometry(300, 300),
    new MeshStandardMaterial({ map: waveTexture(), roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  world.add(ground);

  /* vão livre sob o prédio: plataforma baixa e degraus */
  make(new BoxGeometry(46, 0.6, 16), concrete, 0, 0.3, 0);
  make(new BoxGeometry(30, 0.4, 3), concrete, 0, 0.8, 9.2);
  make(new BoxGeometry(24, 0.3, 1.6), concrete, 0, 0.55, 11.2);

  /* pórticos vermelhos: dois pilares e uma viga cada */
  [-14, 14].forEach((x) => {
    [-5.8, 5.8].forEach((z) => make(new BoxGeometry(1.5, 12, 1.5), red, x, 6.6, z));
    make(new BoxGeometry(1.9, 2.6, 13.4), red, x, 12.9, 0);
  });

  /* laje de cobertura e caixa de vidro suspensa */
  make(new BoxGeometry(38, 1.4, 11.8), concrete, 0, 13, 0);
  const glass = new MeshStandardMaterial({ map: glassTexture(), roughness: 0.4, metalness: 0.15 });
  make(new BoxGeometry(27, 5, 9.6), [concrete, concrete, concrete, concrete, glass, glass], 0, 9.5, 0);
  make(new BoxGeometry(27, 0.5, 9.8), concrete, 0, 6.9, 0);

  /* Pão de Açúcar, ao longe, e o sol */
  const hillMat = new MeshStandardMaterial({ color: HILL, roughness: 1, flatShading: true });
  const big = new Mesh(new SphereGeometry(20, 28, 14), hillMat);
  big.scale.set(1, 1.35, 0.8);
  big.position.set(-36, 0, -95);
  scene.add(big);
  const small = new Mesh(new SphereGeometry(13, 28, 14), hillMat);
  small.scale.set(1, 1.15, 0.8);
  small.position.set(-6, 0, -105);
  scene.add(small);
  const disc = new Mesh(new CircleGeometry(15, 64), new MeshBasicMaterial({ color: "#f2f2f2" }));
  disc.position.set(32, 26, -130);
  scene.add(disc);

  const look = new Vector3();
  let aspect = 1;

  return {
    setSize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      aspect = w / h;
      camera.aspect = aspect;
      // em tela larga o prédio vai para a direita, longe do nome
      if (aspect > 1.15) camera.setViewOffset(w, h, -w * 0.2, 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    },
    /** s = { time, mx, my (-1..1), intro (0..1), scroll (0..1) } */
    render(s) {
      const e = ease(s.intro);
      // distância que enquadra o prédio em qualquer proporção de tela
      const portrait = aspect < 1;
      const fit = portrait ? 108 : Math.min(200, Math.max(84, 41 / (0.315 * aspect)));
      const dist = fit * lerp(1.9, 1, e) * (1 + s.scroll * 0.35);
      const ang = (portrait ? 0.95 : 0.5) + Math.sin(s.time * 0.17) * 0.13 + s.mx * 0.14 + (1 - e) * 0.9;
      const y = lerp(3, 19, e) + s.scroll * 14 - s.my * 2;
      camera.position.set(Math.sin(ang) * dist, y, Math.cos(ang) * dist);
      // em tela larga o prédio fica à direita, longe do nome
      look.set(0, (portrait ? -3 : 6) + s.scroll * 2, 0);
      camera.lookAt(look);
      renderer.render(scene, camera);
    },
    dispose() {
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          [].concat(o.material).forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      renderer.dispose();
    },
  };
}
