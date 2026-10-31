# Portfólio — Pedro Sales (versão túnel, grafite e areia)

Site estático, sem build e sem dependências. São três arquivos:

- `index.html` — estrutura e as 8 estações (Início, RPA Manager, LeTopeiras, TunnelRat, Mais projetos, Sobre, Stack, Contato)
- `style.css` — visual; a paleta fica nas variáveis do `:root`
- `main.js` — textos em PT/EN, shader WebGL do túnel, scroll, navegação e relógio

## Rodar local

Abrir o `index.html` direto no navegador já funciona. Se quiser um servidor:

```bash
npx serve .
# ou
python -m http.server 8080
```

## Publicar

Dá pra subir a pasta como está no GitHub Pages, Vercel ou Netlify.

## Onde mexer

- **Textos:** objeto `T` no começo do `main.js` (chaves `en` e `pt`). No HTML, cada elemento com `data-i18n="chave"` puxa o texto dali.
- **Projetos extras, cargos e stack:** arrays `ARCHIVE`, `JOBS` e `STACK` no `main.js`.
- **Cores:** variáveis em `style.css` (`--bg`, `--line`, `--sand`...). A cor de destaque do shader é a constante `ACCENT` no `main.js`; o resto das cores do túnel está dentro do shader (`FS`).
- **Duração do scroll:** `height: calc(100vh + 7200px)` em `.tn`, no CSS. Aumentar o número deixa a viagem mais longa.
- **Idioma:** detecta pelo navegador e salva a escolha no `localStorage`.

## Passar pro React

A lógica fica toda no `main.js`, dentro de uma função. No React dá pra:

1. colocar o HTML num componente;
2. rodar o conteúdo do `main.js` num `useEffect` com refs pro `#root`, `#gl` e as seções;
3. trocar o `render()` por estado (`lang`) e JSX.

Quem tem "reduzir movimento" ativado no sistema vê as estações sem zoom e o túnel parado.
