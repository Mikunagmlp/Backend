const { Schema, model } = require('mongoose');
var ToySchema = new Schema({ name: String });
const permisoSchema = new Schema({
    NombrePermiso: {
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
        default: true,
        required: true
    },
    IdUser: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Permiso', permisoSchema);