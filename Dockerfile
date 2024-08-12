# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Ejecuta prisma generate para crear el cliente Prisma
RUN npx prisma generate

# Compila la aplicación para producción
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]