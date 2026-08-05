# Handoff: Save Point3D — E-commerce Site

## Como executar

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

O Vite exibirá o endereço local no terminal. Para validar a versão de produção:

```bash
npm run lint
npm run build
npm run preview
```

Os arquivos visuais do export original já estão em `public/assets/img` e
`public/assets/video`.

## Overview
Site institucional/e-commerce da Save Point3D (colecionáveis produzidos em impressão 3D PLA com acabamento manual). Contém home com vídeo hero, grid de produtos com filtros, categorias, seção de personalizados, processo de produção, dioramas, avaliações, Instagram e carrinho lateral.

## About the Design Files
Os arquivos deste pacote (`Save Point3D.dc.html` referenciado, e agora este scaffold em `src/`) são **referências de design** construídas em HTML/React de prototipagem. Este pacote já traduz essas referências para uma estrutura de projeto **React + TypeScript** convencional (pages / components / style / services / types / data), pronta para ser integrada ao ambiente real do seu app (Vite, Next.js, CRA — adapte o roteador e o bundler ao que já existir no seu repositório). Nenhuma lógica de backend real foi implementada — veja `src/services/api.ts`.

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamento e conteúdo (copy em pt-BR) devem ser recriados pixel a pixel a partir do design original. Os estilos aqui já usam os valores exatos (hex, px, clamp) do protótipo.

## Estrutura de pastas
```
src/
  pages/            uma pasta por rota, cada uma com index.tsx + handler.ts (hooks/estado)
    Home/
    Personalizados/
    Colecao/
    Processo/
    Contato/
  components/       componentes reutilizados pelas pages
    Header/ (+handler.ts)
    Footer/
    ProductCard/ (+handler.ts)
    CategoryCard/
    CartDrawer/ (+handler.ts)
    Newsletter/ (+handler.ts)
    ReviewsSection/
    InstagramGrid/
  style/
    global.css
    pages/           um .module.css por page
    components/      um .module.css por component
  types/product.ts
  data/products.ts  mock data — trocar por fetch real (ver services/api.ts)
  services/api.ts   stub de chamadas de API (produtos, cupom, newsletter, formulário)
  App.tsx           roteamento (react-router-dom) + estado global do carrinho
```

Padrão adotado: cada `index.tsx` cuida só de JSX/apresentação; `handler.ts` concentra hooks, estado e efeitos (data fetching, formulários, hover). Isso separa lógica de UI igual ao pedido.

## Screens / Páginas

### Home (`/`)
- **Hero**: vídeo full-bleed em loop + overlay gradiente escuro (esquerda p/ direita) + headline "Seu Universo Favorito Fora da Tela." + 2 CTAs.
- **Destaques**: grid de 3 produtos em destaque (fundo claro, cards `variant="light"`).
- **Categorias**: grid assimétrico de 7 categorias (Action Figures, Estátuas, Mechas, Bustos, Dioramas, Toy Art, Personalizados), cards com imagem de fundo em opacidade baixa e hover para fundo escuro.

### Personalizados (`/personalizados`)
Seção escura com CTA "Solicitar orçamento", lista de 6 passos do processo de encomenda, e imagem de referência à direita.

### Colecao (`/colecao`)
- **Diorama hero**: imagem full-bleed com overlay e CTA.
- **Lançamentos**: filtros por categoria (Todos / Fantasia / Ficção Científica / Jogos / Personalizados) + grid de produtos (`variant="dark"`).

### Processo (`/processo`)
Lista de 8 etapas de produção (preparação → impressão 3D → lixamento → primer → pintura → acabamento → inspeção) + imagem do artesão.

### Contato (`/contato`)
Formulário de encomenda personalizada: nome, e-mail, WhatsApp, descrição da ideia, upload de imagem de referência.

### Seções globais (renderizadas em toda página via `App.tsx`)
`ReviewsSection`, `InstagramGrid`, `Newsletter`, `Footer`, `CartDrawer` (carrinho lateral com cupom `SAVE10`).

## Design Tokens
- **Cores**: fundo `#F2F2F0`, texto `#111111`, fundo escuro `#111111`/`#1A1A1A`, destaque `#B6FF1A`, texto secundário `#686868`/`#8A8A86`, bordas `#D8D8D5`.
- **Tipografia**: Inter (400–900). Headlines: `font-weight: 900`, `letter-spacing: -0.02em`, `text-transform: uppercase`, tamanhos fluidos via `clamp()`.
- **Espaçamento**: seções com `padding: 120px 56px` (desktop), grids com `gap` de 2px (imagens) a 48px (cards de texto).
- **Hover de card**: elevação `-8px`, escala `1.01`, glow radial `#B6FF1A` a 30% opacidade, zoom de imagem `1.045`.

## Interações & Comportamento
- Header: fica translúcido/blur após 40px de scroll; menu mobile em overlay abaixo de 900px.
- Carrinho: drawer lateral, incrementa/decrementa quantidade, cupom `SAVE10` aplica 10% de desconto.
- Filtros de coleção: client-side, sem reload.
- Formulário de contato e newsletter: chamam stubs em `services/api.ts` — plugar no backend real.
- `prefers-reduced-motion`: qualquer parallax/hover elaborado deve ser suprimido (a versão DC original já trata isso; ao portar para produção, replicar via CSS media query, como em `global.css`).

## State Management
- `cart: CartLine[]` e `cartOpen: boolean` vivem em `App.tsx` (candidatos a Context/Zustand se crescer).
- Cada page busca seus próprios produtos via `services/api.ts` (atualmente mock; troque por chamadas reais).
- Formulários usam estado local nos respectivos `handler.ts`.

## Assets
Imagens e vídeo do protótipo (renders de personagens, logos e vídeo do hero) ficam em `public/assets/img` e `public/assets/video`, mantendo os nomes referenciados em `data/products.ts` e nos componentes (`/assets/img/1.png`, `/assets/video/hero-video.mp4`, etc.).

## Arquivos de referência
- `Save Point3D.dc.html` — protótipo original completo (HTML/React de design), única fonte visual definitiva para qualquer detalhe não descrito aqui.
