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
    // primero desencriptamos el password para verificar
    const coincide = await bcrypt.compare( password, usuario.password );
    if ( !coincide ) {
        // en caso de que este mal su password lanzamos un error
        throw new Error('Usuario no encontrado!');
    }

    // retornamos el usuario una vez verificado
    return usuario;
}

// antes de guardar los datos del usuario
// se van a encriptar los passwords
usuarioSchema.pre('save', async function(next) {
    const usuario  = this

    // verificamos si el password ha sido modificado
    if ( usuario.isModified('password') ) {
        // hasheamos el password nuevo
        usuario.password = await bcrypt.hash( usuario.password, 8 );
    }
    // next se lo llama cuando finalizamos esta funcion
    next();
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;