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
    Distrito: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    CodColegio: {
        type: String,
        required: true,
        trim: true
    },
    Turno: {
        type: String,
        required: true,
        trim: true
    },
    Categoria: {
        type: String,
        required: true,
        trim: true
    },
    CantidadAlumnos: {
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
    IdRol: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Rol'
    }
    // TODO: aqui haremos la relacion de N usuarios con la entidad
}, {
    timestamps: true
});

const Colegio = mongoose.model('Colegio', colegioSchema);
module.exports = Colegio;
