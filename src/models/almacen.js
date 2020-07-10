const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const almacenSchema = new Schema({
    NombreAlmacen: {
        type: String,
        require: true,
        trim: true
    },
    CodigoAlmacen: {
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
    }
}, {
    timestamps: true
});

const Almacen = mongoose.model('Almacen', almacenSchema);

module.exports = Almacen;
