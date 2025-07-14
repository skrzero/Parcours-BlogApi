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
const postsPath = path.join(__dirname, './data/posts.json');
const commentsPath = path.join(__dirname, 'data/comments.json');
console.log(readJson(postsPath));

app.get('/posts', (req, res, next) => {
  try {
    const posts = readJson(postsPath);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

app.get('/posts/:id', (req, res, next) => {
  try {
    const posts = readJson(postsPath);
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post non trouvé' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

app.post('/posts', (req, res) => {
  try {
    const posts = readJson('./data/posts.json');
    const newPost = req.body;
    posts.push(newPost);
    writeJson('./data/posts.json',posts);
    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

app.patch('/posts/:id', (req, res) => {
  try {
    const posts = readJson('./data/posts.json');
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
      Object.assign(post, req.body); 
      writeJson('./data/posts.json', posts);
      res.json(post);
    } else {
      res.status(404).send('Article non trouvé');
    }
  } catch (err) {
    next(err);
  }
});








// Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


