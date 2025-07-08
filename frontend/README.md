# Frontend do Sistema de Controle de Ponto

Olá! Este é o frontend do nosso sistema de controle de ponto, desenvolvido com React e TypeScript. Aqui você encontrará todas as informações necessárias para entender, executar e contribuir com a interface do usuário do projeto.

## O Que Temos Aqui?

Este projeto frontend oferece:

- **Interface moderna e responsiva**: Design adaptável a diferentes dispositivos
- **Tema claro/escuro**: Opções de visualização para maior conforto
- **Componentes reutilizáveis**: Botões, inputs e cards padronizados
- **Navegação intuitiva**: Fluxo simples entre as páginas de login e dashboard
- **Feedback visual**: Notificações para ações do usuário

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **Styled Components**: CSS-in-JS para estilização de componentes
- **Axios**: Cliente HTTP para comunicação com a API
- **React Router**: Navegação entre páginas
- **React Toastify**: Sistema de notificações
- **Jest e Testing Library**: Framework para testes

## Como Executar

### Usando NPM

1. Instale as dependências:
```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto com:
```
REACT_APP_API_URL=http://localhost:3001/api
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse a aplicação em `http://localhost:3000`

### Comandos Disponíveis

- **`npm start`**: Inicia o servidor de desenvolvimento
- **`npm test`**: Executa os testes
- **`npm run build`**: Cria a versão de produção
- **`npm run lint`**: Verifica problemas de código
- **`npm run lint:fix`**: Corrige problemas de código automaticamente

## Estrutura de Arquivos

```
frontend/
├── public/           # Arquivos públicos
├── src/              # Código-fonte
│   ├── assets/       # Imagens e recursos estáticos
│   ├── components/   # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   └── TimeRecordCard.tsx
│   ├── pages/        # Páginas da aplicação
│   │   ├── Dashboard.tsx
│   │   └── Login.tsx
│   ├── services/     # Serviços e comunicação com API
│   │   └── api.ts
│   ├── styles/       # Estilos globais e temas
│   │   ├── globalStyles.ts
│   │   ├── ThemeContext.tsx
│   │   └── themes.ts
│   ├── types/        # Definições de tipos TypeScript
│   │   └── index.ts
│   ├── App.tsx       # Componente principal
│   └── index.tsx     # Ponto de entrada
└── package.json      # Dependências e scripts
```

## Fluxo de Desenvolvimento

1. **Entenda o código**: Familiarize-se com a estrutura e componentes
2. **Faça alterações**: Modifique ou crie novos componentes conforme necessário
3. **Teste localmente**: Verifique se tudo funciona como esperado
4. **Escreva testes**: Adicione testes para novas funcionalidades
5. **Mantenha o padrão**: Siga as convenções de código do projeto

## Dicas Úteis

- Use o tema escuro para desenvolvimento noturno (disponível na interface)
- Consulte os componentes existentes antes de criar novos
- Verifique o console do navegador para mensagens de erro
- Use o React DevTools para depuração
- Mantenha os componentes pequenos e focados em uma única responsabilidade

## Contribuição

Sua contribuição é muito bem-vinda! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b minha-nova-feature`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin minha-nova-feature`)
5. Crie um Pull Request

---

Desenvolvido com ❤️ e muito café!
