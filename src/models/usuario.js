const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creamos el modelado del usuario
const userSchema = new mongoose.Schema({
    NombreCompleto : {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 7
    },
    Telefono: {
        type: String,
        required: true,
        trim: true
    },
    Direccion: {
        type: String,
        required: true,
        trim: true
    },
    Genero: {
        type: String,
        required: true,
        trim: true,
    },
    Estado: {
        type: Boolean,
        default: false
    },

    // TODO: aqui haremos la relacion de N usuarios con la entidad
});

// buscamos al usuario que se quiere registrar
userSchema.statics.encontrarUsuario = async (email, password) => {
    const user = await User.findOne({ Email: email });

    // si no encontramos al user lanzamos un error
    if ( !user ) {
        throw new Error('Usuario invalido');
    }

    if ( password !== user.Password ) {
        throw  new Error('Usuario invalido');
    }

    return user;

    // // verificamos si su password es el correcto
    // // primero desencriptamos el password para verificar
    // const coincide = await bcrypt.compare( password, user.password );
    // if ( !coincide ) {
    //     // en caso de que este mal su password lanzamos un error
    //     throw new Error('Usuario no encontrado!');
    // }
    //
    // // retornamos el user una vez verificado
    // return user;
}

// antes de guardar los datos del usuario
// se van a encriptar los passwords
// userSchema.pre('save', async function(next) {
//     const user = this;
//
//     // verificamos si el password ha sido modificado
//     if ( user.isModified('password') ) {
//         // hasheamos el password nuevo
//         user.password = await bcrypt.hash( user.password, 7 );
//     }
//     // next se lo llama cuando finalizamos esta funcion
//     next();
// });
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
