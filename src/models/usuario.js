const mongoose = require('mongoose');

// creamos el modelado del usuario
const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    }
});

// buscamos al usuario que se quiere registrar
usuarioSchema.statics.encontrarUsuario = async (correo, password) => {
    const usuario = await Usuario.findOne({ correo });

    // si no encontramos al usuario lanzamos un error
    if ( !usuario ) {
        throw new Error('Usuario no encontrado');
    }

    // verificamos si su password es el correcto
    const coincide = await bcrypt.compare( password, usuario.password );
    if ( !coincide ) {
        // en caso de que este mal su password lanzamos un error
        throw new Error('Usuario no encontrado!');
    }

    // retornamos el usuario una vez verificado
    return usuario;
}

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;