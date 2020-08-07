const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const presupuestoSchema = new Schema({
    CodigoPresupuesto:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    Presupuesto: {
        type: Number,
        trim: true
    },
    Descripcion: {
        type: String,
    },
    IdUser: {
        type: String,
        required: true
    },
    Estado: {
        type: Boolean,
        default: true
    },
});

const PresuestoInicial= mongoose.model('PresupuestoInicial', presupuestoSchema);

module.exports = PresuestoInicial;