/* Pedro Sales — portfolio (tunnel version).
   Plain JS, no build step. Scroll drives a camera through a WebGL tunnel;
   each <section class="st"> is a "station" that flies toward the viewer. */
(function () {
  'use strict';

  /* ---------- content ---------- */
  const T = {
    en: {
      role: 'Full-stack developer',
      hero: 'I build automation platforms, desktop apps and real-time systems. Mostly in TypeScript and Python, and in C++ for TunnelRat, my LAN streaming app.',
      enter: 'Scroll to enter', work: 'Work', personal: 'Personal project', prod: 'In production', dev: 'In development', code: 'Code',
      archive: 'More projects', about: 'About', aboutTitle: 'Back end, front end, desktop.',
      about1: 'Full-stack developer in Belo Horizonte, Brazil. At work I build browser automation: the API, the dashboard, the Electron runner and the Python bots that do the clicking. At home I build things my friends and I use, like a voice and screen-share app for our group.',
      about2: 'I write TypeScript and Python every day and I’m learning C++ by building TunnelRat. Claude Code and MCP are part of my daily workflow. Portuguese (native) · English (full professional) · Certified in Computer Hardware Basics.',
      contact: 'Contact', c1: 'Email', c2: 'me.',
      rpaWhere: 'Altasnet · private',
      rpaDesc: 'Browser automation platform in four parts: a TypeScript API, a React dashboard for runs and metrics, an Electron runner and Python + Playwright bots. Every run saves a screenshot per step, JSONL logs and a standard exit code, and failed steps retry with backoff.',
      ltDesc: 'Discord-style desktop app my friend group uses every day. Voice chat and 60 fps screen sharing with audio, on a Node.js + TypeScript backend that costs nothing to host.',
      trDesc: 'LAN streaming built from scratch, in the style of Parsec. 1080p60 with gamepad input, Windows to Linux and back, and either machine can host. I’m building it to play and code across my two PCs.',
      nav: ['Intro', 'RPA', 'LeTopeiras', 'TunnelRat', 'Projects', 'About', 'Stack', 'Contact']
    },
    pt: {
      role: 'Desenvolvedor full-stack',
      hero: 'Construo plataformas de automação, apps desktop e sistemas em tempo real. Quase tudo em TypeScript e Python, e em C++ no TunnelRat, meu app de streaming na rede local.',
      enter: 'Role para entrar', work: 'Trabalhos', personal: 'Projeto pessoal', prod: 'Em produção', dev: 'Em desenvolvimento', code: 'Código',
      archive: 'Mais projetos', about: 'Sobre', aboutTitle: 'Back-end, front-end, desktop.',
      about1: 'Desenvolvedor full-stack em Belo Horizonte. No trabalho faço automação de navegador: a API, o painel, o runner em Electron e os robôs em Python que clicam nas telas. Em casa faço coisas que eu e meus amigos usamos, como um app de voz e compartilhamento de tela pro nosso grupo.',
      about2: 'Escrevo TypeScript e Python todo dia e estou aprendendo C++ construindo o TunnelRat. Claude Code e MCP fazem parte do meu fluxo diário. Português (nativo) · Inglês (profissional completo) · Certificação Computer Hardware Basics.',
      contact: 'Contato', c1: 'Me', c2: 'chama.',
      rpaWhere: 'Altasnet · privado',
      rpaDesc: 'Plataforma de automação de navegador em quatro partes: API em TypeScript, painel React para execuções e métricas, runner em Electron e robôs em Python + Playwright. Cada execução salva um print por passo, logs JSONL e um código de saída padrão, e passos que falham tentam de novo com backoff.',
      ltDesc: 'App desktop estilo Discord que meu grupo de amigos usa todo dia. Chat de voz e compartilhamento de tela a 60 fps com áudio, com backend em Node.js + TypeScript que não custa nada pra hospedar.',
      trDesc: 'Streaming na rede local feito do zero, no estilo do Parsec. 1080p60 com gamepad, de Windows pra Linux e vice-versa, e qualquer máquina pode ser host. Estou construindo pra jogar e programar entre os meus dois PCs.',
      nav: ['Início', 'RPA', 'LeTopeiras', 'TunnelRat', 'Projetos', 'Sobre', 'Stack', 'Contato']
    }
  };

  const G = 'https://github.com/PedroMaxis/';
  const ARCHIVE = [
    { name: 'WaveGains', repo: G + 'WaveGains', demo: 'https://wave-gains.vercel.app', en: 'Hypertrophy training periodization with 1RM and RPE calculators.', pt: 'Periodização de treinos para hipertrofia, com calculadoras de 1RM e RPE.' },
    { name: 'ProjectMGMT', repo: G + 'ProjectMGMT', demo: 'https://pedromaxis.github.io/ProjectMGMT/', en: 'Project management in Rails 8.1: kanban, sprints, burndown. 76 tests.', pt: 'Gestão de projetos em Rails 8.1: kanban, sprints, burndown. 76 testes.' },
    { name: 'Product Management System', repo: G + 'product-management-system', demo: 'https://pedromaxis.github.io/product-management-system/', en: 'Inventory control with alerts, charts and CSV import.', pt: 'Controle de estoque com alertas, gráficos e importação de CSV.' },
    { name: 'Ginga', repo: G + 'ecommerce-camisas', demo: 'https://pedromaxis.github.io/ecommerce-camisas/', en: 'E-commerce with cart, checkout and admin panel; Express + SQLite.', pt: 'E-commerce com carrinho, checkout e painel admin; Express + SQLite.' },
    { name: 'Shadow Calendar', repo: G + 'shadow-calendar', demo: 'https://shadow-calendar.vercel.app', en: 'Minimalist calendar with month/week/day views and reminders.', pt: 'Calendário minimalista com visões mês/semana/dia e lembretes.' },
    { name: 'Gallery Viewer', repo: G + 'GalleryViewer', demo: 'https://pedromaxis.github.io/GalleryViewer/', en: 'Image uploads in a mosaic grid, own front and back end.', pt: 'Upload de imagens em grid mosaico, front e back próprios.' },
    { name: 'React NBA', repo: G + 'React-NBA', demo: 'https://react-nba-pearl.vercel.app', en: 'NBA teams with info and main players.', pt: 'Times da NBA com informações e principais jogadores.' },
    { name: 'Jokenpo', repo: G + 'Jokenpo', demo: 'https://pedromaxis.github.io/Jokenpo/', en: 'Rock, paper, scissors in the browser.', pt: 'Pedra, papel e tesoura no navegador.' }
  ];
  const JOBS = {
    en: [['Software Developer I', 'Altasnet', 'Feb 2025 – now'], ['Intern', 'Altasnet', 'Sep 2023 – Feb 2025'], ['COTEMIG', 'High school and college', '2022 – 2024']],
    pt: [['Programador de Computador I', 'Altasnet', 'fev 2025 – hoje'], ['Estagiário', 'Altasnet', 'set 2023 – fev 2025'], ['COTEMIG', 'Colégio e Faculdade', '2022 – 2024']]
  };
  const STACK = {
    en: [['Languages', 'TypeScript, JavaScript, Python, PHP, C++'], ['Back-end', 'Node.js, Express, Laravel'], ['Front-end', 'React, Next.js, Electron, Tailwind CSS'], ['Automation & AI', 'Playwright, Claude Code, MCP'], ['Databases', 'PostgreSQL, MySQL, MongoDB, SQLite'], ['Tools', 'Git, Azure DevOps, Postman, Arch Linux']],
    pt: [['Linguagens', 'TypeScript, JavaScript, Python, PHP, C++'], ['Back-end', 'Node.js, Express, Laravel'], ['Front-end', 'React, Next.js, Electron, Tailwind CSS'], ['Automação e IA', 'Playwright, Claude Code, MCP'], ['Bancos de dados', 'PostgreSQL, MySQL, MongoDB, SQLite'], ['Ferramentas', 'Git, Azure DevOps, Postman, Arch Linux']]
  };

  /* ---------- dom helpers ---------- */
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const root = $('#root');
  const stations = Array.from(document.querySelectorAll('.st'));
  const N = stations.length;
  let lang = 'en';
  let idx = -1;

  function readLang() {
    try { const s = localStorage.getItem('lang'); if (s === 'en' || s === 'pt') return s; } catch (e) { /* no storage */ }
    return (navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  function render() {
    const t = T[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach((n) => { n.textContent = t[n.dataset.i18n]; });
    document.querySelectorAll('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

    const arc = $('#archive'); arc.textContent = '';
    ARCHIVE.forEach((a) => {
      const row = el('div', 'arc');
      const top = el('div', 'arc-top');
      top.appendChild(el('span', 'arc-name', a.name));
      const links = el('span', 'mono arc-links');
      const r = el('a', 'lk', t.code); r.href = a.repo;
      const d = el('a', 'lk', 'Demo'); d.href = a.demo;
      links.append(r, d); top.appendChild(links);
      row.append(top, el('div', 'arc-desc', a[lang]));
      arc.appendChild(row);
    });

    const jobs = $('#jobs'); jobs.textContent = '';
    JOBS[lang].forEach((j) => {
      const row = el('div', 'mono job');
      row.append(el('span', '', j[0] + ' · ' + j[1]), el('span', 'when', j[2]));
      jobs.appendChild(row);
    });

    const st = $('#stack'); st.textContent = '';
    STACK[lang].forEach((s) => {
      const c = el('div', 'cell');
      c.append(el('div', 'mono k', s[0]), el('div', 'v', s[1]));
      st.appendChild(c);
    });

    const nav = $('#nav'); nav.textContent = '';
    t.nav.forEach((label, i) => {
      const b = el('button', 'nb', '0' + i + ' ' + label);
      b.type = 'button';
      b.setAttribute('aria-current', String(i === idx));
      b.addEventListener('click', () => goTo(i));
      nav.appendChild(b);
    });
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('lang', l); } catch (e) { /* no storage */ }
    render();
  }
  document.querySelectorAll('[data-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  /* ---------- clock ---------- */
  const clock = $('#clock');
  function tick() {
    try { clock.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit' }); } catch (e) { clock.textContent = ''; }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- scroll ---------- */
  function progress() {
    const r = root.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    return span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 0;
  }
  function goTo(i) {
    const r = root.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    window.scrollTo({ top: window.scrollY + r.top + span * (i / (N - 1)), behavior: 'smooth' });
  }

  /* ---------- mouse ---------- */
  const mouse = [0.5, 0.5], target = [0.5, 0.5];
  window.addEventListener('pointermove', (e) => { target[0] = e.clientX / window.innerWidth; target[1] = 1 - e.clientY / window.innerHeight; });

  /* ---------- webgl tunnel ---------- */
  const canvas = $('#gl');
  const ACCENT = [0xDF / 255, 0xD0 / 255, 0xB8 / 255];
  const FS = `precision highp float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform vec3 ac;uniform float z0;uniform float vl;uniform float rl;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;
 uv-=(m-.5)*vec2(.2,.14);
 float cs=cos(rl),sn=sin(rl);uv=mat2(cs,-sn,sn,cs)*uv;
 float rad=pow(pow(abs(uv.x),6.)+pow(abs(uv.y)*1.25,6.),1./6.);rad=max(rad,1e-3);
 float depth=.32/rad;float z=depth+z0;
 float a=atan(uv.y,uv.x)/6.28318+.5;
 vec2 g=vec2(a*24.,z*1.5);vec2 id=floor(g);vec2 f=fract(g);
 float pn=h(id);
 vec3 col=vec3(.133,.157,.192)*(.6+.6*pn);
 vec3 LC=vec3(.875,.816,.722);
 float dt=exp(-depth*.05);vec2 e2=min(f,1.-f);
 col*=.68+.32*smoothstep(0.,.06,e2.x)*smoothstep(0.,.08,e2.y);
 col+=LC*.06*smoothstep(.09,.05,f.y)*step(.05,f.y)*dt;
 float vent=step(.78,pn)*step(.5,fract(f.y*12.))*step(.15,f.x)*step(f.x,.85)*step(.15,f.y)*step(f.y,.85);col*=1.-vent*.5;
 vec2 q4=abs(f-.5);float riv=smoothstep(.04,.02,length(q4-vec2(.41,.39)))*dt;col+=LC*riv*.14;
 float mc=mod(id.x,6.);float cab=step(2.5,mc)*step(mc,3.5);float cx=abs(f.x-.5)*2.;float onp=cab*step(cx,.6);
 float cyl=sqrt(max(0.,1.-pow(cx/.6,2.)));
 col=mix(col,vec3(.224,.243,.275)*(.5+.9*cyl*cyl),onp);
 col+=LC*onp*step(.94,fract(g.y*.5))*.12*dt;
 float seam=max(step(.95,f.x),step(.93,f.y))*(1.-onp);col+=vec3(.224,.243,.275)*seam*.6;
 float strip=step(mc,.5)*smoothstep(.5,.25,abs(f.x-.5));
 float flick=.65+.35*step(.12,h(vec2(id.y,floor(t*8.))));
 float dS=abs(mod(g.x-.5+3.,6.)-3.);
 col+=LC*(strip*.3+exp(-dS*1.1)*.06)*flick;
 float fl=step(.19,a)*step(a,.31);float mesh=min(1.,step(.8,fract(g.x*4.))+step(.8,fract(g.y*5.)));
 col=mix(col,col*.55+LC*.05*mesh*dt,fl);
 float co=abs(abs(uv.x)-abs(uv.y)*1.25)/rad;col*=.6+.4*smoothstep(0.,.3,co);
 float rz2=abs(mod(z,12.)-6.);float hz=step(.22,rz2)*step(rz2,.6)*step(.5,fract(a*48.+z*1.5));col=mix(col,ac*.6,hz*.75*dt);
 float rz=abs(mod(z,12.)-6.);col=mix(col,ac,smoothstep(.22,0.,rz)*.9);
 float sid=floor(a*180.);float ph=fract(z*.15+h(vec2(sid,3.)));
 float sk=step(.9,h(vec2(sid,1.)))*smoothstep(0.,.05,ph)*(1.-smoothstep(.05,.45,ph));
 col+=ac*sk*vl*1.6;
 col=mix(vec3(.07,.08,.1),col,exp(-depth*.085));
 col+=ac*.14*smoothstep(.14,0.,rad)+vec3(.06)*smoothstep(.05,0.,rad);
 col+=(h(gl_FragCoord.xy+fract(t*13.))-.5)*.05;
 col*=.96+.04*sin(gl_FragCoord.y*1.3);
 vec2 c=gl_FragCoord.xy/r-.5;col*=1.-dot(c,c)*.8;
 gl_FragColor=vec4(col,1.);
}`;

  let gl = null, U = null;
  function initGL() {
    gl = canvas.getContext('webgl', { antialias: false });
    if (!gl) return;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { gl = null; return; }
    gl.useProgram(pr);
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    U = {}; ['r', 't', 'm', 'ac', 'z0', 'vl', 'rl'].forEach((k) => { U[k] = gl.getUniformLocation(pr, k); });
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas); else window.addEventListener('resize', resize);
    resize();
  }

  /* ---------- loop ---------- */
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bar = $('#bar');
  let ps = 0, vel = 0;
  const t0 = performance.now();

  function frame() {
    const now = performance.now();
    const p = progress();
    const prev = ps;
    ps += (p - ps) * (reduce ? 1 : 0.075);
    vel += (Math.min(1, Math.abs(ps - prev) * 60) - vel) * 0.1;
    if (!reduce) { mouse[0] += (target[0] - mouse[0]) * 0.05; mouse[1] += (target[1] - mouse[1]) * 0.05; }

    const pos = ps * (N - 1);
    for (let i = 0; i < N; i++) {
      const s = stations[i];
      const d = pos - i;
      let op, sc;
      if (d < 0) { op = Math.max(0, Math.min(1, (d + 0.7) / 0.45)); sc = Math.exp(d * 1.5); }
      else { op = 1 - Math.max(0, Math.min(1, (d - 0.1) / 0.32)); sc = Math.exp(d * 2.4); }
      if (reduce) sc = 1;
      const px = (mouse[0] - 0.5) * -30 * (1 - Math.min(1, Math.abs(d))), py = (mouse[1] - 0.5) * 18;
      s.style.opacity = op.toFixed(3);
      s.style.visibility = op > 0.001 ? 'visible' : 'hidden';
      s.style.pointerEvents = op > 0.6 ? 'auto' : 'none';
      s.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0) scale(' + sc.toFixed(3) + ')';
    }

    const ni = Math.max(0, Math.min(N - 1, Math.round(pos)));
    if (ni !== idx) {
      idx = ni;
      document.querySelectorAll('#nav .nb').forEach((b, i) => b.setAttribute('aria-current', String(i === idx)));
    }
    bar.style.width = (ps * 100).toFixed(2) + '%';

    if (gl) {
      const el2 = (now - t0) / 1000;
      gl.uniform2f(U.r, canvas.width, canvas.height);
      gl.uniform1f(U.t, el2);
      gl.uniform2f(U.m, mouse[0], mouse[1]);
      gl.uniform3f(U.ac, ACCENT[0], ACCENT[1], ACCENT[2]);
      gl.uniform1f(U.z0, ps * 84 + (reduce ? 0 : el2 * 0.15));
      gl.uniform1f(U.vl, vel);
      gl.uniform1f(U.rl, reduce ? 0 : vel * 0.35 * Math.sign(p - ps || 1) + Math.sin(el2 / 5) * 0.03);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    requestAnimationFrame(frame);
  }

  lang = readLang();
  render();
  initGL();
  frame();
})();
