# Contexto do Frontend Save Point3D para Agentes

Este documento é a fonte operacional para agentes que precisem entender, manter ou evoluir o frontend da Save Point3D. Ele descreve o estado atual do código, não apenas a intenção original do projeto.

> Importante: o `README.md` original está parcialmente desatualizado. Ele ainda menciona `global.css`, dados exclusivamente mockados e uma API inteiramente stub. Use este arquivo e o código como referência principal.

## 1. Visão geral

Aplicação React para a Save Point3D, combinando:

- site institucional;
- catálogo de colecionáveis impressos em 3D;
- carrinho e checkout;
- cadastro e login;
- área do cliente e histórico de pedidos;
- área administrativa com CMS visual e preview em tempo real.

O idioma da interface é português do Brasil. A identidade visual usa fundo claro, grandes áreas escuras, títulos em caixa alta e verde-limão como cor de destaque.

## 2. Localização e repositórios relacionados

- Frontend: `C:\Users\henri\Documentos\Projetos\savepoint3d-frontend`
- Backend relacionado: `C:\Users\henri\Documentos\Projetos\portfolio-cms`
- Repositório remoto do frontend: `git@github.com:HenriqueTamashiro/savepoint3d-frontend.git`
- Branch observada ao criar este documento: `main`

O frontend depende do backend para produtos, posts, autenticação, pedidos e uploads administrativos.

## 3. Stack e versões

- React `19.2.8`
- React DOM `19.2.8`
- TypeScript `6.0.3`, com modo estrito
- Vite `8.2.0`
- React Router DOM `^7.11.0`
- styled-components `^6.5.3`
- CSS Modules para a maior parte dos estilos
- ESLint `10.8.0`
- Node usado no workflow: `24`

Não há biblioteca externa de estado global, formulários, ícones ou requisições. O projeto usa hooks do React, `fetch`, SVG inline e `localStorage`.

## 4. Comandos

Instalação reproduzível:

```bash
npm ci
```

Desenvolvimento:

```bash
npm run dev
```

Validação obrigatória depois de alterações:

```bash
npm run lint
npm run build
```

Preview da build:

```bash
npm run preview
```

Não existe suíte automatizada de testes no frontend neste momento. `build` executa `tsc -b` antes do Vite e é a principal validação de tipos.

## 5. Configuração local e comunicação com a API

O Vite define dois proxies em `vite.config.ts`:

| Caminho no frontend | Destino local | Comportamento |
|---|---|---|
| `/api/*` | `http://localhost:3001` | remove o prefixo `/api` |
| `/uploads/*` | `http://localhost:3001` | preserva o caminho |

Exemplo: `/api/auth/login` chega ao backend como `/auth/login`.

Não há arquivo `.env` usado pelo frontend atualmente. Em produção, a aplicação pressupõe mesma origem: o servidor web/reverse proxy deve encaminhar `/api` e `/uploads` ao backend. Se isso não estiver configurado, o site estático abre, mas dados, autenticação e imagens enviadas falham.

## 6. Inicialização e providers

Entrada: `src/main.tsx`.

A árvore raiz é:

```text
StrictMode
└── ThemeProvider
    ├── GlobalStyles
    └── App
```

`GlobalStyles.ts` substitui o antigo `global.css`, configura reset básico, tipografia, variáveis CSS e `prefers-reduced-motion`.

## 7. Rotas

As rotas são declaradas em `src/App.tsx` com `BrowserRouter`.

| Rota | Componente | Proteção |
|---|---|---|
| `/` | `Home` | pública |
| `/personalizados` | `Personalizados` | pública |
| `/colecao` | `Colecao` | pública |
| `/processo` | `Processo` | pública |
| `/contato` | `Contato` | pública |
| `/login` | `Auth mode="login"` | pública |
| `/cadastro` | `Auth mode="register"` | pública |
| `/checkout` | `Checkout` | usuário autenticado |
| `/minha-conta` | `Account` | usuário autenticado |
| `/dashboard` | `Account initialTab="admin"` | somente papel `ADMIN` |

Header, footer, avaliações, Instagram, newsletter e carrinho são ocultados nas superfícies privadas: dashboard, conta, checkout, login e cadastro.

## 8. Organização do código

```text
src/
├── App.tsx                 # rotas, produtos e estado global do carrinho
├── main.tsx                # montagem, tema e estilos globais
├── components/             # componentes reutilizáveis
├── pages/                  # páginas e handlers específicos
├── services/               # API, autenticação e pedidos
├── style/                  # tema, estilos globais e CSS Modules
├── types/                  # contratos TypeScript
└── data/products.ts        # catálogo legado, atualmente não importado
```

O padrão predominante é:

- `index.tsx`: renderização e composição visual;
- `handler.ts`: hooks, estado, efeitos e regras de interação;
- `*.module.css` ou agregador `style/.../index.ts`: estilos.

Nem todos os componentes seguem perfeitamente essa separação. Evite refatorações amplas sem necessidade.

## 9. Estado global e fluxo de produtos

`App.tsx` mantém:

- `cart: CartLine[]`;
- `products: Product[]`;
- `couponCode: string`;
- `cartOpen: boolean`.

No carregamento, `fetchProducts()` consulta `GET /api/items`. O carrinho é recuperado e persistido na chave:

```text
savepoint3d:cart
```

Cada linha guarda somente `id` e `qty`. Depois da consulta de produtos, linhas cujos produtos não existem mais são removidas.

Regras atuais:

- produto com `stock === 0` não entra no carrinho;
- quantidade não ultrapassa estoque numérico;
- `stock === null` representa disponibilidade sem limite fixo/sob encomenda;
- decrementar nunca reduz abaixo de `1`;
- remover exclui a linha completamente.

## 10. Produtos e catálogo

Tipos em `src/types/product.ts`:

- `ApiProduct`: preço recebido como `string`;
- `Product`: preço normalizado para `number`;
- `CartLine`: `{ id, qty }`;
- `ItemLocation`: `FEATURED | CATEGORIES | CUSTOM`.

`fetchProducts(category?)`:

- chama `GET /api/items`;
- aceita query `category`;
- converte `price` para número;
- lança erro se o preço não for finito.

Uso por localização:

- `FEATURED`: destaques da home;
- o restante pode aparecer em coleção e Colecionáveis Premium;
- `src/data/products.ts` é legado e atualmente não é importado.

O componente `PremiumCollection` usa carrossel horizontal. As imagens possuem frame padronizado em proporção `1122 / 1402` e `object-fit: cover` em `PremiumCard.module.css`.

## 11. Posts e conteúdo institucional

Contrato em `src/types/post.ts`:

```ts
enum PostType {
  FIGURE,
  ARTICLE,
  VIDEO,
  PROJECT,
  PRODUCT,
  CATEGORY,
}
```

Campos relevantes de `Post`:

- `id`, `authorId`;
- `title`, `content`;
- `type`, `tag`;
- `imageUrl`, `url`;
- `show`.

`fetchPost({ type?, category? })` chama `GET /api/posts`, usando `type` e `category` como query params.

Na home, `postManager()`:

1. ignora posts com `show === false`;
2. agrupa o restante por `PostType`.

Mapeamento usado pelo CMS:

| Seção | Type | Tag |
|---|---|---|
| Hero principal | `VIDEO` | `HERO` |
| Personalizados | `ARTICLE` | `PERSONALIZADOS` |
| Figuras estilizadas | `FIGURE` | `FIGURAS` |
| Dioramas | `PROJECT` | `DIORAMA` |
| Processo | `PROJECT` | `PROCESSO` |

Ao buscar uma seção, o dashboard prioriza a combinação exata de `type + tag`. Como fallback, usa o único post daquele tipo, caso exista exatamente um.

## 12. Home

Arquivos principais:

- `src/pages/Home/index.tsx`
- `src/pages/Home/handler.ts`
- `src/style/pages/Home.module.css`

A home busca produtos e posts em paralelo e contém:

- hero em vídeo;
- destaques de produtos;
- categorias;
- personalizados;
- figuras estilizadas;
- Colecionáveis Premium;
- diorama;
- processo;
- lançamentos;
- contato;
- estatísticas.

Seleção do hero:

```text
primeiro VIDEO com tag HERO; fallback: primeiro VIDEO; fallback visual: conteúdo local
```

O carrossel de destaques usa `ResizeObserver`, posição de scroll e largura real do primeiro card.

## 13. Páginas públicas

### Personalizados

Recebe opcionalmente `article: Post[]`. Procura tag `PERSONALIZADOS`; sem dados, usa textos e imagem padrão. Quando acessada diretamente pela rota `/personalizados`, atualmente não busca a API e recebe array vazio, portanto mostra fallback local.

### Figuras estilizadas

`StyledFigures` recebe `figures: Post[]`, filtra pela tag `FIGURAS` e renderiza os posts correspondentes. É o principal componente convertido para styled-components.

### Coleção

- `DioramaSection` recebe opcionalmente projetos e procura tag `DIORAMA`;
- `LancamentosSection` busca produtos novamente e aplica filtros client-side;
- filtros atuais: todos, fantasia, ficção científica, jogos e personalizados.

Ao acessar `/colecao` diretamente, o diorama recebe array vazio e usa fallback local.

### Processo

Recebe opcionalmente projetos, procura tag `PROCESSO` e combina título/imagem do post com passos estáticos de `handler.ts`. Na rota direta usa fallback local.

### Contato

Mantém formulário e arquivo em estado local. `submitCustomRequest()` ainda é stub: apenas escreve no console e retorna sucesso.

### Newsletter

`subscribeNewsletter()` também é stub e retorna sucesso sem persistência.

## 14. Carrinho, cupom e checkout

O drawer calcula linhas combinando `CartLine` com os produtos carregados em `App`.

Cupom implementado no frontend:

```text
SAVE10 → 10% de desconto
```

`applyCoupon()` ainda é uma regra local em `services/api.ts`. No checkout, o código é enviado ao backend, que deve validar novamente preço, estoque e desconto. Nunca trate o total calculado no navegador como confiável.

`Checkout`:

- é protegido por `RequireAuth`;
- chama `POST /api/orders`;
- envia `{ items: [{ productId, quantity }], couponCode? }`;
- ao concluir, limpa carrinho/cupom;
- redireciona para `/minha-conta`, aba `orders`, com `orderCreated: true`.

## 15. Pedidos e área do cliente

Endpoints usados:

- `POST /api/orders`;
- `GET /api/orders/me`.

Ambos recebem `Authorization: Bearer <JWT>`.

Valores monetários vindos do backend são convertidos para `number` por `normalizeOrder()`.

Status suportados:

- `PENDING`;
- `CONFIRMED`;
- `PRODUCING`;
- `SHIPPED`;
- `DELIVERED`;
- `CANCELLED`.

A área da conta possui abas:

- visão geral;
- pedidos;
- favoritos;
- endereços;
- administração, somente para `ADMIN`.

Favoritos e endereços são apenas estados vazios visuais; ainda não possuem API ou persistência.

O menu da conta pode ser recolhido. Expandido, mostra ícone, número e título. Recolhido, mostra somente ícones com tooltip. Em telas pequenas o comportamento vira menu vertical compacto.

## 16. Autenticação e autorização

Serviço: `src/services/auth.ts`.

Endpoints:

- `POST /api/auth/register` com `{ user, password }`;
- `POST /api/auth/login` com `{ user, password }`;
- `GET /api/auth/me` com Bearer token.

Chave da sessão:

```text
savepoint3d:auth-session
```

Formato:

```ts
interface AuthSession {
  accessToken: string;
  user: string;
  role: string;
}
```

Fluxo:

1. login recebe `accessToken`;
2. frontend decodifica o payload para obter usuário, papel e expiração;
3. sessão é salva no `localStorage`;
4. `getAuthSession()` rejeita token malformado ou expirado;
5. `RequireAuth` chama `/auth/me` antes de renderizar a rota;
6. o backend continua sendo a barreira de segurança real.

Papéis são comparados sem diferenciar maiúsculas/minúsculas. Usuário não administrador que tenta abrir `/dashboard` é redirecionado para `/minha-conta`.

Cadastro exige no frontend:

- usuário com 3–30 caracteres;
- letras, números, `_` ou `-`;
- senha com pelo menos 8 caracteres;
- confirmação igual no cadastro.

### Observação de segurança

O JWT está em `localStorage`, portanto pode ser exposto em caso de XSS. Uma evolução recomendada para produção é usar cookie `HttpOnly`, `Secure` e `SameSite`, com estratégia apropriada de CSRF/refresh. Não remova os guards do backend supondo que `RequireAuth` seja suficiente.

## 17. Dashboard administrativo/CMS

Arquivos:

- `src/pages/Dashboard/index.tsx`;
- `src/pages/Dashboard/handler.ts`;
- `src/pages/Dashboard/AdminPanels.tsx`;
- `src/services/admin.ts`;
- `src/style/pages/Dashboard.module.css`.

Características:

- somente `ADMIN` acessa `/dashboard`;
- ao entrar pela conta, o CMS ocupa toda a tela;
- possui botão “Voltar”;
- menu de seções pode ser recolhido para uma faixa estreita;
- editor e preview ficam lado a lado;
- preview alterna entre desktop e mobile;
- aceita título, texto, URL da imagem, upload, URL do vídeo quando aplicável e visibilidade;
- salvar só acontece pelo botão, não por Enter;
- `Shift + Enter` pretende criar parágrafo duplo;
- imagens aceitas: JPEG, PNG, WebP e GIF, até 5 MB segundo a interface/backend;
- uploads usam `POST /api/uploads/images`;
- posts novos usam `POST /api/posts`;
- posts existentes usam `PATCH /api/posts/:id`.
- possui quatro áreas principais: layout/textos, produtos, usuários e pedidos;
- produtos permitem inclusão, edição, upload e remoção lógica do catálogo;
- usuários permitem alteração de nome, senha, papel, bloqueio e exclusão lógica;
- pedidos permitem alteração de status.

Posts padrão do editor possuem id `local-<section>`. Esse prefixo decide entre criação e atualização.

O botão “Restaurar” não desfaz uma alteração já publicada; ele busca novamente o conteúdo atual da API.

Títulos e textos do preview usam `white-space: pre-wrap`. As seções públicas relevantes também preservam quebras de linha.

`createParagraph()` recebe explicitamente o campo `title` ou `content`, preservando parágrafos no campo correto.

## 18. Contrato resumido da API

| Método | Endpoint frontend | Uso | Autorização |
|---|---|---|---|
| GET | `/api/items` | produtos | pública |
| GET | `/api/posts` | posts/CMS | leitura pública atual |
| POST | `/api/auth/register` | cadastro | pública |
| POST | `/api/auth/login` | login | pública |
| GET | `/api/auth/me` | validar sessão | JWT |
| POST | `/api/orders` | criar pedido | JWT |
| GET | `/api/orders/me` | pedidos do usuário | JWT |
| POST | `/api/posts` | criar conteúdo | JWT + ADMIN no backend |
| PATCH | `/api/posts/:id` | editar conteúdo | JWT + ADMIN no backend |
| POST | `/api/uploads/images` | upload | JWT + ADMIN no backend |
| GET/POST | `/api/admin/products` | listar/incluir produtos | JWT + ADMIN |
| PATCH/DELETE | `/api/admin/products/:id` | editar/remover produto | JWT + ADMIN |
| GET | `/api/admin/users` | listar usuários | JWT + ADMIN |
| PATCH/DELETE | `/api/admin/users/:id` | editar/bloquear/excluir usuário | JWT + ADMIN |
| GET | `/api/admin/orders` | listar todos os pedidos | JWT + ADMIN |
| PATCH | `/api/admin/orders/:id` | alterar status do pedido | JWT + ADMIN |

Erros do backend podem ter `message: string` ou `message: string[]`; os serviços normalizam os dois formatos.

## 19. Estilos e design system

Tema em `src/style/theme.ts`:

| Token | Valor |
|---|---|
| background | `#f2f2f0` |
| ink | `#111111` |
| inkSoft | `#1a1a1a` |
| accent | `#a7e918` |
| muted | `#686868` |
| mutedDark | `#8a8a86` |
| border | `#d8d8d5` |
| maxWidth | `1600px` |
| mobile | `700px` |
| tablet | `900px` |

O `ThemeProvider` também expõe esses valores como variáveis CSS em `GlobalStyles` para compatibilidade com CSS Modules.

Situação atual:

- `StyledFigures` usa styled-components;
- o restante usa majoritariamente CSS Modules;
- componentes com vários arquivos CSS usam um `index.ts` que mescla os módulos;
- não reintroduza `global.css`, pois ele foi substituído;
- preserve `prefers-reduced-motion`.

## 20. Assets

Arquivos públicos ficam em:

```text
public/assets/img
public/assets/video
```

Referências públicas começam com `/assets/...`.

Uploads administrativos retornam caminhos `/uploads/...` servidos pelo backend. O proxy do Vite encaminha esses caminhos no desenvolvimento.

Assets de fallback importantes:

- hero: `/assets/img/4.png` e `/assets/video/hero-video.mp4`;
- personalizados: `/assets/img/personalizados-hero.png`;
- figuras: `/assets/img/3.png`;
- diorama: `/assets/img/7.png`;
- processo: `/assets/img/processo-artesao.png`.

## 21. Deploy do frontend

Workflow: `.github/workflows/main.yml`.

Comportamento atual:

- dispara em push para `main`;
- usa concorrência `savepoint3d-frontend-production` e cancela execução anterior;
- usa Node 24;
- executa `npm ci` e `npm run build`;
- empacota somente `dist` em `savepoint3d-frontend.tgz`;
- envia para VM na GCP via SCP;
- extrai em staging;
- copia o conteúdo para `/var/www/savepoint3d`.

Secrets esperados:

- `VM_HOST`;
- `VM_USER`;
- `VM_SSH_KEY`.

O workflow não reinicia Nginx nem valida a URL publicada. Também copia sobre o diretório atual sem apagar assets antigos com hash; isso pode acumular arquivos em `/var/www/savepoint3d`.

## 22. Pontos incompletos e riscos conhecidos

Antes de assumir que uma funcionalidade está pronta, considere:

1. Contato e newsletter ainda são stubs.
2. Favoritos e endereços não têm persistência.
3. O cupom é validado localmente na UI; o backend deve ser autoritativo.
4. Rotas públicas individuais de personalizados/processo/diorama usam fallback em vez de buscar posts.
5. `useHomePage()` não captura falhas da carga paralela, podendo gerar rejection não tratada.
6. `useColecaoPage()` também não possui estado explícito de erro/loading.
7. JWT permanece em `localStorage`.
8. O dashboard lê os posts de layout pela rota pública; autorização é obrigatória nas mutações e deve continuar no backend.
9. Não existem testes automatizados.
10. `README.md` não representa integralmente o estado atual.
11. `src/data/products.ts` parece legado.

## 23. Convenções para futuras alterações

- Preserve TypeScript estrito e não use `any` sem justificativa.
- Use `PostType` e os tipos existentes em vez de strings duplicadas.
- Para conteúdo institucional, filtre por `type` e `tag`; não dependa apenas da posição do array.
- Nunca considere papel decodificado no cliente como autorização suficiente.
- Envie Bearer token nas operações protegidas enquanto a arquitetura atual permanecer.
- Não defina manualmente `Content-Type` ao enviar `FormData`.
- Normalize valores monetários vindos da API.
- Respeite estoque ao alterar carrinho.
- Preserve fallbacks de assets ao lidar com conteúdo opcional.
- Use `white-space: pre-wrap` onde títulos/textos editáveis precisam manter parágrafos.
- Salvar no CMS deve continuar sendo ação explícita de botão.
- Evite modificar arquivos gerados ou `dist` manualmente.
- Antes de entregar mudanças, execute lint e build.
- O worktree pode conter alterações do usuário: inspecione `git status` e não descarte mudanças alheias.

## 24. Checklist rápido para um agente

Ao iniciar uma tarefa:

1. Leia este arquivo e o código diretamente envolvido.
2. Execute `git status --short`.
3. Identifique se a tarefa envolve frontend, backend ou ambos.
4. Confirme o contrato real do endpoint no backend quando alterar integração.
5. Preserve a separação `index.tsx`/`handler.ts` quando fizer sentido.
6. Faça alterações localizadas.
7. Rode `npm run lint`.
8. Rode `npm run build`.
9. Para mudanças visuais, teste desktop e mobile quando houver navegador disponível.
10. Registre limitações que não foram resolvidas.

## 25. Arquivos de entrada por assunto

| Assunto | Começar por |
|---|---|
| Rotas/carrinho global | `src/App.tsx` |
| Inicialização/tema | `src/main.tsx`, `src/style/theme.ts`, `src/style/GlobalStyles.ts` |
| Produtos/posts/API | `src/services/api.ts` |
| Login/JWT | `src/services/auth.ts`, `src/components/RequireAuth/index.tsx` |
| Pedidos | `src/services/orders.ts`, `src/pages/Checkout/index.tsx`, `src/pages/Account/index.tsx` |
| CMS | `src/pages/Dashboard/index.tsx`, `src/pages/Dashboard/handler.ts` |
| Home | `src/pages/Home/index.tsx`, `src/pages/Home/handler.ts` |
| Catálogo | `src/pages/Colecao`, `src/components/ProductCard` |
| Carrinho | `src/components/CartDrawer`, `src/App.tsx` |
| Design/tokens | `src/style/theme.ts`, `src/style/GlobalStyles.ts` |
| Deploy | `.github/workflows/main.yml` |

Última atualização deste documento: 2026-08-15.
