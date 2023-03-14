const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Tableau de notes initial
let notes = [];

// Middleware pour autoriser les requêtes cross-origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route pour récupérer la note moyenne
app.get('/api/notes/moyenne', (req, res) => {
  const somme = notes.reduce((acc, note) => acc + note.note, 0);
  const moyenne = somme / notes.length;
  res.json({ moyenne: moyenne });
});

// Route pour enregistrer une nouvelle note
app.post('/api/notes', (req, res) => {
  const note = req.body.note;
  notes.push({ note: note });
  res.json({ note: note });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
