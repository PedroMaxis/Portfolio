/* Idioma ativo: escolha salva > idioma do navegador > português.
   Trocar de idioma salva a escolha e recarrega a página: os efeitos (GSAP) quebram o texto em
   palavras e letras, então remontar tudo é o jeito seguro de manter React e DOM em sincronia. */
const read = () => {
  try {
    return localStorage.getItem("lang");
  } catch {
    return null;
  }
};

const detect = () => {
  const saved = read();
  if (saved === "pt" || saved === "en") return saved;
  return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
};

export const LANG = detect();

export const setLang = (l) => {
  if (l === LANG) return;
  try {
    localStorage.setItem("lang", l);
  } catch {
    /* sem armazenamento: o idioma volta ao do navegador */
  }
  location.reload();
};

export const pick = (v) => (v && typeof v === "object" && !Array.isArray(v) && "pt" in v ? v[LANG] : v);

export const ui = {
  pt: {
    skip: "Pular para o conteúdo",
    nav: ["Sobre", "Experiência", "Projetos", "Stack", "Contato"],
    menu: "Menu",
    close: "Fechar",
    langLabel: "Idioma",
    boot: "portfólio",
    sticker: ["Belo", "Horizonte", "Brasil"],
    heroSub: ["Software de ponta a ponta: ", "web", ", automação e sistemas de baixa latência."],
    metaRole: "Função",
    metaPlace: "Local",
    metaContact: "Contato",
    place: "Belo Horizonte, MG",
    cta: "Vamos conversar",
    bandA: ["Full-stack", "Automação", "Sistemas", "TypeScript", "C++", "Feito em BH"],
    bandB: ["React", "Node.js", "Baixa latência", "Playwright", "Belo Horizonte", "Brasil"],
    titles: { about: "Sobre", exp: "Experiência", proj: "Projetos", stack: "Stack", contact: "Contato" },
    lead: [
      "Desenvolvedor full-stack de Belo Horizonte. Projeto, construo e mantenho software ",
      "de ponta a ponta",
      " — de ferramentas web a frameworks de ",
      "automação",
      " e sistemas de rede de ",
      "baixa latência",
      ".",
    ],
    summary: "Em resumo",
    specs: {
      job: "Trabalho atual",
      lives: "Mora em",
      livesVal: "Belo Horizonte, MG — Brasil",
      langs: "Idiomas",
      uses: "Mais usa",
      learning: "Aprendendo",
      learningVal: "C++ e streaming de baixa latência",
      repos: "Repositórios públicos",
      years: "Tempo de estrada",
      yearsUnit: "+ anos",
    },
    langsLabel: "Idiomas",
    certsLabel: "Certificações",
    filterAria: "Filtrar projetos",
    all: "Todos",
    featuredTag: "Destaques",
    badge: "Destaque",
    code: "Código",
    privateTag: "privado",
    techAria: "Tecnologias",
    letsTalk: ["Vamos ", "conversar", "?"],
    mailAria: "Enviar e-mail para",
    orbText: "ESCREVA UMA MENSAGEM",
    copy: "Copiar e-mail",
    copied: "Copiado!",
    top: "Topo ↑",
    footer: "Feito em Belo Horizonte, Brasil",
    cursorOpen: "Abrir",
    cursorGo: "Ir",
    cursorWrite: "Escrever",
    docTitle: "Pedro Sales — Desenvolvedor de Software",
    docDesc: "Portfólio de Pedro Sales: desenvolvedor full-stack (TypeScript, React, Node, Python) e sistemas em C++.",
  },
  en: {
    skip: "Skip to content",
    nav: ["About", "Experience", "Projects", "Stack", "Contact"],
    menu: "Menu",
    close: "Close",
    langLabel: "Language",
    boot: "portfolio",
    sticker: ["Belo", "Horizonte", "Brazil"],
    heroSub: ["End-to-end software: ", "web", ", automation and low-latency systems."],
    metaRole: "Role",
    metaPlace: "Location",
    metaContact: "Contact",
    place: "Belo Horizonte, MG",
    cta: "Let's talk",
    bandA: ["Full-stack", "Automation", "Systems", "TypeScript", "C++", "Made in BH"],
    bandB: ["React", "Node.js", "Low latency", "Playwright", "Belo Horizonte", "Brazil"],
    titles: { about: "About", exp: "Experience", proj: "Projects", stack: "Stack", contact: "Contact" },
    lead: [
      "Full-stack developer from Belo Horizonte, Brazil. I design, build and maintain software ",
      "end to end",
      " — from web tools to ",
      "automation",
      " frameworks and ",
      "low-latency",
      " network systems.",
    ],
    summary: "At a glance",
    specs: {
      job: "Current job",
      lives: "Lives in",
      livesVal: "Belo Horizonte, MG — Brazil",
      langs: "Languages",
      uses: "Uses most",
      learning: "Learning",
      learningVal: "C++ and low-latency streaming",
      repos: "Public repositories",
      years: "Experience",
      yearsUnit: "+ years",
    },
    langsLabel: "Languages",
    certsLabel: "Certifications",
    filterAria: "Filter projects",
    all: "All",
    featuredTag: "Featured",
    badge: "Featured",
    code: "Code",
    privateTag: "private",
    techAria: "Technologies",
    letsTalk: ["Let's ", "talk", "?"],
    mailAria: "Send an email to",
    orbText: "SEND ME A MESSAGE",
    copy: "Copy email",
    copied: "Copied!",
    top: "Top ↑",
    footer: "Made in Belo Horizonte, Brazil",
    cursorOpen: "Open",
    cursorGo: "Go",
    cursorWrite: "Write",
    docTitle: "Pedro Sales — Software Developer",
    docDesc: "Pedro Sales' portfolio: full-stack developer (TypeScript, React, Node, Python) and C++ systems.",
  },
};
