const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const methodOverride = require('method-override');

require('./passport/local-auth');
require('./db/mongoose'); // importa la DB

//cargamos las rutas
const usuarioRouter = require('./routes/usuario/usuario');
const entidadRouter = require('./routes/entidad');
const administracionRouter = require('./routes/administrador/administracion');
const almacenRouter = require('./routes/almacen');
const colegioRouter = require('./routes/colegio');
const posicionRouter = require('./routes/posicion');
const productoRouter = require('./routes/producto');
const proveedorRouter = require('./routes/proveedor');
const recoveryRouter = require('./routes/recovery_password');
const rolRouter = require('./routes/rol');
const permisoRouter=require('./routes/permiso');
const camionRouter= require('./routes/camiones');
const authRouter = require('./routes/authrouter');
const reportesRouter = require('./routes/reportes');
const boletaRouter = require('./routes/boleta');
const menuRouter = require('./routes/menu');
const rutaRouter = require('./routes/ruta');
const registerphRouter = require('./routes/registerph');
//const registerphRouter = require('./routes/registerph');
// cargar middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

// hace el parse de data enviada del cliente en json se convierta en objeto para nuestro server
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(cors({ origin: 'http://localhost:8100' }));

// registramos nuestro router para poder usarlo
app.use('/', require('./routes/index'));

app.use(usuarioRouter);
app.use(entidadRouter);
app.use(administracionRouter);
app.use(almacenRouter);
app.use(colegioRouter);
app.use(posicionRouter);
app.use(productoRouter);
app.use(proveedorRouter);
app.use(recoveryRouter);
app.use(rolRouter);
app.use(permisoRouter);
app.use(camionRouter);
app.use(authRouter);
app.use(reportesRouter);
app.use(boletaRouter);
app.use(menuRouter);
app.use(rutaRouter);
app.use(registerphRouter);
//app.use(registerphRouter);
module.exports = app;
