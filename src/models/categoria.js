const { Schema, model } = require('mongoose');

const Permiso = require('./permiso');

const categoriaSchema = new Schema({
    NombreRol: {
        type: String,
        required: true,
        unique: true
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
    roles: [Permiso]
}, {
    timestamps: true
});

module.exports = model('Categoria', categoriaSchema);