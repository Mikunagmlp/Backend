const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const proveedorSchema = new Schema({
    NombreProveedor: {
        type: String,
        require: true,
        trim: true
    },
    CodigoProveedor: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    NombreEmpresa: {
        type: String,
        require: true,
        trim: true
    },
    Direccion: {
        type: String,
        require: true,
        trim: true
    },
    Descripcion: {
        type: String,
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

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;