<div align="center">
  <img src="https://res.cloudinary.com/dnqiosdb6/image/upload/v1732109257/ppltxwywqextx3xjxidy.png" alt="brand-verify-system">
</div>

## Sobre o projeto

Esta é uma Prova de Conceito (POC) desenvolvida especialmente para a AMBEV, demonstrando as capacidades de um sistema avançado de análise e verificação de marcas. O projeto foi construído para atender às necessidades específicas da AMBEV no processo de proteção e monitoramento de seu extenso portfólio de marcas, incluindo Skol, Brahma, Antarctica, Stella Artois, entre outras.

A plataforma utiliza inteligência artificial para identificar potenciais conflitos entre marcas, oferecendo uma análise abrangente através de diferentes perspectivas:

-  Análise de similaridade fonética e visual focada no segmento de bebidas
-  Verificação de anterioridade marcária no mercado brasileiro
-  Avaliação de distintividade considerando o portfólio AMBEV
-  Análise de colidência em classes correlatas ao setor de bebidas
-  Verificação de conformidade com a legislação brasileira de marcas

Com recursos avançados de processamento de imagem e texto, integração com bases de dados oficiais e um sistema robusto de geração de relatórios, o Brand Verify visa otimizar o processo de proteção das marcas AMBEV no mercado nacional.

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
