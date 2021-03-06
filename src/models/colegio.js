const mongoose = require('mongoose');


// TODO: AGREGAR LA PAGINACION DE 10 EN 10
// creamos el modelado del colegio
const colegioSchema = new mongoose.Schema({
    NombreColegio: {
        type: String,
        required: true,
        trim: true
    },
    IdRuta: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Ruta'
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
    CantidadAlumnosSegundaria: {
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
