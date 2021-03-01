const express = require('express');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

/**
 * Initialize the JSON DB
 */
const adapter = new FileSync('./data/db.json');
const db = low(adapter);
db.defaults({ pokemon: [] }).write();

/**
 * Server Configuration
 */

app.use(express.json());

/**
 * Server Routes
 */
app.get('/api/pokemon/:number', (req, res) => {
  let number = parseInt(req.params.number);
  let pokemon = db.get('pokemon').find({ number }).value();
  res.status(200).json(pokemon);
});

app.delete('/api/pokemon/:number', (req, res) => {
  let number = parseInt(req.params.number);
  db.get('pokemon').remove({ number }).write();
  res.sendStatus(204);
});

app.get('/api/pokemon', (req, res) => {
  var result;
  let { type } = req.query;
  if (type) {
    result = db
      .get('pokemon')
      .filter((el) => {
        return el.types.includes(type);
      })
      .value();
  } else {
    result = db.get('pokemon').value();
  }
  res.status(200).json(result);
});

/**
 * Start the server
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
