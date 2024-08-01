# Utiliser l'image Node.js officielle comme image de base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application React écoute
EXPOSE 3000

# Démarrer l'application en mode développement
CMD ["npm", "start"]
