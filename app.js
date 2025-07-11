const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();




const readJson = (path) => {
  const raw = fs.readFileSync(path, 'utf-8');
  return JSON.parse(raw);
};

const writeJson = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

const afficherFichier = ()=>{
  const contenu = readJson("data/posts.json");
  console.log(contenu);
};


app.use(express.json());

// Fonctions utilitaires pour lire/écrire des fichiers JSON à placer ici

// Test de démarrage
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API du mini-blog !');
});

// Routes à compléter ici
const postsPath = path.join(__dirname,'data','posts.json');
app.get('/data/posts',(req,res)=>{
 const posts = readJson(postsPath);
  console.log(posts);
  res.json(posts);
});

app.get('/data/posts/:id', (req, res) => {
  const posts = readJson(postsPath);
  const id = parseInt(req.params.id); 

  const post = posts.find(p => p.id === id); 
  if (!post) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }

  res.json(post);
});

// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


