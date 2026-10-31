# Portfólio — Pedro Sales

Meu portfólio pessoal: um túnel 3D por onde o scroll te leva por oito estações (Início, RPA Manager, LeTopeiras, TunnelRat, Mais projetos, Sobre, Stack e Contato). É bilíngue (PT/EN), o túnel é um shader WebGL feito à mão e a paleta é grafite e areia.

Quis um site sem framework e sem build, só HTML, CSS e JavaScript puro, então ele abre direto no navegador.

**Online:** https://pedromaxis.github.io/Portfolio/

## Estrutura

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura, textos em inglês (para quem não roda JS) e as 8 estações |
| `style.css` | Visual; a paleta fica nas variáveis do `:root` |
| `main.js` | Textos PT/EN, shader do túnel, scroll, navegação e relógio |
| `og.png` | Imagem de prévia ao compartilhar o link |

## Como funciona

- O scroll controla a câmera do túnel e a posição de cada estação, que vem na direção de quem olha.
- Cada estação tem um endereço (`#tunnelrat`, `#about`...), então dá para compartilhar o link de uma seção.
- Estações com muito conteúdo se ajustam sozinhas a telas pequenas.
- Se o FPS cair, a resolução do shader diminui sozinha.
- Com "reduzir movimento" ativado no sistema, as estações aparecem sem zoom e o túnel fica parado.

## Publicar

A pasta sobe como está no GitHub Pages, Vercel ou Netlify.
