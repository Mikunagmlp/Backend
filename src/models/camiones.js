const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const camionesSchema = new Schema({
    Codigo: {
        type: String,
        require: true,
        trim: true,
	unique: true
    },
    NombreConductor: {
        type: String,
        required: true,
	trim: true,
    },
    Ruta: {
        type: String,
	required: true,
	trim: true
    },
    NumeroPlaca: {
        type: String,
	trim: true
    },
    Modelo: {
        type: String,
	trim: true
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

const Camion = mongoose.model('Camion', camionesSchema);

module.exports = Camion;
