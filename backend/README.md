# Backend do Sistema de Controle de Ponto

Olá! Este é o backend do nosso sistema de controle de ponto, desenvolvido com Node.js, Express e TypeScript. Aqui você encontrará todas as informações necessárias para entender, executar e contribuir com a API do projeto.

## O Que Este Backend Oferece?

Esta API fornece:

- **Autenticação simplificada**: Login com código de usuário
- **Registro de ponto**: Endpoints para registrar entrada e saída
- **Consulta de histórico**: Acesso aos registros de ponto anteriores
- **Cálculo automático**: Contabilização do tempo trabalhado
- **Arquitetura robusta**: Código organizado seguindo princípios SOLID

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **Express**: Framework para criação de APIs
- **TypeORM**: ORM para acesso ao banco de dados
- **PostgreSQL**: Banco de dados relacional
- **Jest**: Framework para testes automatizados
- **ESLint e Prettier**: Ferramentas para padronização de código

## Como Executar

### Usando NPM

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com:
```
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ponto_ilumeo
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. A API estará disponível em `http://localhost:3001`

### Comandos Disponíveis

- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento com hot-reload
- **`npm start`**: Inicia o servidor em modo de produção
- **`npm run build`**: Compila o TypeScript para JavaScript
- **`npm test`**: Executa os testes
- **`npm run lint`**: Verifica problemas de código
- **`npm run lint:fix`**: Corrige problemas de código automaticamente
- **`npm run typeorm`**: Executa comandos do TypeORM (migrações, etc.)

## Estrutura de Arquivos

```
backend/
├── src/
│   ├── config/        # Configurações (banco de dados, etc.)
│   │   └── database.ts
│   ├── controllers/   # Controladores da API
│   │   └── TimeRecordController.ts
│   ├── middlewares/   # Middlewares do Express
│   ├── migrations/    # Migrações do banco de dados
│   ├── models/        # Modelos/Entidades
│   │   ├── TimeRecord.ts
│   │   └── User.ts
│   ├── repositories/  # Repositórios para acesso ao banco
│   │   ├── TimeRecordRepository.ts
│   │   └── UserRepository.ts
│   ├── routes/        # Rotas da API
│   │   └── timeRecords.ts
│   ├── services/      # Serviços com lógica de negócio
│   │   └── TimeRecordService.ts
│   └── server.ts      # Ponto de entrada da aplicação
├── __tests__/         # Testes automatizados
│   ├── controllers/
│   └── services/
└── package.json       # Dependências e scripts
```

## Endpoints da API

### Autenticação e Usuários

- **POST /api/time-records/entry**
  - Registra entrada de um usuário
  - Body: `{ "userCode": "12345" }`

- **POST /api/time-records/exit**
  - Registra saída de um usuário
  - Body: `{ "userCode": "12345" }`

- **GET /api/time-records/users/:userCode/current**
  - Obtém o registro atual do usuário
  - Parâmetro: userCode

- **GET /api/time-records/users/:userCode/history**
  - Obtém o histórico de registros do usuário
  - Parâmetro: userCode

## Banco de Dados

O projeto utiliza PostgreSQL com TypeORM para persistência de dados. As migrações são executadas automaticamente ao iniciar o servidor.

### Modelos Principais

- **User**: Representa um usuário do sistema
- **TimeRecord**: Representa um registro de ponto (entrada/saída)

## Testes

Os testes estão organizados na pasta `__tests__` e seguem a mesma estrutura do código-fonte.

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## Fluxo de Desenvolvimento

1. **Entenda o código**: Familiarize-se com a estrutura e padrões
2. **Faça alterações**: Modifique ou crie novos endpoints conforme necessário
3. **Teste localmente**: Verifique se tudo funciona como esperado
4. **Escreva testes**: Adicione testes para novas funcionalidades
5. **Mantenha o padrão**: Siga as convenções de código do projeto

## Dicas Úteis

- Use o Insomnia ou Postman para testar os endpoints manualmente
- Consulte os logs do servidor para depuração
- Verifique as migrações antes de fazer alterações no banco de dados
- Mantenha os princípios SOLID em mente ao desenvolver novas funcionalidades
- Documente novos endpoints ou alterações significativas

## Contribuição

Sua contribuição é muito bem-vinda! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b minha-nova-feature`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin minha-nova-feature`)
5. Crie um Pull Request

---

Desenvolvido com ❤️ e muito café! 