const express = require('express');

require('./db/mongoose'); // importa la DB
const usuarioRouter = require('./routes/usuario');

const app = express();

// hace el parse de data enviada del cliente en json se convierta en objeto para nuestro server
app.use(express.json());

// registramos nuestro router para poder usarlo
app.use(usuarioRouter);

module.exports = app;