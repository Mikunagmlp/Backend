const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const registerphSchema = new Schema({
  CodigoActa: {
    type: String,
    require: true,
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
  
  LoteLiquidoInicial: {
    type: String,
    trim: true
  },
 
  ProductoLiquidoInicial: {
    type: String,
    required: true
  },
  phLiquidoInicial: { //input
    type: String,
    required: true,
    trim: true
},
  
  LoteLiquidoPrimaria: {
    type: String,
    trim: true
  },
 
  ProductoLiquidoPrimaria: {
    type: String,
    required: true
  },
  phLiquidoPrimaria: {  //input
    type: String, 
    required: true,
    trim: true
},
  LoteLiquidoSegundaria: {
    type: String,
    trim: true
  },
  
  ProductoLiquidoSegundaria: {
    type: String,
    required: true
  },
  phLiquidoSegundaria: { //input
    type: String,
    required: true,
    trim: true
},
}, {
  timestamps: true
});

const Registerph = mongoose.model('Registerph', registerphSchema);

module.exports = Registerph;
