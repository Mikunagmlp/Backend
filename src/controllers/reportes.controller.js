const reporteCtrl = {};
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');
const Menu = require('../models/menu');

reporteCtrl.getProductosDetalle = async (req, res) => {
    const getProductosDetalles = await Producto.find({ Estado: true }, { NombreProducto: 1, IdCategoria: 1, Nivels: 1 })
        .populate('IdCategoria', { NombreCategoria: 1, _id: 0 });
    res.status(200).send(getProductosDetalles);
}

reporteCtrl.calculoDiario = async (req, res) => {

    const getProductosDetalles = await Producto.findOne({ _id: req.params.id }, { CodigoProducto: 1, NombreProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, Solido_Liquido: 1 })
        .populate('IdCategoria', { NombreCategoria: 1, _id: 0 });

    const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosInicial: 1, CantidadAlumnosPrimaria: 1, CantidadAlumnosSegundaria: 1, _id: 0 });

    let productoSearch = getProductosDetalles.CodigoProducto;
    const getMenuProductoInicial = await Menu.find({ $or: [{ CodigoLiquidoInicial: productoSearch }, { CodigoSolildoInicial: productoSearch }], Aprovado: true });

    const getMenuProductoPrimaria = await Menu.find({ $or: [{ CodigoLiquidoPrimaria: productoSearch }, { CodigoSolidoPrimaria: productoSearch }], Aprovado: true });

    const getMenuProductoSegundaria = await Menu.find({ $or: [{ CodigoLiquidoSegundaria: productoSearch }, { CodigoSolidoSegundaria: productoSearch }], Aprovado: true });

    let totalAlumnos = 0;
    let totalAlumnosInicial = 0;
    let totalAlumnosPrimaria = 0;
    let totalAlumnosSegundaria = 0;
    let presupuestoInicial = 0;

    let frecuenciaInicialInicial = 0;
    let frecuenaDisponibleInicial = 0;
    let presupuestoDisponibleInicial = 0;

    let frecuenciaInicialPrimaria = 0;
    let frecuenaDisponiblePrimaria = 0;
    let presupuestoDisponiblePrimaria = 0;

    let frecuenciaInicialSegundaria = 0;
    let frecuenaDisponibleSegundaria = 0;
    let presupuestoDisponibleSegundaria = 0;

    getTotalPoblacionAlumnos.forEach((data) => {
        totalAlumnos += data.CantidadAlumnosInicial + data.CantidadAlumnosPrimaria + data.CantidadAlumnosSegundaria;
        totalAlumnosInicial += data.CantidadAlumnosInicial;
        totalAlumnosPrimaria += data.CantidadAlumnosPrimaria;
        totalAlumnosSegundaria += data.CantidadAlumnosSegundaria;
    });
    presupuestoInicial = getProductosDetalles.PresupuestoInicial;

    if ((getProductosDetalles.Nivels).length < 2) {
        getProductosDetalles.Nivels.forEach((n) => {
            if (n.Nivel == "Inicial") {
                frecuenciaInicialInicial = presupuestoInicial / (totalAlumnosInicial * getProductosDetalles.PrecioUnitario);
                if (getProductosDetalles.Solido_Liquido) {
                    getMenuProductoInicial.forEach((producto) => {
                        presupuestoDisponibleInicial += producto.montoSolildoInicial;
                        frecuenaDisponibleInicial += producto.frecuenciaSolidoInicialInicial;
                    });
                } else {
                    getMenuProductoInicial.forEach((producto) => {
                        presupuestoDisponibleInicial += producto.montoLiquidaInicial;
                        frecuenaDisponibleInicial += producto.frecuenciaLiquidaInicialInicial;
                    });
                }
                frecuenaDisponibleInicial += ((totalAlumnosInicial * getProductosDetalles.PrecioUnitario) / (totalAlumnosInicial * getProductosDetalles.PrecioUnitario));
                presupuestoDisponibleInicial += ((totalAlumnosInicial * getProductosDetalles.PrecioUnitario));

            }
            if (n.Nivel == "Primaria") {
                frecuenciaInicialPrimaria = presupuestoInicial / (totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario);
                if (getProductosDetalles.Solido_Liquido) {
                    getMenuProductoPrimaria.forEach((producto) => {
                        presupuestoDisponiblePrimaria += producto.montoSolidoPrimaria;
                        frecuenaDisponiblePrimaria += producto.frecuenciaSolidoPrimariaInicial;
                    });
                } else {
                    getMenuProductoPrimaria.forEach((producto) => {
                        presupuestoDisponiblePrimaria += producto.montoLiquidaPrimaria;
                        frecuenaDisponiblePrimaria += producto.frecuenciaLiquidaPrimariaInicial;
                    });
                }
                frecuenaDisponiblePrimaria += ((totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario) / (totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario));
                presupuestoDisponiblePrimaria += ((totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario));

            }
            if (n.Nivel == "Segundaria") {
                frecuenciaInicialSegundaria = presupuestoInicial / (totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario);

                if (getProductosDetalles.Solido_Liquido) {
                    getMenuProductoSegundaria.forEach((producto) => {
                        presupuestoDisponibleSegundaria += producto.montoSolildoSegundaria;
                        frecuenaDisponibleSegundaria += producto.frecuenciaSolidoSegundariaInicial;
                    });
                } else {
                    getMenuProductoSegundaria.forEach((producto) => {
                        presupuestoDisponibleSegundaria += producto.montoLiquidaSegundaria;
                        frecuenaDisponibleSegundaria += producto.frecuenciaLiquidaSegundariaInicial;
                    });
                }
                frecuenaDisponibleSegundaria += ((totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario) / (totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario));
                presupuestoDisponibleSegundaria += ((totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario));
            }
        })
    } else {
        presupuestoInicial = (presupuestoInicial / (getProductosDetalles.Nivels).length);
        console.log(presupuestoInicial)
        getProductosDetalles.Nivels.forEach((n) => {
            if (n.Nivel == "Inicial") {
                frecuenciaInicialInicial = presupuestoInicial / (totalAlumnosInicial * getProductosDetalles.PrecioUnitario);
                if (getProductosDetalles.Solido_Liquido) {
                    getMenuProductoInicial.forEach((producto) => {
                        presupuestoDisponibleInicial += producto.montoSolildoInicial;
                        frecuenaDisponibleInicial += producto.frecuenciaSolidoInicialInicial;
                    });
                } else {
                    getMenuProductoInicial.forEach((producto) => {
                        presupuestoDisponibleInicial += producto.montoLiquidaInicial;
                        frecuenaDisponibleInicial += producto.frecuenciaLiquidaInicialInicial;
                    });
                }
                frecuenaDisponibleInicial += ((totalAlumnosInicial * getProductosDetalles.PrecioUnitario) / (totalAlumnosInicial * getProductosDetalles.PrecioUnitario));
                presupuestoDisponibleInicial += ((totalAlumnosInicial * getProductosDetalles.PrecioUnitario));
            }
            if (n.Nivel == "Primaria") {
                frecuenciaInicialPrimaria = presupuestoInicial / (totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario);
                if (getProductosDetalles.Solido_Liquido) {
                    getMenuProductoPrimaria.forEach((producto) => {
                        presupuestoDisponiblePrimaria += producto.montoSolidoPrimaria;
                        frecuenaDisponiblePrimaria += producto.frecuenciaSolidoPrimariaInicial;
                    });
                } else {
                    getMenuProductoPrimaria.forEach((producto) => {
                        presupuestoDisponiblePrimaria += producto.montoLiquidaPrimaria;
                        frecuenaDisponiblePrimaria += producto.frecuenciaLiquidaPrimariaInicial;
                    });
                }
                frecuenaDisponiblePrimaria += ((totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario) / (totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario));
                presupuestoDisponiblePrimaria += ((totalAlumnosPrimaria * getProductosDetalles.PrecioUnitario));
            }
            if (n.Nivel == "Segundaria") {
                frecuenciaInicialSegundaria = presupuestoInicial / (totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario);
                if (getProductosDetalles.Solido_Liquido) {
                    getMenuProductoSegundaria.forEach((producto) => {
                        presupuestoDisponibleSegundaria += producto.montoSolildoSegundaria;
                        frecuenaDisponibleSegundaria += producto.frecuenciaSolidoSegundariaInicial;
                    });
                } else {
                    getMenuProductoSegundaria.forEach((producto) => {
                        presupuestoDisponibleSegundaria += producto.montoLiquidaSegundaria;
                        frecuenaDisponibleSegundaria += producto.frecuenciaLiquidaSegundariaInicial;
                    });
                }
                frecuenaDisponibleSegundaria += ((totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario) / (totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario));
                presupuestoDisponibleSegundaria += ((totalAlumnosSegundaria * getProductosDetalles.PrecioUnitario));
            }
        })
    }
    const respCalculoDiario = {
        NombreProducto: getProductosDetalles.NombreProducto,
        CodigoProducto: getProductosDetalles.CodigoProducto,
        TotalAlumnos: totalAlumnos,
        TotalAlumnosInicial: totalAlumnosInicial,
        TotalAlumnosPrimaria: totalAlumnosPrimaria,
        TotalAlumnosSegundaria: totalAlumnosSegundaria,
        PresupuestoInicial: presupuestoInicial.toFixed(2),
        FrecuenciaInicialInicial: frecuenciaInicialInicial.toFixed(2),
        FrecuenciaInicialPrimaria: frecuenciaInicialPrimaria.toFixed(2),
        FrecuenciaInicialSegundaria: frecuenciaInicialSegundaria.toFixed(2),
        FrecuendiaInicialDisponible: frecuenaDisponibleInicial > 0 ? (frecuenciaInicialInicial - frecuenaDisponibleInicial).toFixed(2) : 0.0,
        PresupuestoDisponibleInicial: presupuestoDisponibleInicial > 0 ? (presupuestoInicial - presupuestoDisponibleInicial).toFixed(2) : 0.0,
        FrecuendiaPrimariaDisponible: frecuenaDisponiblePrimaria > 0 ? (frecuenciaInicialPrimaria - frecuenaDisponiblePrimaria).toFixed(2) : 0,
        PresupuestoDisponiblePrimaria: presupuestoDisponiblePrimaria > 0 ? (presupuestoInicial - presupuestoDisponiblePrimaria).toFixed(2) : 0.0,
        FrecuendiaSegundariaDisponible: frecuenaDisponibleSegundaria > 0 ? (frecuenciaInicialSegundaria - frecuenaDisponibleSegundaria).toFixed(2) : 0.0,
        PresupuestoDisponibleSegundaria: presupuestoDisponibleSegundaria > 0 ? (presupuestoInicial - presupuestoDisponibleSegundaria).toFixed(2) : 0.0
    }
    res.status(200).send(respCalculoDiario);
}
module.exports = reporteCtrl;