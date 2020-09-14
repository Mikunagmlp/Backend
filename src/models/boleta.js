const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const boletaSchema = new Schema({
  CodigoActa: {
    type: String,
    require: true,
  },
  Turno: {
    type: String,
    required: true,
    trim: true
  },
  NombreColegio: {
    type: String,
    required: true,
    trim: true
  },
  Ruta: {
    type: String,
  },
  CodigoRuta: {
    type: String,
  },
  CodColegio: {
    type: String,
    required: true,
    trim: true
  },
  Direccion: {
    type: String,
    required: true,
    trim: true
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
    default: 0
  },
  CantidadAlumnosPrimaria: {
    type: Number,
    require: true,
    trim: true,
    default: 0
  },
  CantidadAlumnosSegundaria: {
    type: Number,
    require: true,
    trim: true,
    default: 0
  },
  LoteSolidoInicial: {
    type: String,
    trim: true
  },
  LoteLiquidoInicial: {
    type: String,
    trim: true
  },
  PrecioSolidoInicial: {
    type: Number,
    trim: true,
    require: true,
    default: 0
  },
  PrecioLiquidoInicial: {
    type: Number,
    trim: true,
    require: true,
    default: 0
  },
  CodigoSolidoInicial: {
    type: String,
    required: true
  },
  CodigoLiquidoInicial: {
    type: String,
    required: true
  },
  ProductoSolidoInicial: {
    type: String,
    required: true
  },
  ProductoLiquidoInicial: {
    type: String,
    required: true
  },
  LoteSolidoPrimaria: {
    type: String,
    trim: true
  },
  LoteLiquidoPrimaria: {
    type: String,
    trim: true
  },
  PrecioSolidoPrimaria: {
    type: Number,
    trim: true,
    require: true,
    default: 0
  },
  PrecioLiquidoPrimaria: {
    type: Number,
    trim: true,
    require: true,
    default: 0
  },
  CodigoSolidoPrimaria: {
    type: String,
    required: true
  },
  CodigoLiquidoPrimaria: {
    type: String,
    required: true
  },
  ProductoSolidoPrimaria: {
    type: String,
    required: true
  },
  ProductoLiquidoPrimaria: {
    type: String,
    required: true
  },
  LoteSolidoSegundaria: {
    type: String,
    trim: true
  },
  LoteLiquidoSegundaria: {
    type: String,
    trim: true
  },
  PrecioSolidoSegundaria: {
    type: Number,
    trim: true,
    require: true,
    default: 0
  },
  PrecioLiquidoSegundaria: {
    type: Number,
    trim: true,
    require: true,
    default: 0
  },
  CodigoSolidoSegundaria: {
    type: String,
    required: true
  },
  CodigoLiquidoSegundaria: {
    type: String,
    required: true
  },
  ProductoSolidoSegundaria: {
    type: String,
    required: true
  },
  ProductoLiquidoSegundaria: {
    type: String,
    required: true
  },
  Estado: {
    type: Boolean,
    default: true
  },
  FirmaEntrega: {
    type: String
  },
  FirmaRecibido: {
    type: String
  },
  FirmaSiremu: {
    type: String
  },
  Entregado: {
    type: Boolean,
    default: false
  },
  Observaiones: {
    type: String,
  },
}, {
  timestamps: true
});

const Boleta = mongoose.model('Boleta', boletaSchema);

module.exports = Boleta;
