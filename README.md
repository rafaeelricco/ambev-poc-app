  <img src="https://res.cloudinary.com/dnqiosdb6/image/upload/v1730922045/Group_2_hl9yb7.png" alt="leilao-mais-admin">

## Sobre o projeto

O **Leilão Mais** é uma solução abrangente para administração e gerenciamento de leilões, projetada para simplificar e otimizar todos os processos envolvidos no ciclo de vida de um leilão. A plataforma oferece uma experiência intuitiva através de quatro módulos principais que trabalham em harmonia:

O Dashboard proporciona uma visão estratégica e em tempo real do status dos leilões. O Módulo de Leilões centraliza toda a gestão de leilões e lotes, incluindo cadastros, edições e geração de documentos. O Módulo de Operações facilita o acompanhamento e execução das transações, enquanto o módulo de Prestação de Leilões garante um controle financeiro eficiente e transparente.

Com recursos avançados de importação e exportação de dados, gestão de proprietários e arrematantes, e um sistema robusto de acompanhamento de status, o Leilão Mais é a ferramenta ideal para profissionais que buscam eficiência e controle em suas operações de leilão.

## Configuração do ambiente

### 1. Pré-requisitos

**a. Instalação de dependências**

Certifique-se de ter instalado em sua máquina:

-  Node.js (versão 18 ou superior)
-  PNPM (versão 8 ou superior)
-  Git

**b. Variáveis de ambiente**

Configure as variáveis de ambiente necessárias:

```bash
cp .env.example .env
```

### 2. Configuração do projeto

**a. Clone do repositório**

Clone o repositório e acesse o diretório do projeto:

```bash
git clone https://github.com/FoxInspire/leilao-mais-frontend.git
cd leilao-mais-frontend
```

**b. Instalação das dependências**

Instale todas as dependências do projeto utilizando o PNPM:

```bash
pnpm i
```

### 3. Executando o projeto

**a. Ambiente de desenvolvimento**

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

O aplicativo estará disponível em [http://localhost:3000](http://localhost:3000)

**b. Ambiente de produção**

Para build de produção:

```bash
pnpm build && pnpm start
```

### 4. Testes

**a. Comandos básicos do playwright**

Executar todos os testes:

```bash
npx playwright test
```

Executar testes em modo debug:

```bash
npx playwright test --debug
```

Executar testes com interface visual:

```bash
npx playwright test --ui
```

**b. Linting**

Para executar o linter:

```bash
pnpm lint
```

[Saiba mais sobre os comandos do Playwright](https://playwright.dev/docs/test-cli)
