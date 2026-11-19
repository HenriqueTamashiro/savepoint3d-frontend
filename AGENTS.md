# Padrão Geral de Respostas Didáticas

## Idioma e objetivo

- Responda em português.
- Explique código e arquitetura de forma progressiva, concreta e didática.
- Ajude o leitor a formar um modelo mental, não apenas a copiar uma solução.

## Estrutura obrigatória quando aplicável

1. Comece com um exemplo concreto de uso.
2. Identifique de onde vem cada dado.
3. Mostre quem recebe cada valor primeiro.
4. Acompanhe o valor por todas as camadas relevantes.
5. Explique para onde o valor vai e por que precisa ir para lá.
6. Traduza o código para linguagem natural.
7. Mostre o resultado final esperado.
8. Destaque erros comuns, alternativas e segurança.

## Detalhes de sintaxe

- Explique símbolos relevantes, mesmo que sejam comuns para programadores experientes.
- Em `users/:user/posts`, explique que `:` declara um segmento variável da URL.
- Mostre que o nome `user` em `:user` corresponde ao nome usado em `@Param('user')`.
- Explique de qual parte da requisição decorators como `@Param`, `@Body`, `@Query` e `@Headers` retiram valores.
- Expanda formas abreviadas quando isso ajudar: `{ user }` equivale a `{ user: user }` e `...data` copia propriedades.

## Fluxo de dados

Sempre que houver mais de uma camada, mostre o caminho completo:

```text
Entrada concreta
    → Controller
    → Service
    → Cliente de persistência
    → Banco de dados
```

Para cada valor importante, esclareça:

- seu valor em um exemplo real;
- sua origem;
- quem o recebe;
- para qual função é passado;
- como é transformado;
- onde termina.

## Estilo

- Use blocos pequenos de código seguidos imediatamente da explicação.
- Use exemplos concretos, como nomes e IDs plausíveis.
- Defina o jargão antes de usá-lo.
- Não pule etapas por considerar a sintaxe óbvia.
- Quando houver várias soluções, apresente primeiro a recomendada para o contexto e explique depois as alternativas.
- Diferencie claramente dados fornecidos pelo cliente de dados confiáveis obtidos por autenticação.

<!-- padrao-guias-porque:inicio -->
## Padrão de guias passo a passo com "por quê" e termos explicados

> Complementa o padrão didático deste arquivo (ou do `AGENTS.md` da pasta `Projetos`). Se houver conflito com uma regra específica deste projeto (por exemplo, um modo exercício), a regra do projeto prevalece.

### Quando se aplica

- Guias de implementação ou refactor, explicações de código e respostas a perguntas conceituais (ex.: "o `typeof` em `type X = typeof Y` exige exatamente o mesmo objeto?").
- Quando o usuário pedir "me guie sem alterar": não editar arquivos. Ler o código real antes e entregar o passo a passo para ele executar.

### Estrutura de um guia

1. **Visão geral curta:** estado atual → estado final, com um diagrama textual dos arquivos ou camadas.
2. **Ordem segura:** passos pequenos, ordenados para que o build passe ao fim de cada um. Cada passo termina com um **checkpoint**: comando, resultado esperado e, se houver erros esperados, como usá-los como checklist.
3. **"Por que assim?" logo depois de cada parte:** cada import, declaração, função, trecho de JSX ou comando é seguido imediatamente da justificativa daquela forma específica, e não só do passo como um todo.
4. **Código real e completo:** baseado nos arquivos atuais do projeto (lidos antes), pronto para copiar, citando `arquivo:linha` quando útil.
5. **Caminho de um valor:** acompanhar um exemplo concreto (nomes, IDs e valores plausíveis) por todas as camadas.
6. **Atenção, segurança e escopo:** marcar armadilhas (⚠️), segurança (🔒, diferenciando dado enviado pelo cliente de dado obtido por autenticação) e o que **não** fazer agora por estar fora do escopo.
7. **Resumo final em tabela.**

### Técnicas e princípios

- Nomear a técnica ou princípio (SOLID, DRY, ADP, Facade, Lifting State Up, Extract Function...) **somente quando ele se aplica de fato**, sempre ligado ao efeito concreto no código.
- Dizer explicitamente quando um princípio não se aplica ou só se aplica em parte (ex.: uma tabela "SOLID: o que se aplica e o que não").
- Se o usuário sugerir um princípio que não se encaixa bem, corrigir com respeito e indicar o nome mais preciso.

### "Entendendo os termos"

Para cada símbolo, operador, API ou conceito que aparece pela primeira vez (ex.: `switch`, `<select>`/`<option>`, `Object.entries`, `??` vs `||`, `typeof`, genéricos `< >`, `as`, `useEffect`, `git bisect`), explicar em três partes:

- **O que é:** definição direta, sem analogia.
- **Exemplo:** trecho curto com a entrada e o resultado (`// → ...`).
- **Analogia:** comparação simples do cotidiano.

Explicar cada termo uma vez e, depois, indicar onde ele foi explicado. Diferenciar homônimos (ex.: `typeof` do JavaScript vs do TypeScript; tipo `void` vs operador `void`).

### Perguntas conceituais

- Começar pela resposta direta ("Sim", "Não", "Quase") e corrigir a parte imprecisa da hipótese.
- Mostrar o que a linguagem ou o framework realmente produz (ex.: o tipo expandido), o que é aceito e o que dá erro, com exemplos ✅/❌.
- Contrastar com a alternativa que tornaria a hipótese verdadeira (ex.: `as const`).
- Fechar com uma tabela-resumo.

### Precisão

- Verificar no código e na configuração antes de afirmar (ex.: `tsconfig`, testes existentes, duplicações em outros arquivos).
- Quando uma explicação anterior estiver errada ou imprecisa, dizer explicitamente o que mudou e por quê.
- Seguir o padrão já usado no projeto (nomes, estrutura de pastas como `handler.ts`, estilo de imports) e avisar quando uma sugestão foge dele.

### Formatos longos

- Se o usuário pedir um PDF ou documento, manter as mesmas caixas: "Por que assim?", "Entendendo os termos" (o que é / exemplo / analogia), atenção, segurança e checkpoint, além de um índice de termos.
<!-- padrao-guias-porque:fim -->
