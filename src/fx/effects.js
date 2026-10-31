import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, Flip);

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => r()));

/* cor dos pôsteres: o laranja único do site */
const ACCENTS = ["#ff3d00"];

/* campos WebGL visíveis: [seletor, paleta de 5 cores, tamanho do bloco em px css] */
const FIELDS = [
  { sel: ".contact-gl", pal: ["#f2f2f2", "#ff3d00", "#0a0a0a", "#2a2a2a", "#8c8c8c"], cell: 26 },
];

/** Divide em palavras (preserva <mark>). mask=true cria máscara para revelar subindo. */
function splitWords(el, mask = false) {
  const out = [];
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const w = document.createElement("span");
          if (mask) {
            w.className = "mw";
            const i = document.createElement("span");
            i.className = "wi";
            i.textContent = part;
            w.appendChild(i);
            out.push(i);
          } else {
            w.className = "w";
            w.textContent = part;
            out.push(w);
          }
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
    });
  };
  el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
  walk(el);
  return out;
}

/** Cada letra num span (para o carimbo de entrada e o tremor perto do mouse). */
function splitChars(el) {
  const out = [];
  [...el.children].forEach((word) => {
    const txt = word.textContent;
    word.textContent = "";
    [...txt].forEach((c) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = c;
      word.appendChild(s);
      out.push(s);
    });
  });
  return out;
}

export function initFx() {
  const html = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const cleanups = [];
  const on = (t, e, f, o) => {
    t.addEventListener(e, f, o);
    cleanups.push(() => t.removeEventListener(e, f, o));
  };
  html.classList.add("is-loading");

  const st = {
    ready: false,
    intro: 0,
    px: innerWidth / 2,
    py: innerHeight / 2,
    pvx: 0,
    vel: 0,
    docH: 1,
    navHidden: false,
  };

  /* ------------------------------------------------------------ Lenis */
  let lenis = null;
  if (!reduce) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    scrollTo(0, 0);
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.stop();
  }

  /* ------------------------------------------------------------ WebGL: pôsteres + campos */
  const bakeCanvas = document.createElement("canvas"); // só gera os pôsteres, não fica na página
  let bake = null;
  const hero3d = { el: $(".hero-3d"), gl: null, vis: true, mx: 0, my: 0 }; // cena 3D de Brasília
  let fields = []; // { gl, el, vis, mx, my, lens }

  const io = new IntersectionObserver((es) =>
    es.forEach((e) => {
      const m = marquees.find((m) => m.el === e.target);
      if (m) m.vis = e.isIntersecting;
      if (e.target === table) tableVis = e.isIntersecting;
      const f = fields.find((f) => f.el === e.target);
      if (f) f.vis = e.isIntersecting;
    })
  );
  cleanups.push(() => io.disconnect());

  const sizeFields = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    if (hero3d.gl && hero3d.el) {
      const r = hero3d.el.getBoundingClientRect();
      hero3d.gl.setSize(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)), dpr);
    }
    fields.forEach((f) => {
      const r = f.el.getBoundingClientRect();
      f.dpr = dpr;
      f.gl.setSize(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)), dpr);
    });
  };

  const measure = () => {
    st.docH = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    marquees.forEach((m) => (m.w = m.set.offsetWidth || 1));
  };

  /* ------------------------------------------------------------ Marquee */
  const marquees = $$(".marquee").map((el) => {
    const inner = el.firstElementChild;
    return { el, inner, set: inner.firstElementChild, x: 0, w: 1, vis: false, dir: parseFloat(el.dataset.dir || 1) };
  });
  marquees.forEach((m) => io.observe(m.el));

  /* ------------------------------------------------------------ Tabela de tecnologias (dock) */
  const table = $(".ptable");
  let tableVis = false;
  const tiles = $$(".tile").map((el) => ({ el, s: 1 }));
  if (table) io.observe(table);

  /* ------------------------------------------------------------ Ponteiro / cursor */
  on(window, "pointermove", (e) => {
    st.pvx += Math.abs(e.clientX - st.px) + Math.abs(e.clientY - st.py);
    st.px = e.clientX;
    st.py = e.clientY;
  });
  const cursor = $(".cursor");
  const clabel = $(".cursor-label");
  const cur = { x: innerWidth / 2, y: innerHeight / 2 };
  if (fine && cursor) {
    html.classList.add("has-cursor");
    on(document, "pointerover", (e) => {
      const lab = e.target.closest("[data-cursor]");
      const link = e.target.closest("a,button");
      cursor.classList.toggle("has-label", !!lab);
      cursor.classList.toggle("is-link", !!link && !lab);
      clabel.textContent = lab ? lab.dataset.cursor : "";
    });
    on(document, "pointerdown", () => cursor.classList.add("is-down"));
    on(document, "pointerup", () => cursor.classList.remove("is-down"));
  }

  /* ------------------------------------------------------------ Hero: letras e títulos */
  const heroTitle = $(".hero-title");
  const chars = heroTitle ? splitChars(heroTitle) : [];
  const charState = chars.map(() => ({ k: 0, rot: 0 }));
  let charsLive = false; // depois da entrada, o tremor perto do mouse assume o transform
  const titles = $$(".sec-head .title");
  const setSkew = titles.map((t) => gsap.quickSetter(t, "skewX", "deg"));

  /* ------------------------------------------------------------ Loop */
  const navEl = $(".nav");
  const pctEl = $(".pct");
  let lastSy = 0;
  let lastT = 0;
  const frame = (time) => {
    if (lenis) lenis.raf(time * 1000);
    const dt = Math.min(0.1, time - lastT || 0.016);
    lastT = time;
    const sy = scrollY;
    const rawV = lenis ? lenis.velocity : sy - lastSy;
    lastSy = sy;
    st.vel = lerp(st.vel, clamp(rawV / 60, -1, 1), 0.12);
    const speed = clamp(st.pvx / 120, 0, 1); // quanto o mouse andou neste quadro
    st.pvx = 0;

    if (pctEl) pctEl.textContent = `${Math.round(clamp(sy / st.docH) * 100)}%`;

    // nav some ao descer, volta ao subir
    if (st.ready && navEl) {
      if (!st.navHidden && sy > 260 && rawV > 2) {
        st.navHidden = true;
        gsap.to(navEl, { yPercent: -101, duration: 0.35, ease: "power3.out", overwrite: true });
      } else if (st.navHidden && (rawV < -2 || sy < 120)) {
        st.navHidden = false;
        gsap.to(navEl, { yPercent: 0, duration: 0.35, ease: "power3.out", overwrite: true });
      }
    }

    // cursor
    if (fine && cursor) {
      cur.x = lerp(cur.x, st.px, 0.35);
      cur.y = lerp(cur.y, st.py, 0.35);
      cursor.style.transform = `translate3d(${cur.x}px,${cur.y}px,0)`;
    }

    // títulos entortam com a velocidade do scroll
    if (!reduce) setSkew.forEach((s) => s(-st.vel * 9));

    // cena 3D do hero: só renderiza enquanto o hero aparece
    if (hero3d.gl && sy < innerHeight * 1.15) {
      hero3d.mx = lerp(hero3d.mx, (st.px / innerWidth) * 2 - 1, 0.06);
      hero3d.my = lerp(hero3d.my, (st.py / innerHeight) * 2 - 1, 0.06);
      hero3d.gl.render({
        time: reduce ? 0 : time,
        mx: fine ? hero3d.mx : 0,
        my: fine ? hero3d.my : 0,
        intro: st.intro,
        scroll: clamp(sy / innerHeight),
      });
    }

    // campos WebGL
    fields.forEach((f) => {
      if (!f.vis) return;
      const r = f.el.getBoundingClientRect();
      const tx = (st.px - r.left) * f.dpr;
      const ty = (r.height - (st.py - r.top)) * f.dpr;
      f.mx = lerp(f.mx ?? tx, tx, 0.18);
      f.my = lerp(f.my ?? ty, ty, 0.18);
      f.lens = lerp(f.lens, fine ? clamp(0.18 + speed * 1.4, 0, 1) : 0.35, 0.08);
      f.gl.render({
        mx: f.mx,
        my: f.my,
        time: reduce ? 0 : time,
        cell: f.cell * f.dpr,
        intro: f.intro(),
        lens: f.lens,
        vel: st.vel,
      });
    });

    // letras do nome: pulam para longe do mouse
    if (charsLive && fine && !reduce && sy < innerHeight) {
      chars.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const dx = r.left + r.width / 2 - st.px;
        const dy = r.top + r.height / 2 - st.py;
        const k = Math.exp(-Math.pow(Math.hypot(dx, dy) / 230, 2));
        const s = charState[i];
        s.k = lerp(s.k, k, 0.2);
        s.rot = lerp(s.rot, Math.sign(dx || 1) * k * 14, 0.2);
        c.style.transform = `translate3d(0,${(-s.k * 0.16).toFixed(3)}em,0) rotate(${s.rot.toFixed(2)}deg)`;
      });
    }

    // faixas: aceleram com o scroll e invertem de sentido
    marquees.forEach((m) => {
      if (!m.vis || reduce) return;
      const dir = (st.vel < -0.02 ? 1 : -1) * m.dir;
      m.x += dir * (1.4 + Math.abs(st.vel) * 18) * dt * 60;
      if (m.x <= -m.w) m.x += m.w;
      if (m.x >= 0) m.x -= m.w;
      m.inner.style.transform = `translate3d(${m.x}px,0,0)`;
    });

    // tabela: efeito dock
    if (tableVis && fine && !reduce) {
      const rects = tiles.map((t) => t.el.getBoundingClientRect());
      tiles.forEach((t, i) => {
        const r = rects[i];
        const d = Math.hypot(st.px - (r.left + r.width / 2), st.py - (r.top + r.height / 2));
        const target = 1 + 0.38 * Math.exp(-Math.pow(d / 140, 2));
        t.s = lerp(t.s, target, 0.2);
        t.el.style.transform = `scale(${t.s.toFixed(3)})`;
        t.el.style.zIndex = t.s > 1.06 ? 5 : 1;
      });
    }
  };
  gsap.ticker.add(frame);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => gsap.ticker.remove(frame));

  let rt;
  on(window, "resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      sizeFields();
      measure();
      ScrollTrigger.refresh();
    }, 150);
  });

  /* ------------------------------------------------------------ Menu (mobile) */
  const menuBtn = $(".menu-btn");
  const setMenu = (open) => {
    html.classList.toggle("menu-open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.textContent = open ? menuBtn.dataset.close : menuBtn.dataset.open;
    }
    if (lenis && st.ready) open ? lenis.stop() : lenis.start();
  };
  if (menuBtn) on(menuBtn, "click", () => setMenu(!html.classList.contains("menu-open")));
  on(window, "keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ------------------------------------------------------------ Âncoras */
  $$('a[href^="#"]').forEach((a) => {
    on(a, "click", (e) => {
      const id = a.getAttribute("href");
      const target = id === "#top" ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      if (html.classList.contains("menu-open")) setMenu(false);
      if (lenis) lenis.scrollTo(target, { duration: 1.3 });
      else if (target === 0) scrollTo({ top: 0, behavior: "smooth" });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ------------------------------------------------------------ Magnético, cópia, tilt */
  $$(".magnetic").forEach((el) => {
    if (!fine) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1,0.4)" });
    on(el, "pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    on(el, "pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
  const copyBtn = $("[data-copy]");
  if (copyBtn) {
    on(copyBtn, "click", async () => {
      const label = $("span", copyBtn);
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        label.textContent = copyBtn.dataset.done;
      } catch {
        label.textContent = copyBtn.dataset.copy;
      }
      setTimeout(() => (label.textContent = copyBtn.dataset.label), 1800);
    });
  }
  if (fine && !reduce) {
    $$(".card .poster").forEach((p) => {
      const inner = $(".poster-in", p);
      const rx = gsap.quickTo(inner, "rotationX", { duration: 0.5, ease: "power3.out" });
      const ry = gsap.quickTo(inner, "rotationY", { duration: 0.5, ease: "power3.out" });
      gsap.set(inner, { transformPerspective: 900 });
      on(p, "pointermove", (e) => {
        const r = p.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 16);
        rx((0.5 - (e.clientY - r.top) / r.height) * 16);
      });
      on(p, "pointerleave", () => {
        rx(0);
        ry(0);
      });
    });
  }

  /* ------------------------------------------------------------ Filtro de projetos (Flip) */
  const cards = $$(".card");
  const shown = $("[data-shown]");
  const cardTriggers = [];
  $$(".chip").forEach((chip) => {
    on(chip, "click", () => {
      if (chip.classList.contains("is-on")) return;
      $$(".chip").forEach((c) => {
        c.classList.toggle("is-on", c === chip);
        c.setAttribute("aria-pressed", c === chip);
      });
      const f = chip.dataset.filter;
      cardTriggers.forEach((t) => t.kill());
      cardTriggers.length = 0;
      gsap.set(cards, { opacity: 1, y: 0, rotation: 0 });
      const state = Flip.getState(cards);
      let n = 0;
      cards.forEach((c) => {
        const ok = f === "all" || c.dataset.tags.split("|").includes(f);
        c.style.display = ok ? "" : "none";
        if (ok) n++;
      });
      if (shown) shown.textContent = n;
      Flip.from(state, {
        duration: 0.6,
        ease: "power4.inOut",
        stagger: 0.03,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.8, duration: 0.3 }),
        onComplete: () => {
          measure();
          ScrollTrigger.refresh();
        },
      });
    });
  });

  /* ------------------------------------------------------------ Scroll */
  let ctx = null;
  const buildScroll = () => {
    ctx = gsap.context(() => {
      measure();

      // nome sobe mais devagar que a página
      gsap.to(".hero-title", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".sticker", {
        yPercent: -160,
        rotation: 40,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // títulos: palavras sobem como carimbo; o rótulo do índice estica
      $$(".mask").forEach((el) => {
        const words = splitWords(el, true);
        gsap.from(words, {
          yPercent: 115,
          rotation: 4,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      $$(".idx").forEach((l) =>
        gsap.from(l, {
          scaleX: 0,
          transformOrigin: "0 50%",
          duration: 0.6,
          ease: "power4.out",
          scrollTrigger: { trigger: l, start: "top 92%", once: true },
        })
      );

      // texto que acende e marca-texto que preenche
      $$(".scrub-words").forEach((el) => {
        const words = splitWords(el);
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: true },
          }
        );
      });
      $$(".mk").forEach((mk) => {
        if (mk.closest(".hero-sub")) return;
        gsap.to(mk, {
          "--p": 1,
          ease: "none",
          scrollTrigger: { trigger: mk, start: "top 75%", end: "top 45%", scrub: true },
        });
      });

      $$("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          rotation: gsap.utils.random(-1.5, 1.5),
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      $$("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(o.v)),
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // linhas da experiência entram de lado
      $$(".xrow").forEach((row, i) => {
        gsap.from(row, {
          xPercent: i % 2 ? 8 : -8,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: row, start: "top 94%", once: true },
        });
      });

      // cartões caem tortos e se acomodam
      cards.forEach((c, i) => {
        gsap.set(c, { opacity: 0, y: 90, rotation: i % 2 ? 2.5 : -2.5 });
        const t = ScrollTrigger.create({
          trigger: c,
          start: "top 94%",
          once: true,
          onEnter: () => gsap.to(c, { opacity: 1, y: 0, rotation: 0, duration: 0.8, ease: "back.out(1.5)" }),
        });
        cardTriggers.push(t);
      });

      // tabela: blocos pipocam em cascata
      gsap.from(".tile", {
        opacity: 0,
        scale: 0.5,
        rotation: () => gsap.utils.random(-12, 12),
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.02, from: "random" },
        scrollTrigger: { trigger: ".ptable", start: "top 85%", once: true },
      });

      // contato
      gsap.from(".orb", {
        scale: 0,
        rotation: -120,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".orb", start: "top 90%", once: true },
      });
      gsap.from(".contact .btn", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power4.out",
        stagger: 0.1,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".contact-row", start: "top 92%", once: true },
      });
    });
  };

  /* ------------------------------------------------------------ Boot */
  const bootN = $("[data-boot-n]");
  const boot = { v: 0 };
  const progress = (target) =>
    gsap.to(boot, {
      v: target,
      duration: 0.35,
      ease: "none",
      overwrite: true,
      onUpdate: () => bootN && (bootN.textContent = String(Math.round(boot.v)).padStart(3, "0")),
    });
  let dead = false;

  (async () => {
    try {
      await wait(150);
      await Promise.race([
        Promise.all([
          document.fonts.load('400 100px "Archivo Black"'),
          document.fonts.load('400 14px "Space Mono"'),
          document.fonts.ready,
        ]),
        wait(3000),
      ]);
      if (dead) return;
      progress(20);

      // campos visíveis + gerador de pôsteres (three.js carrega sob demanda)
      let shaderMod = null;
      try {
        shaderMod = await import("./shader");
      } catch {
        shaderMod = null;
      }
      try {
        const { createBrasilia } = await import("./scene3d");
        if (hero3d.el) hero3d.gl = createBrasilia(hero3d.el);
      } catch (err) {
        console.error(err);
        hero3d.gl = null;
      }
      if (shaderMod) {
        FIELDS.forEach((def) => {
          const el = $(def.sel);
          if (!el) return;
          try {
            const gl = shaderMod.createField(el, def.pal);
            if (gl) {
              fields.push({
                gl, el, vis: false, mx: null, my: null, lens: 0, dpr: 1, cell: def.cell,
                intro: () => 1,
              });
            }
          } catch {
            /* sem WebGL: o fundo chapado do CSS fica */
          }
        });
        try {
          bake = shaderMod.createGL(bakeCanvas);
        } catch {
          bake = null;
        }
      }
      if (dead) {
        fields.forEach((f) => f.gl.dispose());
        if (hero3d.gl) hero3d.gl.dispose();
        if (bake) bake.dispose();
        return;
      }
      sizeFields();
      fields.forEach((f) => io.observe(f.el));
      progress(40);

      const arts = $$("img[data-seed]");
      if (bake) {
        for (let i = 0; i < arts.length; i++) {
          await nextFrame();
          if (dead) return;
          const im = arts[i];
          const seed = parseFloat(im.dataset.seed);
          try {
            im.src = await bake.bake(seed, +im.dataset.w, +im.dataset.h, ACCENTS[(seed - 1) % ACCENTS.length]);
          } catch {
            /* fica o fundo chapado */
          }
          progress(40 + ((i + 1) / arts.length) * 55);
        }
        bake.dispose(); // libera o contexto: os pôsteres já são imagens
        bake = null;
      }
      progress(100);
      await wait(reduce ? 50 : 450);
      if (dead) return;

      buildScroll();
      ScrollTrigger.refresh();

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".boot-count", { yPercent: -130, duration: 0.5, ease: "power4.in" })
        .to(".boot .bar", { yPercent: -101, duration: 0.85, ease: "expo.inOut", stagger: 0.07 }, ">-0.1")
        .to(st, { intro: 1, duration: 1.8, ease: "power2.inOut" }, "<0.2")
        .from(".ht", { scaleX: 0, transformOrigin: "0 50%", duration: 0.5, stagger: 0.12 }, "<0.3")
        .from(chars, { yPercent: 115, rotation: 8, duration: 0.7, ease: "back.out(2.2)", stagger: 0.05 }, "<0.25")
        .from(".sticker", { scale: 0, rotation: -140, duration: 0.8, ease: "back.out(2)" }, "<0.3")
        .from(".nav", { yPercent: -100, duration: 0.6 }, "<")
        .from(".hero-foot > *", { y: 70, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: "transform,opacity" }, "<0.1")
        .add(() => {
          st.ready = true;
          html.classList.remove("is-loading");
          html.classList.add("intro-done");
          $(".boot").style.display = "none";
          gsap.set(chars, { clearProps: "transform" });
          charsLive = true;
          if (lenis) lenis.start();
          if (!reduce) {
            gsap.to(".sticker", { rotation: 10, duration: 0.9, ease: "steps(3)", yoyo: true, repeat: -1 });
          }
        });
      if (reduce) tl.timeScale(8);
    } catch (err) {
      console.error(err);
      st.intro = 1;
      st.ready = true;
      $(".boot").style.display = "none";
      html.classList.remove("is-loading");
      html.classList.add("intro-done");
      if (lenis) lenis.start();
      buildScroll();
    }
  })();

  return () => {
    dead = true;
    cleanups.forEach((f) => f());
    if (ctx) ctx.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (lenis) lenis.destroy();
    fields.forEach((f) => f.gl.dispose());
    if (hero3d.gl) hero3d.gl.dispose();
    if (bake) bake.dispose();
    html.classList.remove("is-loading", "has-cursor", "menu-open", "intro-done");
  };
}
