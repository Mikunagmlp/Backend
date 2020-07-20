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
    pro1: {
        type: String,
    },
    pro2: {
        type: String,
    },
    pro3: {
        type: String,
    },
    pro4: {
        type: String,
    },
    pro5: {
        type: String,
    },
    pro6: {
        type: String,
    },
    pro7: {
        type: String,
    },
    pro8: {
        type: String,
    },
    pro9: {
        type: String,
    },
    pro10: {
        type: String,
    },
}, {
    timestamps: true
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
