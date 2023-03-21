# Definimos la imagen base
FROM node

# Creamos una carpeta donde vamos a guardar el proyecto
WORKDIR /app

# Copaimos el package de nuestra carpeta local a la carpeta de operaciones
COPY package*.json ./

# Corremos el comando para instalar las dependencias
RUN npm install

# TOmamos el codigo del aplicativo
COPY . .

# Habilitamos un persoque que escuche nuestra computadora
EXPOSE 8080

CMD ["npm", "start"]