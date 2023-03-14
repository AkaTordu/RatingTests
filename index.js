const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Middleware pour parser les données JSON
app.use(bodyParser.json());
app.set('view engine', 'ejs')

// Lecture des notes depuis le fichier
let notes = [];
try {
  notes = JSON.parse(fs.readFileSync('notes.json'));
} catch (error) {}

// Middleware pour autoriser les requêtes cross-origin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route pour récupérer la note moyenne
app.get('/moyenne', (req, res) => {
  const somme = notes.reduce((acc, note) => acc + note.note, 0);
  const moyenne = somme / notes.length;
  res.json({ moyenne: moyenne });
});

// Route pour enregistrer une nouvelle note
app.post('/notes', (req, res) => {
  const note = req.body.note;
  notes.push({ note: note });
  fs.writeFileSync('notes.json', JSON.stringify(notes));
  res.json({ note: note });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})


// Démarrage du serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});