# Ponto Ilumeo - Sistema de Controle de Ponto

Este projeto é um sistema de controle de ponto para colaboradores, permitindo o registro de entrada e saída, visualização das horas trabalhadas no dia atual e histórico de dias anteriores.

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
- React Router
- Axios
- Testing Library para testes

### Infraestrutura
- Docker e Docker Compose

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- **backend**: API REST desenvolvida com Node.js, Express e TypeORM
- **frontend**: Interface de usuário desenvolvida com React

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Docker e Docker Compose (para execução com containers)
- PostgreSQL (caso não use Docker)

## Executando o Projeto com Docker

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ponto-ilumeo.git
cd ponto-ilumeo
```

2. Inicie os containers com Docker Compose:
```bash
docker-compose up -d
```

3. Acesse a aplicação:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Executando o Projeto Localmente

### Backend

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no `.env.example`
   - Configure as credenciais do banco de dados

4. Execute as migrações do banco de dados:
```bash
npm run typeorm migration:run
```

5. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

### Frontend

1. Navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no `.env.example` (se necessário)
   - Configure a URL da API (por padrão: http://localhost:3001/api)

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

5. Acesse a aplicação em http://localhost:3000

## Executando os Testes

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

## Funcionalidades

- **Login**: Acesso com código de usuário
- **Dashboard**: Visualização das horas trabalhadas no dia atual
- **Registro de Ponto**: Botões para registrar entrada e saída
- **Histórico**: Visualização dos registros de dias anteriores

## Arquitetura

O projeto segue os princípios SOLID e utiliza uma arquitetura em camadas:

### Backend
- **Controllers**: Responsáveis por receber as requisições e retornar as respostas
- **Services**: Implementam a lógica de negócio
- **Repositories**: Gerenciam o acesso aos dados
- **Models**: Definem as entidades do sistema

### Frontend
- **Pages**: Componentes de página
- **Components**: Componentes reutilizáveis
- **Services**: Comunicação com a API
- **Styles**: Estilos globais e temas
- **Types**: Definição de tipos e interfaces

## Melhorias Futuras

- Implementação de autenticação mais robusta
- Dashboard com gráficos e estatísticas
- Exportação de relatórios
- Notificações para lembrar de registrar o ponto 