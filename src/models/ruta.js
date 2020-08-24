const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const rutaSchema = new Schema({
    Codigo: {
        type: String,
        require: true,
        trim: true,
	    unique: true
    },
    NombreRuta: {
        type: String,
        required: true,
	    trim: true,
    },
    Descripcion: {
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

const Ruta = mongoose.model('Ruta', rutaSchema);

module.exports = Ruta;
