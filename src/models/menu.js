const { Schema, model } = require('mongoose');
const menuSchema = new Schema({
    codigoGenerado: {
        type: Number,
        required: true,
        unique: true
    },
    CodigoSolidoInicial:{
        type: String,
        required: true
    },
    CodigoLiquidoInicial:{
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
    FrecuenciaSolidoUtilizadoInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    MontoSolildoUtilizadoInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    FrecuenciaLiquidaUtilizadoInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    MontoLiquidaUtilizadoInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    frecuenciaSolidoInicialInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    montoSolildoInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    frecuenciaLiquidaInicialInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    montoLiquidaInicial: {
        type: Number,
        required: true,
        default:0.0
    },

    CodigoSolidoPrimaria:{
        type: String,
        required: true
    },
    CodigoLiquidoPrimaria:{
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
    FrecuenciaSolidoUtilizadoPrimaria: {
        type: Number,
        required: true,
        default:0.0
    },
    MontoSolildoUtilizadoPrimaria: {
        type: Number,
        required: true,
        default:0.0
    },
    FrecuenciaLiquidaUtilizadoPrimaria: {
        type: Number,
        required: true,
        default:0.0
    },
    MontoLiquidaUtilizadoPrimaria: {
        type: Number,
        required: true,
        default:0.0
    },  
    frecuenciaSolidoPrimariaInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    montoSolidoPrimaria: {
        type: Number,
        required: true,
        default:0.0
    },
    frecuenciaLiquidaPrimariaInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    montoLiquidaPrimaria: {
        type: Number,
        required: true,
        default:0.0
    },
    CodigoSolidoSegundaria:{
        type: String,
        required: true
    },
    CodigoLiquidoSegundaria:{
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
    FrecuenciaSolidoUtilizadoSegundaria: {
        type: Number,
        required: true,
        default:0.0
    },
    MontoSolildoUtilizadaSegundaria: {
        type: Number,
        required: true,
        default:0.0
    },
    FrecuenciaLiquidaUtilizadoSegundaria: {
        type: Number,
        required: true,
        default:0.0
    },
    MontoLiquidaUtilizadoSegundaria: {
        type: Number,
        required: true,
        default:0.0
    },
    frecuenciaSolidoSegundariaInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    montoSolildoSegundaria: {
        type: Number,
        required: true,
        default:0.0
    },
    frecuenciaLiquidaSegundariaInicial: {
        type: Number,
        required: true,
        default:0.0
    },
    montoLiquidaSegundaria: {
        type: Number,
        required: true,
        default:0.0
    },
    Estado: {
        type: Boolean,
        default: true,
        required: true
    },
    EnviadoEba: {
        type: Boolean,
        default: false,
        required: true
    },
    EnviadoJefeUnace: {
        type: Boolean,
        default: false,
        required: true
    },
    Aprovado: {
        type: Boolean,
        default: false,
        required: true
    },
    IdUser: {
        type: String,
        required: true
    },
    ObservacionJefeUnace: {
        type: String,
    },
    ObservacionEba: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = model('Menu', menuSchema);