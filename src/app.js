const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const flass = require('connect-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

require('./passport/local-auth');
require('./db/mongoose'); // importa la DB

//cargamos las rutas
const usuarioRouter = require('./routes/usuario/usuario');
const entidadRouter = require('./routes/entidad');
const administracionRouter = require('./routes/administrador/administracion');
const almacenRouter = require('./routes/almacen');
const categoriaRouter = require('./routes/categoria');
const colegioRouter = require('./routes/colegio');
const posicionRouter = require('./routes/posicion');
const productoRouter = require('./routes/producto');
const proveedorRouter = require('./routes/proveedor');
const recoveryRouter = require('./routes/recovery_password');
const homeRouter = require('./routes/home');

// cargar middlewares

const TIME_SESSIONS = 1 * 24 * 60 * 60 ;
const {
    SESS_NAME='fofo',
    SESS_LIFETIME = TIME_SESSIONS
} = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));
app.use(session({
    secret: 'fofo',
    resave: false,
    saveUninitialized: false,
    name: SESS_NAME,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: SESS_LIFETIME,
        autoReconnect: true,
        autoRemove: 'native'
    })
}))
app.use(flass());
app.use(passport.initialize());
app.use(passport.session());

//settings

//global variables
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    next();
});
app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    next();
});

// hace el parse de data enviada del cliente en json se convierta en objeto para nuestro server
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// registramos nuestro router para poder usarlo
app.use(homeRouter);
app.use(usuarioRouter);
app.use(entidadRouter);
app.use(administracionRouter);
app.use(almacenRouter);
app.use(categoriaRouter);
app.use(colegioRouter);
app.use(posicionRouter);
app.use(productoRouter);
app.use(proveedorRouter);
app.use(recoveryRouter);

module.exports = app;
