import { Fragment, useEffect } from "react";
import {
  profile,
  featured,
  projects,
  stack,
  experience,
  education,
  languages,
  certifications,
} from "./data";
import { LANG, setLang, pick, ui } from "./i18n";
import { initFx } from "./fx/effects";

const T = ui[LANG];

const hrefs = ["#sobre", "#experiencia", "#projetos", "#stack", "#contato"];
const links = hrefs.map((href, i) => ({ href, n: String(i + 1).padStart(2, "0"), label: T.nav[i] }));

const Roll = ({ href, children, ...rest }) => (
  <a href={href} className="roll" {...rest}>
    <span data-t={children}>{children}</span>
  </a>
);

/* texto com trechos destacados: posições ímpares viram <mark> */
const Marked = ({ parts }) =>
  parts.map((s, i) =>
    i % 2 ? (
      <mark className="mk" key={i}>
        {s}
      </mark>
    ) : (
      <Fragment key={i}>{s}</Fragment>
    )
  );

const timeline = [
  ...experience.flatMap((e) =>
    e.roles.map((r) => ({
      when: pick(r.period),
      title: pick(r.title),
      where: `${e.company} · ${e.location}`,
    }))
  ),
  ...education.map((e) => ({ when: e.when, title: e.title, where: pick(e.where) })),
];

/* Cards: destaques + demais projetos, num só grid filtrável */
const cards = [
  ...featured.map((p, i) => ({
    name: pick(p.title),
    description: pick(p.description),
    stack: p.stack,
    note: pick(p.status),
    href: p.href,
    featured: true,
    art: i + 1,
  })),
  ...projects.map((p) => ({
    name: pick(p.name),
    description: pick(p.description),
    stack: p.stack,
    note: p.stack.join(" · "),
    href: p.demo || p.repo,
    demo: p.demo,
    repo: p.repo,
    art: p.art,
  })),
];
const techs = ["TypeScript", "JavaScript", "Node.js", "React", "Python", "Ruby", "C++"].filter((t) =>
  cards.some((c) => c.stack.includes(t))
);
const filters = [
  { key: "all", label: T.all },
  { key: "featured", label: T.featuredTag },
  ...techs.map((t) => ({ key: t, label: t })),
];

/* Tabela de tecnologias */
const SYM = {
  TypeScript: "Ts", JavaScript: "Js", Python: "Py", PHP: "Ph", "C++": "C+",
  "Node.js": "No", Express: "Ex", Laravel: "La", React: "Re", "Next.js": "Nx",
  Electron: "El", jQuery: "jQ", "Tailwind CSS": "Tw", HTML: "Ht", CSS: "Cs",
  Playwright: "Pw", "Claude Code": "Cc", MCP: "Mc", PostgreSQL: "Pg", MySQL: "My",
  MongoDB: "Mg", SQLite: "Sq", Git: "Gi", GitHub: "Gh", "Azure DevOps": "Az",
  Postman: "Pm", "Arch Linux": "Ar", Windows: "Wn",
};
const tiles = stack.flatMap((g, gi) =>
  g.items.map((name) => ({ name, g: gi, group: pick(g.group) }))
);

const S = T.specs;
const specs = [
  [S.job, `${timeline[0].title} · ${experience[0].company}`],
  [S.lives, S.livesVal],
  [S.langs, languages.map(pick).join(" / ")],
  [S.uses, "TypeScript, React, Node.js, Python"],
  [S.learning, S.learningVal],
  [S.repos, <span key="r" data-count="13">0</span>],
  [
    S.years,
    <span key="e">
      <span data-count="3">0</span>
      {S.yearsUnit}
    </span>,
  ],
];

const year = new Date().getFullYear();

export default function App() {
  useEffect(() => {
    document.documentElement.lang = LANG === "pt" ? "pt-BR" : "en";
    document.title = T.docTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", T.docDesc);
    return initFx();
  }, []);

  return (
    <>
      <div className="boot" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((c) => (
          <i key={c} className="bar" />
        ))}
        <div className="boot-count">
          <span data-boot-n>000</span>
          <b>%</b>
        </div>
        <p className="boot-log">
          Pedro Sales — {T.boot} {year}
        </p>
      </div>

      <div className="cursor" aria-hidden="true">
        <i className="cursor-x" />
        <span className="cursor-label" />
      </div>

      <a className="skip" href="#sobre">
        {T.skip}
      </a>

      <header className="nav">
        <a href="#top" className="nav-logo">
          PEDRO SALES
        </a>
        <nav className="nav-links" aria-label="Menu">
          {links.map((l) => (
            <Roll key={l.href} href={l.href}>
              {l.label}
            </Roll>
          ))}
        </nav>
        <div className="lang" role="group" aria-label={T.langLabel}>
          {["pt", "en"].map((l) => (
            <button
              key={l}
              className={l === LANG ? "is-on" : ""}
              aria-pressed={l === LANG}
              lang={l}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button className="menu-btn" aria-expanded="false" aria-controls="menu" data-open={T.menu} data-close={T.close}>
          {T.menu}
        </button>
      </header>
      <nav className="menu" id="menu" aria-label="Menu">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            <small>{l.n}</small>
            {l.label}
          </a>
        ))}
      </nav>
      <div className="pct" aria-hidden="true">
        0%
      </div>

      <main>
        {/* ------------------------------------------------ HERO */}
        <section id="top" className="hero">
          <canvas className="hero-3d" aria-hidden="true" />
          <div className="sticker" aria-hidden="true">
            <span>
              <b>
                {T.sticker[0]}
                <br />
                {T.sticker[1]}
                <br />
                {T.sticker[2]}
              </b>
            </span>
          </div>

          <h1 className="hero-title" aria-label="Pedro Sales">
            <span className="ht ht-a">PEDRO</span>
            <span className="ht ht-b">SALES</span>
          </h1>

          <div className="hero-foot">
            <p className="hero-sub">
              <Marked parts={T.heroSub} />
            </p>
            <dl className="hero-meta">
              <div>
                <dt>{T.metaRole}</dt>
                <dd>{pick(profile.role)}</dd>
              </div>
              <div>
                <dt>{T.metaPlace}</dt>
                <dd>{T.place}</dd>
              </div>
              <div>
                <dt>{T.metaContact}</dt>
                <dd>{profile.email}</dd>
              </div>
            </dl>
            <a className="hero-cta" href="#contato" data-cursor={T.cursorGo}>
              {T.cta} <span aria-hidden="true">↘</span>
            </a>
          </div>
        </section>

        {/* ------------------------------------------------ FAIXAS */}
        <div className="band-wrap" aria-hidden="true">
          {[
            { dir: 1, cls: "band-a", words: T.bandA },
            { dir: -1, cls: "band-b", words: T.bandB },
          ].map((b) => (
            <div className={`band marquee ${b.cls}`} data-dir={b.dir} key={b.cls}>
              <div className="marquee-inner">
                {[0, 1].map((k) => (
                  <div className="marquee-set" key={k}>
                    {b.words.map((w) => (
                      <span key={w}>
                        {w}
                        <i>✱</i>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------ SOBRE */}
        <section id="sobre" className="section">
          <header className="sec-head">
            <span className="idx">01</span>
            <h2 className="title mask">{T.titles.about}</h2>
          </header>

          <div className="about">
            <p className="about-lead scrub-words">
              <Marked parts={T.lead} />
            </p>
            <div className="about-side">
              {profile.about[LANG].slice(1).map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="specs" data-reveal>
            <p className="specs-title">{T.summary}</p>
            <dl>
              {specs.map(([k, v]) => (
                <div className="spec" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------ EXPERIÊNCIA */}
        <section id="experiencia" className="section">
          <header className="sec-head">
            <span className="idx">02</span>
            <h2 className="title mask">{T.titles.exp}</h2>
          </header>
          <div className="xlist">
            {timeline.map((r) => (
              <div className="xrow" key={r.title + r.when}>
                <span className="xwhen">{r.when}</span>
                <span className="xtitle">{r.title}</span>
                <span className="xwhere">{r.where}</span>
                <span className="xarrow">→</span>
              </div>
            ))}
          </div>
          <p className="xmeta" data-reveal>
            {T.langsLabel}: {languages.map(pick).join(" · ")} &nbsp;/&nbsp; {T.certsLabel}:{" "}
            {certifications.map(pick).join(" · ")}
          </p>
        </section>

        {/* ------------------------------------------------ PROJETOS */}
        <section id="projetos" className="section">
          <header className="sec-head">
            <span className="idx">03</span>
            <h2 className="title mask">{T.titles.proj}</h2>
          </header>

          <div className="filters" role="toolbar" aria-label={T.filterAria}>
            {filters.map((f, i) => (
              <button key={f.key} className={`chip${i === 0 ? " is-on" : ""}`} data-filter={f.key} aria-pressed={i === 0}>
                {f.label}
              </button>
            ))}
            <span className="count" aria-live="polite">
              <b data-shown>{cards.length}</b>/{cards.length}
            </span>
          </div>

          <div className="cards">
            {cards.map((c, i) => {
              const Poster = c.href ? "a" : "div";
              const posterProps = c.href
                ? { href: c.href, target: "_blank", rel: "noreferrer", "data-cursor": T.cursorOpen }
                : {};
              return (
                <article
                  className={`card${c.featured ? " is-featured" : ""}`}
                  key={c.name}
                  data-tags={[...c.stack, c.featured ? "featured" : ""].join("|")}
                >
                  <Poster className="poster" {...posterProps}>
                    <span className="poster-in">
                      <img data-seed={c.art} data-w="900" data-h="675" alt="" />
                    </span>
                    {c.featured && <span className="badge">{T.badge}</span>}
                  </Poster>
                  <div className="card-meta">
                    <span>#{String(i + 1).padStart(2, "0")}</span>
                    <span>{c.note}</span>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <div className="card-links">
                    {c.demo && (
                      <Roll href={c.demo} target="_blank" rel="noreferrer">
                        Demo ↗
                      </Roll>
                    )}
                    {c.repo && (
                      <Roll href={c.repo} target="_blank" rel="noreferrer">
                        {`${T.code} ↗`}
                      </Roll>
                    )}
                    {c.featured && c.href && (
                      <Roll href={c.href} target="_blank" rel="noreferrer">
                        GitHub ↗
                      </Roll>
                    )}
                    {c.featured && !c.href && <span className="private">{T.privateTag}</span>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ------------------------------------------------ STACK */}
        <section id="stack" className="section">
          <header className="sec-head">
            <span className="idx">04</span>
            <h2 className="title mask">{T.titles.stack}</h2>
          </header>
          <div className="ptable" role="list" aria-label={T.techAria}>
            {tiles.map((t, i) => (
              <div className="tile" role="listitem" data-g={t.g} key={t.name} title={t.group}>
                <small>{String(i + 1).padStart(2, "0")}</small>
                <b>{SYM[t.name] || t.name.slice(0, 2)}</b>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ CONTATO */}
        <section id="contato" className="contact">
          <canvas className="contact-gl" aria-hidden="true" />
          <header className="sec-head">
            <span className="idx">05</span>
            <h2 className="title mask">{T.titles.contact}</h2>
          </header>

          <div className="contact-main">
            <p className="contact-big mask">
              <Marked parts={T.letsTalk} />
            </p>
            <a
              className="orb magnetic"
              href={`mailto:${profile.email}`}
              aria-label={`${T.mailAria} ${profile.email}`}
              data-cursor={T.cursorWrite}
            >
              <svg viewBox="0 0 200 200" className="spin" aria-hidden="true">
                <defs>
                  <path id="circ" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
                </defs>
                <text>
                  <textPath href="#circ" textLength="496" lengthAdjust="spacing">
                    {`${profile.email.toUpperCase()} • ${T.orbText} • `}
                  </textPath>
                </text>
              </svg>
              <span className="orb-arrow">↗</span>
            </a>
          </div>

          <div className="contact-row">
            <button className="copy btn" data-copy={profile.email} data-label={T.copy} data-done={T.copied}>
              <span>{T.copy}</span>
            </button>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>

          <footer className="foot">
            <span>
              © {year} {profile.name}
            </span>
            <span>{T.footer}</span>
            <a href="#top">{T.top}</a>
          </footer>
        </section>
      </main>
    </>
  );
}
