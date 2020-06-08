const express = require('express');

require('./db/mongoose'); // importa la DB
const usuarioRouter = require('./routes/usuario');

const cors = require('cors');
const app = express();

// hace el parse de data enviada del cliente en json se convierta en objeto para nuestro server
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// registramos nuestro router para poder usarlo
app.use(usuarioRouter);

module.exports = app;
