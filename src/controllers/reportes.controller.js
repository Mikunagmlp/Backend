const reporteCtrl = {};
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');

reporteCtrl.getProductosDetalle = async(req,res) =>{
    const getProductosDetalles = await Producto.find({Estado : true},{NombreProducto:1,IdCategoria:1, Nivels:1})
    .populate('IdCategoria',{NombreCategoria:1, _id:0}); 
    res.status(200).send(getProductosDetalles);
}

reporteCtrl.poblacionAlumnos = async(req, res)=>{
    
    const getProductosDetalles = await Producto.findOne({_id: req.params.id},{NombreProducto:1,IdCategoria:1, Nivels:1,PresupuestoInicial:1,PrecioUnitario:1 })
    .populate('IdCategoria',{NombreCategoria:1, _id:0}); 
    
    const getTotalPoblacionAlumnos = await Colegio.find({Estado:true},{CantidadAlumnosInicial:1,CantidadAlumnosPrimaria:1,CantidadAlumnosSegundaria:1,_id:0 });

    let totalAlumnos = 0;
    let totalAlumnosInicial = 0;
    let totalAlumnosPrimaria = 0;
    let totalAlumnosSegundaria = 0;
    let presupuestoInicial=0;

    let frecuenciaInicialInicial=0;
    let frecuenaDisponibleInicial=0;
    let presupuestoDisponibleInicial=0;

    let frecuenciaInicialPrimaria=0;
    let frecuenaDisponiblePrimaria=0;
    let presupuestoDisponiblePrimaria=0;

    let frecuenciaInicialSegundaria=0;
    let frecuenaDisponibleSegundaria=0;
    let presupuestoDisponibleSegundaria=0;

    getTotalPoblacionAlumnos.forEach( (data)=>{
        totalAlumnos += data.CantidadAlumnosInicial + data.CantidadAlumnosPrimaria + data.CantidadAlumnosSegundaria;
        totalAlumnosInicial += data.CantidadAlumnosInicial; 
        totalAlumnosPrimaria += data.CantidadAlumnosPrimaria; 
        totalAlumnosSegundaria += data.CantidadAlumnosSegundaria; 
    } );
    presupuestoInicial=getProductosDetalles.PresupuestoInicial;
    getProductosDetalles.Nivels.forEach((n)=>{
        if (n.Nivel=="Inicial") {
            frecuenciaInicialInicial = presupuestoInicial/ (totalAlumnosInicial*getProductosDetalles.PrecioUnitario);
        }
        if (n.Nivel=="Primaria") {
            frecuenciaInicialPrimaria =presupuestoInicial/ (totalAlumnosPrimaria*getProductosDetalles.PrecioUnitario);
        }
        if (n.Nivel=="Segundaria") {
            frecuenciaInicialSegundaria =presupuestoInicial/ (totalAlumnosSegundaria*getProductosDetalles.PrecioUnitario);
        }
    })
    const respCalculoDiario={
        TotalAlumnos: totalAlumnos,
        TotalAlumnosInicial: totalAlumnosInicial,
        TotalAlumnosPrimaria: totalAlumnosPrimaria,
        TotalAlumnosSegundaria: totalAlumnosSegundaria,
        PresupuestoInicial:presupuestoInicial.toFixed(2),
        FrecuenciaInicialInicial:frecuenciaInicialInicial.toFixed(2),
        FrecuenciaInicialPrimaria:frecuenciaInicialPrimaria.toFixed(2),
        FrecuenciaInicialSegundaria:frecuenciaInicialSegundaria.toFixed(2),
        
        // FrecuenciaDisponible:frecuenaDisponible,
        // PresupuestoDisponible:presupuestoDisponible
        
    }
    res.status(200).send(respCalculoDiario);
}

module.exports = reporteCtrl;