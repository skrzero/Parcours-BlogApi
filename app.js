const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Fonctions utilitaires pour lire/écrire des fichiers JSON à placer ici

// Test de démarrage
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API du mini-blog !');
});

// Routes à compléter ici

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
