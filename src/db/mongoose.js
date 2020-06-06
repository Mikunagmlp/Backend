const mongoose = require('mongoose');

// aqui hacemos toda la configuracion de mongoose
mongoose.connect( process.env.MONGODB_URL , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false // elimina el warning de DeprecationWarning
});