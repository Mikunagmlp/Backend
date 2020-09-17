const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const asignacionSchema = new Schema({
    codigoGenerado: {
        type: Number,
        required: true,
    },
    CodColegio: {
        type: String,
        require: true,
        trim: true
    },
    Colegio: {
        type: String,
        require: true,
        trim: true
    },
    CodigoSolidoInicial: {
        type: String,
        trim: true
    },
    ProductoSolidoInicial: {
        type: String,
        trim: true
    },
    LoteSolidoInicial: {
        type: String,
        trim: true
    },
    SolidoInicial: [
        {
            IdProveedor: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor'
            }
        }
    ],

    CodigoLiquidoInicial: {
        type: String,
        trim: true
    },
    ProductoLiquidoInicial: {
        type: String,
        trim: true
    },
    LoteLiquidoInicial: {
        type: String,
        trim: true
    },
    LiquidoInicial: [
        {
            IdProveedor: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor'
            }
        }
    ],
    CodigoSolidoPrimaria: {
        type: String,
        trim: true
    },
    ProductoSolidoPrimaria: {
        type: String,
        trim: true
    },
    LoteSolidoPrimaria: {
        type: String,
        trim: true
    },
    SolidoPrimaria: [
        {
            IdProveedor: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor'
            }
        }
    ],
    CodigoLiquidoPrimaria: {
        type: String,
        trim: true
    },
    ProductoLiquidoPrimaria: {
        type: String,
        trim: true
    },
    LoteLiquidoPrimaria: {
        type: String,
        trim: true
    },
    LiquidoPrimaria: [
        {
            IdProveedor: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor'
            }
        }
    ],
    CodigoSolidoSegundaria: {
        type: String,
        trim: true
    },
    ProductoSolidoSegundaria: {
        type: String,
        trim: true
    },
    LoteSolidoSegundaria: {
        type: String,
        trim: true
    },
    SolidoSegundaria: [
        {
            IdProveedor: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor'
            }
        }
    ],
    CodigoLiquidoSegundaria: {
        type: String,
        trim: true
    },
    ProductoLiquidoSegundaria: {
        type: String,
        trim: true
    },
    LoteLiquidoSegundaria: {
        type: String,
        trim: true
    },
    LiquidoSegundaria: [
        {
            IdProveedor: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor'
            }
        }
    ],
    Estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Asignacion = mongoose.model('Asigancion', asignacionSchema);

module.exports = Asignacion;
