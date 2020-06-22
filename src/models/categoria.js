const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const categoriaSchema = new Schema({
    NombreCategoria: {
        type: String,
        require: true,
        trim: true
    },
    CodigoCategoria: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Descripcion: {
        type: String
    },
    Estado: {
        type: Boolean,
        default: true
    },
    IdUser: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;