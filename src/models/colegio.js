const mongoose = require('mongoose');

// creamos el modelado del colegio
const colegioSchema = new mongoose.Schema({
    NombreColegio: {
        type: String,
        required: true,
        trim: true
    },
    Ruta: {
        type: String,
        required: true,
        trim: true
    },
    CodColegio: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    Turno: {
        type: String,
        required: true,
        trim: true
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
    Estado: {
        type: Boolean,
        default: true
    },
    Encargado: {
        type: String,
        required: true,
        trim: true
    },
    CantidadAlumnosInicial: {
        type: Number,
        require: true,
        trim: true,
        default:0
    },
    CantidadAlumnosPrimaria: {
        type: Number,
        require: true,
        trim: true,
        default:0
    },
    CantidadAlumnosSecundaria: {
        type: Number,
        require: true,
        trim: true,
        default:0
    },
}, {
    timestamps: true
});

const Colegio = mongoose.model('Colegio', colegioSchema);
module.exports = Colegio;
