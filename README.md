# Sistema de Controle de Ponto

Olá! Este é um sistema de controle de ponto desenvolvido como parte de um teste técnico. O projeto permite que os usuários registrem suas entradas e saídas, visualizem o tempo trabalhado no dia atual e consultem o histórico de registros anteriores.

## Sobre o Projeto

Este sistema foi criado pensando na simplicidade e eficiência. Ele possui:

- **Interface amigável**: Design intuitivo e responsivo para facilitar o uso
- **Registro de ponto**: Marcação de entrada e saída com apenas um clique
- **Acompanhamento em tempo real**: Visualização do tempo trabalhado no dia atual
- **Histórico completo**: Consulta aos registros de dias anteriores
- **Autenticação simples**: Acesso rápido usando apenas um código de usuário

## Tecnologias Utilizadas

### Backend
- Node.js com TypeScript
- Express para criação da API
- TypeORM para comunicação com o banco de dados
- PostgreSQL como banco de dados
- Jest para testes automatizados
- ESLint e Prettier para manter o código organizado

### Frontend
- React com TypeScript
- Styled Components para estilização
- Axios para comunicação com a API
- React Router para navegação
- React Toastify para notificações
- ESLint e Prettier para padronização do código

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 14 ou superior)
- Docker e Docker Compose (recomendado)
- PostgreSQL (caso não use Docker)

### Usando Docker (Maneira Mais Fácil)

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/teste-fullstack.git
cd teste-fullstack
```

2. Inicie os containers:
```bash
docker-compose up -d
```

3. Pronto! Acesse a aplicação em `http://localhost:3000`

4. Para visualizar os logs:
```bash
# Todos os serviços
docker-compose logs -f

# Apenas um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

5. Para parar os containers:
```bash
docker-compose down
```

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

4. Crie um arquivo `.env` com as seguintes variáveis:
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

3. Crie um arquivo `.env` com:
```
REACT_APP_API_URL=http://localhost:3001/api
```

4. Inicie a aplicação:
```bash
npm start
```

5. Acesse a aplicação em `http://localhost:3000`

## Como Usar o Sistema

1. **Login**: Na tela inicial, digite qualquer código de usuário (ex: "12345")
2. **Registrar Ponto**: Clique no botão para registrar entrada ou saída
3. **Visualizar Tempo**: Acompanhe o tempo trabalhado no dia atual
4. **Consultar Histórico**: Veja os registros de pontos anteriores
5. **Logout**: Clique no botão de sair para encerrar a sessão

## Executando Testes

### Backend
```bash
# Na pasta do backend
cd backend

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

### Frontend
```bash
# Na pasta do frontend
cd frontend

# Executar todos os testes
npm test

# Executar testes com cobertura
npm test -- --coverage
```

## Estrutura do Projeto

```
teste-fullstack/
├── backend/           # API Node.js
│   ├── src/
│   │   ├── config/    # Configurações
│   │   ├── controllers/ # Controladores
│   │   ├── middlewares/ # Middlewares
│   │   ├── migrations/  # Migrações do banco
│   │   ├── models/    # Modelos/Entidades
│   │   ├── repositories/ # Repositórios
│   │   ├── routes/    # Rotas da API
│   │   ├── services/  # Serviços
│   │   └── server.ts  # Ponto de entrada
│   └── __tests__/     # Testes
├── frontend/          # Aplicação React
│   ├── src/
│   │   ├── assets/    # Recursos estáticos
│   │   ├── components/ # Componentes React
│   │   ├── pages/     # Páginas
│   │   ├── services/  # Serviços (API)
│   │   ├── styles/    # Estilos globais
│   │   └── types/     # Definições de tipos
└── docker-compose.yml # Configuração Docker
```

## Decisões Técnicas

- **TypeScript**: Escolhido para garantir maior segurança e melhor documentação do código
- **Docker**: Facilita a configuração do ambiente de desenvolvimento
- **Arquitetura em camadas**: Torna o código mais organizado e facilita a manutenção
- **Testes automatizados**: Garantem a qualidade e estabilidade do código
- **Design responsivo**: Interface adaptável a diferentes dispositivos

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Você pode:

1. Fazer um fork do repositório
2. Criar uma branch para sua feature (`git checkout -b minha-nova-feature`)
3. Fazer commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Fazer push para a branch (`git push origin minha-nova-feature`)
5. Criar um Pull Request

## Contato

Se tiver dúvidas ou sugestões, entre em contato!

---

Desenvolvido com ❤️ por [Seu Nome] 