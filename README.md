# Projeto Fullstack Playlist Viewer

Este projeto é uma aplicação fullstack que utiliza **Next.js** no frontend e **Python** no backend.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em seu sistema:

- [Git](https://git-scm.com)
- [Node.js > 18](https://nodejs.org/en/) (que inclui [npm](http://npmjs.com))
- [Python](https://www.python.org/downloads/) (com pip para gerenciar pacotes)
- [Docker](https://docker.com/) (não obrigatório, mas é recomendado e facilita a montagem do ambiente)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/) (para facilitar o uso de comandos)

Além disso, é recomendado utilizar um editor de código, como [VSCode](https://code.visualstudio.com/).

## Configuração

Este projeto requer uma chave de API do YouTube para funcionar. Adicione sua chave de API ao arquivo `.env` na raiz do projeto como exemplificado no arquivo `.env.example`

### Subindo o Frontend (Next.js)


## Instalação

### Clonando o Repositório

Para iniciar o projeto, clone o repositório para um diretório de sua escolha:

```bash
git clone https://github.com/Ferbmp/youtube-challenge
cd youtube-challenge
```

1. Navegue até o diretório do frontend:

   ```bash
   cd view
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O frontend estará disponível no endereço: `http://localhost:3000`.

### Subindo o Backend (Python)

1. Navegue até o diretório do backend:

   ```bash
   cd backend
   ```

2. Crie um ambiente virtual (opcional, mas recomendado):

   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows use: venv\Scripts\activate
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

4. Inicie o servidor:
   ```bash
   python run.py
   ```

O backend estará disponível no endereço: `http://localhost:5000`.

### Usando Docker (recomendado)

Para construir as imagens Docker:

```bash
make build
```

Para iniciar a aplicação (backend e frontend) sem rodar o seed de dados:

```bash
make up
```

Para iniciar a aplicação com a execução do seed de dados:

```bash
make up-seed
```

Para parar a aplicação:

```bash
make down
```

## Estrutura do Projeto

- **view/**: Diretório que contém o frontend da aplicação (Next.js).
- **server/**: Diretório que contém o backend da aplicação (Python).
- **docker-compose.yml**: Arquivo de configuração para os serviços Docker.
- **Makefile**: Facilita a execução de comandos frequentes como `build`, `up`, `down` e `up-seed`.
