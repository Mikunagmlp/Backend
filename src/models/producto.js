const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productoSchema = new Schema({
    NombreProducto: {
        type: String,
        require: true,
        trim: true
    },
    CodigoProducto: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    Descripcion: {
        type: String,
    },
    Estado: {
        type: Boolean,
        default: true
    },
    // IdUser: {
    //     type: String,
    //     required: true
    // },

    Solido_Liquido: {
        type: Boolean,
        required: true
    },

    IdProveedor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor',
        required: true
    },
    IdAlmacen: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Almacen',
        required: true
    },
    Lote: {
        type: String,
        trim: true
    },
    Volumen: {
        type: Number,
        trim: true,
        default:0
    },
    Gramage: {
        type: Number,
        trim: true,
        default:0
    },
    PresupuestoInicial:{
        type: Number,
        trim:true,
        require:true,
        default:0
    },
    Nivels:[
        {
        Nivel: {
            type: String,
            default:"Sin Nivel"
            }   
        },
    ],
    PrecioUnitario:{
        type: Number,
        trim:true,
        require:true,
        default:0
    }
}, {
    timestamps: true
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
