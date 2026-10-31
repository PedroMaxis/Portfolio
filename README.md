# Portfólio — Pedro Sales

Portfólio pessoal em formato de túnel 3D: o scroll leva o visitante por oito estações (Início, RPA Manager, LeTopeiras, TunnelRat, Mais projetos, Sobre, Stack e Contato). Bilíngue (PT/EN), com túnel em shader WebGL, paleta grafite e areia.

Site estático, sem build e sem dependências.

## Estrutura

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura e as 8 estações |
| `style.css` | Visual; a paleta fica nas variáveis do `:root` |
| `main.js` | Textos PT/EN, shader do túnel, scroll, navegação e relógio |

## Rodar local

Abrir o `index.html` no navegador já funciona. Com servidor:

```bash
npx serve .
# ou
python -m http.server 8080
```

## Publicar

A pasta sobe como está no GitHub Pages, Vercel ou Netlify.

## Onde mexer

- **Textos:** objeto `T` no início do `main.js` (chaves `en` e `pt`). No HTML, cada elemento com `data-i18n="chave"` puxa o texto dali.
- **Projetos extras, cargos e stack:** `ARCHIVE`, `JOBS` e `STACK` no `main.js`.
- **Cores:** variáveis do `:root` em `style.css` (`--bg`, `--line`, `--sand`...). A cor de destaque do shader é a constante `ACCENT` no `main.js`; as demais cores do túnel estão dentro do shader.
- **Duração da viagem:** `height: calc(100vh + 7200px)` em `.tn`, no CSS. Valor maior deixa o scroll mais longo.
- **Idioma:** detectado pelo navegador; a escolha fica salva no `localStorage`.

## Acessibilidade

Com "reduzir movimento" ativado no sistema, as estações aparecem sem zoom e o túnel fica parado.
