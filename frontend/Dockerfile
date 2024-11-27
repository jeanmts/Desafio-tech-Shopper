# Etapa 1: Construir a aplicação
FROM node:18-alpine AS builder

# Configurar diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos de configuração e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todo o código do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar a aplicação construída para o NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta padrão do NGINX
EXPOSE 80

# Comando padrão para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
