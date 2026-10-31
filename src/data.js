/* Conteúdo bilíngue. Todo texto visível é { pt, en }; o App escolhe pelo idioma ativo. */
const t = (pt, en) => ({ pt, en });

export const profile = {
  name: "Pedro Lourenço Sales",
  shortName: "Pedro Sales",
  role: t("Desenvolvedor de Software", "Software Developer"),
  location: t("Belo Horizonte, MG, Brasil", "Belo Horizonte, MG, Brazil"),
  email: "pedro11sales14@gmail.com",
  github: "https://github.com/PedroMaxis",
  linkedin: "https://www.linkedin.com/in/pedrolsales/",
  tagline: t(
    "Construo software de ponta a ponta: de aplicações web e ferramentas internas a frameworks de automação e software de rede de baixa latência.",
    "I build software end to end: from web apps and internal tools to automation frameworks and low-latency network software."
  ),
  about: {
    pt: [
      "Sou desenvolvedor do Brasil e gosto de construir coisas de ponta a ponta. No dia a dia trabalho com TypeScript e Python; em paralelo, estou me aprofundando em C++ e programação de sistemas.",
      "Projetei, construí e mantenho sozinho um framework de RPA determinístico, da plataforma de gestão ao runner e aos scripts de automação. Também mantenho em produção um app desktop estilo Discord usado diariamente por um grupo de amigos.",
      "Uso fluxos de desenvolvimento com IA agêntica (Claude Code, MCP, pipelines multiagente) como parte de como entrego software.",
    ],
    en: [
      "I'm a developer from Brazil and I like building things end to end. Day to day I work with TypeScript and Python; on the side, I'm going deeper into C++ and systems programming.",
      "I designed, built and single-handedly maintain a deterministic RPA framework, from the management platform to the runner and the automation scripts. I also keep in production a Discord-style desktop app used daily by a group of friends.",
      "I use agentic AI development workflows (Claude Code, MCP, multi-agent pipelines) as part of how I ship software.",
    ],
  },
  learning: [
    t("Streaming de vídeo e áudio em tempo real e redes de baixa latência", "Real-time video and audio streaming and low-latency networks"),
    t("C++ moderno e programação de sistemas", "Modern C++ and systems programming"),
    t("Arquiteturas escaláveis em Node.js", "Scalable Node.js architectures"),
    t("Fluxos de desenvolvimento agêntico", "Agentic development workflows"),
  ],
};

export const experience = [
  {
    company: "ALTASNET",
    location: "Belo Horizonte, MG",
    roles: [
      { title: t("Programador de Computador I", "Software Developer I"), period: t("fev 2025 – atual", "Feb 2025 – present") },
      { title: t("Estagiário", "Intern"), period: t("set 2023 – fev 2025", "Sep 2023 – Feb 2025") },
    ],
  },
];

export const education = [
  { when: "2022 — 2024", title: "COTEMIG", where: t("Colégio e Faculdade", "High school and college") },
];

export const languages = [
  t("Português (nativo)", "Portuguese (native)"),
  t("Inglês (profissional completo)", "English (full professional)"),
];

export const certifications = [t("Computer Hardware Basics", "Computer Hardware Basics")];

export const featured = [
  {
    title: t("TunnelRat", "TunnelRat"),
    status: t("Em desenvolvimento", "In development"),
    description: t(
      "App de streaming de desktop remoto para rede local, no estilo Parsec, feito do zero. Streaming 1080p60 de baixa latência com suporte a controle, multiplataforma (Windows ↔ Linux) e qualquer máquina pode ser o host. Pensado para jogos e sessões de programação remota.",
      "Remote desktop streaming app for the local network, Parsec-style, built from scratch. Low-latency 1080p60 streaming with controller support, cross-platform (Windows ↔ Linux), and any machine can be the host. Made for games and remote programming sessions."
    ),
    stack: ["C++"],
  },
  {
    title: t("LeTopeiras Client", "LeTopeiras Client"),
    status: t("Em produção", "In production"),
    description: t(
      "App desktop estilo Discord usado diariamente por um grupo de amigos, com novas funcionalidades guiadas por pedidos dos usuários. Chat de voz e compartilhamento de tela a 60 fps com áudio, projetado para rodar em hospedagem de custo zero.",
      "Discord-style desktop app used daily by a group of friends, with new features driven by user requests. Voice chat and 60 fps screen sharing with audio, designed to run on zero-cost hosting."
    ),
    stack: ["Node.js", "TypeScript"],
    href: "https://github.com/PedroMaxis/LeTopeirasClient",
  },
  {
    title: t("Framework de RPA determinístico", "Deterministic RPA framework"),
    status: t("Privado · em produção", "Private · in production"),
    description: t(
      "Plataforma de automação de navegador pensada como produto: previsível e auditável, sem LLM no loop de execução. Composta por um gerenciador (API em TypeScript + frontend React), um runner desktop em Electron e scripts Python + Playwright com códigos de saída padronizados, retry/backoff, screenshots de cada etapa, logs JSONL e traces. Projetado, construído e mantido sozinho.",
      "Browser automation platform designed as a product: predictable and auditable, with no LLM in the execution loop. Made of a manager (TypeScript API + React frontend), an Electron desktop runner and Python + Playwright scripts with standardized exit codes, retry/backoff, per-step screenshots, JSONL logs and traces. Designed, built and maintained solo."
    ),
    stack: ["TypeScript", "React", "Electron", "Python", "Playwright"],
  },
];

export const projects = [
  {
    name: t("WaveGains", "WaveGains"),
    art: 4,
    description: t(
      "Aplicativo web de periodização de treinos para hipertrofia, com modelos de periodização, quiz de onboarding, dashboard e calculadoras de 1RM e RPE.",
      "Web app for hypertrophy training periodization, with periodization models, onboarding quiz, dashboard and 1RM and RPE calculators."
    ),
    stack: ["TypeScript"],
    repo: "https://github.com/PedroMaxis/WaveGains",
    demo: "https://wave-gains.vercel.app",
  },
  {
    name: t("Shadow Calendar", "Shadow Calendar"),
    art: 5,
    description: t(
      "Calendário minimalista com visões mensal, semanal e diária, eventos com categorias e cores, lembretes e dados salvos localmente.",
      "Minimalist calendar with month, week and day views, events with categories and colors, reminders and locally saved data."
    ),
    stack: ["TypeScript"],
    repo: "https://github.com/PedroMaxis/shadow-calendar",
    demo: "https://shadow-calendar.vercel.app",
  },
  {
    name: t("React NBA", "React NBA"),
    art: 6,
    description: t(
      "App responsivo para visualizar times da NBA com suas informações e jogadores principais.",
      "Responsive app to browse NBA teams with their information and main players."
    ),
    stack: ["React", "CSS"],
    repo: "https://github.com/PedroMaxis/React-NBA",
    demo: "https://react-nba-pearl.vercel.app",
  },
  {
    name: t("Gallery Viewer", "Gallery Viewer"),
    art: 7,
    description: t(
      "Envie uma imagem com título e veja tudo exibido num grid em mosaico. Front-end e back-end próprios.",
      "Upload an image with a title and see everything displayed in a mosaic grid. Own front end and back end."
    ),
    stack: ["JavaScript", "Node.js"],
    repo: "https://github.com/PedroMaxis/GalleryViewer",
    demo: "https://pedromaxis.github.io/GalleryViewer/",
  },
  {
    name: t("E-commerce de camisas", "T-shirt e-commerce"),
    art: 8,
    description: t(
      "Ginga, loja de blusas brasileiras: carrinho, cupom, frete, checkout e painel de administração, com API Express e SQLite e animações em GSAP.",
      "Ginga, a Brazilian tees shop: cart, coupon, shipping, checkout and admin panel, with an Express and SQLite API and GSAP animations."
    ),
    stack: ["JavaScript", "React", "Node.js", "GSAP"],
    repo: "https://github.com/PedroMaxis/ecommerce-camisas",
    demo: "https://pedromaxis.github.io/ecommerce-camisas/",
  },
  {
    name: t("Jokenpo", "Jokenpo"),
    art: 9,
    description: t(
      "Jogo de pedra, papel e tesoura no navegador, feito com React e Vite.",
      "Rock, paper, scissors game in the browser, made with React and Vite."
    ),
    stack: ["JavaScript", "React"],
    repo: "https://github.com/PedroMaxis/Jokenpo",
    demo: "https://pedromaxis.github.io/Jokenpo/",
  },
  {
    name: t("Product Management System", "Product Management System"),
    art: 10,
    description: t(
      "Almoxarifado: controle de estoque com movimentações, alertas de mínimo, painel com gráficos e importação de CSV. API Express e SQLite, front em React.",
      "Warehouse: inventory control with movements, minimum-stock alerts, dashboard with charts and CSV import. Express and SQLite API, React front end."
    ),
    stack: ["JavaScript", "React", "Node.js"],
    repo: "https://github.com/PedroMaxis/product-management-system",
    demo: "https://pedromaxis.github.io/product-management-system/",
  },
  {
    name: t("ProjectMGMT", "ProjectMGMT"),
    art: 11,
    description: t(
      "Prumo: gestão de projetos e produtos em Rails 8.1, com quadro kanban, sprints, burndown, roadmap e documentos em Markdown. 76 testes.",
      "Prumo: project and product management in Rails 8.1, with kanban board, sprints, burndown, roadmap and Markdown documents. 76 tests."
    ),
    stack: ["Ruby", "Rails"],
    repo: "https://github.com/PedroMaxis/ProjectMGMT",
    demo: "https://pedromaxis.github.io/ProjectMGMT/",
  },
];

export const stack = [
  { group: t("Linguagens", "Languages"), items: ["TypeScript", "JavaScript", "Python", "PHP", "C++"] },
  { group: t("Back-end", "Back end"), items: ["Node.js", "Express", "Laravel"] },
  {
    group: t("Front-end", "Front end"),
    items: ["React", "Next.js", "Electron", "jQuery", "Tailwind CSS", "HTML", "CSS"],
  },
  { group: t("Automação e IA", "Automation and AI"), items: ["Playwright", "Claude Code", "MCP"] },
  { group: t("Bancos de dados", "Databases"), items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  {
    group: t("Ferramentas", "Tools"),
    items: ["Git", "GitHub", "Azure DevOps", "Postman", "Arch Linux", "Windows"],
  },
];
