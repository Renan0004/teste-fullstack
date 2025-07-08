# Controle de Ponto - Teste Técnico Ilumeo

Este é um sistema de controle de ponto desenvolvido como parte de um teste técnico para a Ilumeo. O sistema permite que os usuários registrem entradas e saídas, visualizem o tempo trabalhado no dia atual e consultem registros de dias anteriores.

## Links de Produção

- **Frontend**: [https://ponto-ilumeo-frontend.vercel.app](https://ponto-ilumeo-frontend.vercel.app)
- **Backend**: [https://ponto-ilumeo-backend.vercel.app](https://ponto-ilumeo-backend.vercel.app)

## Tecnologias Utilizadas

### Backend
- Node.js com TypeScript
- Express
- TypeORM
- PostgreSQL
- Jest para testes
- ESLint e Prettier para padronização de código

### Frontend
- React com TypeScript
- Styled Components
- Axios
- React Router
- React Toastify para notificações
- ESLint e Prettier para padronização de código

## Arquitetura do Projeto

### Backend
O backend segue uma arquitetura em camadas, respeitando os princípios SOLID:

1. **Controllers**: Responsáveis por receber as requisições HTTP e retornar respostas.
2. **Services**: Contêm a lógica de negócio da aplicação.
3. **Repositories**: Responsáveis pela comunicação com o banco de dados.
4. **Models**: Definem as entidades do sistema.
5. **Routes**: Definem as rotas da API.

### Frontend
O frontend segue uma arquitetura baseada em componentes:

1. **Components**: Componentes reutilizáveis da interface.
2. **Pages**: Páginas da aplicação.
3. **Services**: Serviços para comunicação com a API.
4. **Types**: Definição de tipos TypeScript.
5. **Styles**: Estilos globais e tema da aplicação.

## Funcionalidades

- **Login com código de usuário**: Autenticação simples usando código de usuário.
- **Registro de entrada e saída**: Permite registrar o início e fim da jornada de trabalho.
- **Visualização do tempo trabalhado em tempo real**: Cronômetro que mostra o tempo trabalhado no dia atual.
- **Histórico de registros anteriores**: Lista dos registros de ponto dos dias anteriores.
- **Notificações**: Feedback visual para ações do usuário.
- **Logout**: Possibilidade de sair do sistema.

## Estrutura do Projeto

```
teste-fullstack/
├── backend/           # API Node.js
│   ├── src/
│   │   ├── config/    # Configurações (banco de dados, etc.)
│   │   ├── controllers/ # Controladores da API
│   │   ├── middlewares/ # Middlewares Express
│   │   ├── migrations/  # Migrações do banco de dados
│   │   ├── models/    # Modelos/Entidades
│   │   ├── repositories/ # Repositórios para acesso ao banco
│   │   ├── routes/    # Rotas da API
│   │   ├── services/  # Serviços com lógica de negócio
│   │   └── server.ts  # Ponto de entrada da aplicação
│   ├── __tests__/     # Testes automatizados
│   └── ...
├── frontend/          # Aplicação React
│   ├── public/        # Arquivos públicos
│   ├── src/
│   │   ├── assets/    # Recursos estáticos
│   │   ├── components/ # Componentes React
│   │   ├── pages/     # Páginas da aplicação
│   │   ├── services/  # Serviços (API, etc.)
│   │   ├── styles/    # Estilos globais
│   │   └── types/     # Definições de tipos TypeScript
│   └── ...
└── docker-compose.yml # Configuração Docker
```

## Como Executar Localmente

### Pré-requisitos
- Node.js (v14 ou superior)
- PostgreSQL
- Docker e Docker Compose (opcional)

### Usando Docker (Recomendado)
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/teste-fullstack.git
cd teste-fullstack
```

2. Inicie os containers:
```bash
docker-compose up -d
```

3. Acesse a aplicação em `http://localhost:3000`

4. Para parar os containers:
```bash
docker-compose down
```

5. Para visualizar logs:
```bash
# Todos os serviços
docker-compose logs -f

# Serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
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

## Testes

### Backend
```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências (se ainda não tiver feito)
npm install

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch

# Executar testes específicos
npm test -- -t "nome do teste"
```

### Frontend
```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências (se ainda não tiver feito)
npm install

# Executar todos os testes
npm test

# Executar testes com cobertura
npm test -- --coverage

# Executar testes em modo watch
npm test -- --watch

# Executar testes específicos
npm test -- -t "nome do teste"
```

## Executando Testes com Docker

```bash
# Testes do backend
docker-compose exec backend npm test

# Testes do frontend
docker-compose exec frontend npm test
```

## Padrões de Código

Este projeto utiliza ESLint e Prettier para garantir a padronização do código. Para verificar e corrigir problemas de linting:

### Backend
```bash
cd backend
npm run lint      # Verifica problemas
npm run lint:fix  # Corrige problemas automaticamente
```

### Frontend
```bash
cd frontend
npm run lint      # Verifica problemas
npm run lint:fix  # Corrige problemas automaticamente
```

## Decisões Técnicas

### Backend
- **TypeORM**: Escolhido pela facilidade de uso com TypeScript e suporte a migrações.
- **Arquitetura em camadas**: Facilita a manutenção e testabilidade do código.
- **Repository Pattern**: Abstrai a lógica de acesso ao banco de dados.
- **Injeção de dependências**: Facilita os testes unitários.

### Frontend
- **Styled Components**: Permite estilização baseada em componentes com suporte a temas.
- **React Router**: Gerenciamento de rotas da aplicação.
- **Axios**: Cliente HTTP para comunicação com a API.
- **Design responsivo**: Interface adaptável a diferentes tamanhos de tela.
- **React Toastify**: Notificações para feedback ao usuário.

## Deploy

### Backend (Render)

1. Crie uma conta no [Render](https://render.com)
2. Conecte seu repositório GitHub ao Render
3. No dashboard do Render, clique em "New" e selecione "Blueprint"
4. Selecione seu repositório do GitHub
5. O Render detectará automaticamente o arquivo `render.yaml` e configurará o serviço
6. Revise as configurações e clique em "Apply"
7. O Render criará o banco de dados PostgreSQL e o serviço web automaticamente
8. Aguarde o deploy ser concluído
9. Anote a URL do seu backend (ex: `https://ponto-ilumeo-api.onrender.com`)

### Frontend (Vercel)

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub à Vercel
3. No dashboard da Vercel, clique em "Import Project"
4. Selecione "Import Git Repository" e escolha seu repositório
5. Configure o projeto:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Environment Variables: Configure `REACT_APP_API_URL` para apontar para o backend no Render (ex: `https://ponto-ilumeo-api.onrender.com/api`)
6. Clique em "Deploy"
7. Aguarde o deploy ser concluído
8. Seu frontend estará disponível em uma URL como `https://ponto-ilumeo.vercel.app`

### Atualizando a URL da API

Depois que o backend estiver implantado no Render, você precisará atualizar a URL da API no frontend:

1. Na Vercel, vá para o seu projeto
2. Clique em "Settings" > "Environment Variables"
3. Atualize a variável `REACT_APP_API_URL` com a URL correta do seu backend (ex: `https://ponto-ilumeo-api.onrender.com/api`)
4. Clique em "Save"
5. Redeploy o projeto para aplicar as alterações

### Verificando o Deploy

1. Acesse a URL do frontend fornecida pela Vercel
2. Tente fazer login com qualquer código de usuário
3. Verifique se consegue registrar entrada e saída
4. Verifique se os registros anteriores estão sendo exibidos corretamente

## Autor

Seu Nome

## Licença

Este projeto está sob a licença MIT. 