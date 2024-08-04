# Utiliser l'image Node.js officielle comme image de base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer `ts-node` pour le rechargement en direct
RUN npm install -g ts-node

# Exposer le port sur lequel l'application NestJS écoute
EXPOSE 3000

# Démarrer l'application ( mode développement : rechargement automatique)
CMD ["npm", "run", "start"]
