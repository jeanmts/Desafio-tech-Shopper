# Use a imagem oficial do Node.js
FROM node:16

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json para dentro do container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código para dentro do container
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta em que o backend vai rodar
EXPOSE 8080

# Comando para rodar o app, após a compilação
CMD ["npm", "start"]
