const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const rolSchema = new Schema({
    NombreRol: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    Description: {
        type: String,
        required: true
    },
    Estado: {
        type: Boolean,
        default: true
    },
    IdUser: {
        type: String,
        required: true
    },
    Permiso: [
        {
            NombrePermiso: String,
            Idpermiso: String,
        }
    ]
}, {
    timestamps: true
});
const Rol = mongoose.model('Rol', rolSchema);
module.exports = Rol;