FROM node:18-alpine as build

WORKDIR /app

# Copia os arquivos de package.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o resto dos arquivos
COPY . .

# Compila o React
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos de build para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"] 