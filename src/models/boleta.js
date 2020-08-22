const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const BoletaSchema = new Schema({
    Codigo:Codigo,
    Ruta:Ruta,
    CodColegio:CodColegio,
    NombreColegio:NombreColegio ,
    Encargado: Encargado,
    Direccion: Direccion,

    CantidadAlumnosInicial:CantidadAlumnosInicial
   , NombreProducto: NombreProducto,
   PrecioProducto:PrecioProducto,

    CantidadAlumnosPrimaria:CantidadAlumnosPrimaria
      , NombreProducto: NombreProducto,
      PrecioProducto:PrecioProducto,
      
    CantidadAlumnosSecundaria: CantidadAlumnosSecundaria,
     NombreProducto: NombreProducto,
    PrecioProducto:PrecioProducto,
    // IdUser: {
    //     type: String,
    //     required: true
    //boleta
    // }
}, {
    timestamps: true
});

const Boleta = mongoose.model('Boleta', camionesSchema);

module.exports = Boleta;