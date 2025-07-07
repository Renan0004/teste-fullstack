# Controle de Ponto - Teste Técnico Ilumeo

Este é um sistema de controle de ponto desenvolvido como parte de um teste técnico para a Ilumeo. O sistema permite que os usuários registrem entradas e saídas, visualizem o tempo trabalhado no dia atual e consultem registros de dias anteriores.

## Tecnologias Utilizadas

### Backend
- Node.js com TypeScript
- Express
- TypeORM
- PostgreSQL
- Jest para testes

### Frontend
- React com TypeScript
- Styled Components
- Axios
- React Router

## Estrutura do Projeto

```
teste-fullstack/
├── backend/           # API Node.js
├── frontend/          # Aplicação React
└── docker-compose.yml # Configuração Docker
```

## Como Executar Localmente

### Pré-requisitos
- Node.js (v14 ou superior)
- PostgreSQL
- Docker e Docker Compose (opcional)

### Usando Docker
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/teste-fullstack.git
cd teste-fullstack
```

2. Inicie os containers:
```bash
docker-compose up
```

3. Acesse a aplicação em `http://localhost:3000`

### Sem Docker

#### Backend
1. Configure o banco de dados PostgreSQL
2. Entre na pasta do backend:
```bash
cd backend
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente (crie um arquivo `.env`):
```
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ponto_ilumeo
```

5. Inicie o servidor:
```bash
npm run dev
```

#### Frontend
1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (crie um arquivo `.env`):
```
REACT_APP_API_URL=http://localhost:3001/api
```

4. Inicie a aplicação:
```bash
npm start
```

5. Acesse a aplicação em `http://localhost:3000`

## Deploy

### Backend (Render)
1. Crie uma conta no [Render](https://render.com)
2. Conecte seu repositório GitHub
3. Crie um novo Web Service com as seguintes configurações:
   - Build Command: `cd backend && npm install && npm run build`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Configure as variáveis de ambiente necessárias

### Frontend (Vercel)
1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Importe o projeto com as seguintes configurações:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Environment Variables: Configure `REACT_APP_API_URL` para apontar para o backend em produção

## Funcionalidades

- Login com código de usuário
- Registro de entrada e saída
- Visualização do tempo trabalhado em tempo real
- Histórico de registros anteriores

## Testes

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Autor

Seu Nome

## Licença

Este projeto está sob a licença MIT. 