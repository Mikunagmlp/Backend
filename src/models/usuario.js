const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// creamos el modelado del usuario
const userSchema = new mongoose.Schema({
    NombreCompleto: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    Password: {
        type: String,
        required: true,
        min: [4, 'numeros min'],
        max: [5, 'numeros max'],
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
        default: true
    },
    IdRol: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Rol'
    }
    // TODO: aqui haremos la relacion de N usuarios con la entidad
}, {
    timestamps: true
});

// buscamos al usuario que se quiere registrar
userSchema.statics.encontrarUsuario = async (email, password) => {
    const user = await User.findOne({ Email: email });

    // si no encontramos al user lanzamos un error
    if (!user) {
        throw new Error('Usuario invalido');
    }

    if (password !== user.Password) {
        throw new Error('Usuario invalido');
    }

    return user;
}

userSchema.methods.encryptPassword = (Password) => {
    return bcrypt.hashSync(Password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (Password) {
    return bcrypt.compareSync(Password, this.Password);
};
const User = mongoose.model('User', userSchema);
module.exports = User;


userSchema.statics.EncryptPassword = async function(password) {  const hash = await bcrypt.hash(password, 12);  return hash;};

module.exports = mongoose.model('User', userSchema);