const express = require('express');

require('./db/mongoose'); // importa la DB
const usuarioRouter = require('./routes/usuario');
const entidadRouter = require('./routes/entidad');
const administracionRouter= require('./routes/administracion');
const almacenRouter= require('./routes/almacen');
const categoriaRouter = require('./routes/categoria');
const colegioRouter=require('./routes/colegio');
const posicionRouter=require('./routes/posicion');
const productoRouter= require('./routes/producto');
const proveedorRouter=require('./routes/proveedor');

const cors = require('cors');
const app = express();

// hace el parse de data enviada del cliente en json se convierta en objeto para nuestro server
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// registramos nuestro router para poder usarlo
app.use(usuarioRouter);
app.use(entidadRouter);
app.use(administracionRouter);
app.use(almacenRouter);
app.use(categoriaRouter);
app.use(colegioRouter);
app.use(posicionRouter);
app.use(productoRouter);
app.use(proveedorRouter);

module.exports = app;
