FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta 3001
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"] 