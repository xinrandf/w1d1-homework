const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('dotenv').config();
const mongoose = require('mongoose');

require('./app/models/inventory.model.js');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Mongoose connection open');
  })
  .catch((err) => {
    console.log('Connection error:', err.message);
    process.exit();
  });

mongoose.connection.on('open', () => {
  console.log('Mongoose connection open');
});

mongoose.connection.on('error', (err) => {
  console.log(`Connection error: ${err.message}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Inventory API is working' });
});

require('./app/routes/inventory.route.js')(app);

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});