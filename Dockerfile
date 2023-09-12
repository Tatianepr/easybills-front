# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json primeiro para aproveitar o cache de camadas
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Compile o aplicativo React para produção (ou ajuste conforme sua necessidade)
RUN npm run build

# Exponha a porta onde o aplicativo estará em execução (a porta padrão do React é 3000)
EXPOSE 3000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD [ "npm", "start" ]
