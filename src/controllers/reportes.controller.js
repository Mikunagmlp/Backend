const reporteCtrl = {};
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');
const Menu = require('../models/menu');
const Boleta = require('../models/boleta');

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

reporteCtrl.ruteo = async (req, res) => {
    try {
        let ruta = req.query.ruta;
        var rutasColegio = [];
        await Colegio.find(
            {})
            .populate('IdRuta')
            .exec((err, rutas) => {
                if (!err) {
                    if (rutas && rutas.length && rutas.length > 0) {
                        rutas.forEach(data => {
                            if (data.IdRuta.Codigo == ruta) {
                                let obj = {
                                    _id: data._id,
                                    NombreColegio: data.NombreColegio,
                                    Ruta: data.IdRuta.NombreRuta,
                                    CodigoRuta: data.IdRuta.Codigo,
                                };
                                rutasColegio.push(obj);
                            } else {
                                if (data.IdRuta.NombreRuta.includes(ruta)) {
                                    let obj = {
                                        _id: data._id,
                                        NombreColegio: data.NombreColegio,
                                        Ruta: data.IdRuta.NombreRuta,
                                        CodigoRuta: data.IdRuta.Codigo,
                                    };
                                    rutasColegio.push(obj);
                                }
                            }
                        });
                    }
                }
                res.status(200).send(rutasColegio);
            });
    } catch (e) {
        res.status(400).send(e);
    }
}
reporteCtrl.entregaLote = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaInicio; // ejemplo: '2020/08/24'
        const fechaFinal = req.body.fechaFin;
        let codigo = req.query.codigo;
        let result = await Boleta.find(
            {
                $or: [
                    {
                        LoteSolidoInicial: {
                            $regex: new RegExp(codigo),
                            $options: 'i'
                        }
                    },
                    {
                        LoteLiquidoInicial: {
                            $regex: new RegExp(codigo),
                            $options: 'i'
                        }
                    },
                    {
                        LoteSolidoPrimaria: {
                            $regex: new RegExp(codigo),
                            $options: 'i'
                        }
                    },
                    {
                        LoteLiquidoPrimaria: {
                            $regex: new RegExp(codigo),
                            $options: 'i'
                        }
                    },
                    {
                        LoteSolidoSegundaria: {
                            $regex: new RegExp(codigo),
                            $options: 'i'
                        }
                    },
                    {
                        LoteLiquidoSegundaria: {
                            $regex: new RegExp(codigo),
                            $options: 'i'
                        }
                    }
                ],
                $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }],
                Entregado: true

            }, { NombreColegio: 1, ProductoSolidoInicial: 1, LoteSolidoInicial: 1, ProductoLiquidoInicial: 1, LoteLiquidoInicial: 1, ProductoSolidoPrimaria: 1, LoteSolidoPrimaria: 1, ProductoLiquidoPrimaria: 1, LoteLiquidoPrimaria: 1, ProductoSolidoSegundaria: 1, LoteSolidoSegundaria: 1, ProductoLiquidoSegundaria: 1, LoteLiquidoSegundaria: 1 });

        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e);
    }
}
reporteCtrl.productoDisponible = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaInicio; // ejemplo: '2020/08/24'
        const fechaFinal = req.body.fechaFin;
        const productos = await Producto.find({ $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }], Estado: true }, { CodigoProducto: 1, NombreProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, Solido_Liquido: 1 });
        const poblacion = await getPoblacion();
        let frecuenciaInicial = 0;
        let objProducto = {};
        let frecuenciaResto = 0;
        let frecuenciaActual = 0;
        let montoResto = 0;
        let montoDisponible = 0;
        let estadoProductoFrecuencia = "";
        let estadoProductoMonto = "";
        let reporteProducto = [];

        for (const producto of productos) {
            for (const nivel of producto.Nivels) {
                if (nivel.Nivel == "Inicial") {
                    frecuenciaInicial = calculoFrecuencia(producto.PresupuestoInicial, producto.PrecioUnitario, poblacion.inicial);
                    frecuenciaResto = await getMenuFrecuencia(producto.CodigoProducto);
                    montoResto = await productoMontoDisponible(producto.CodigoProducto);
                    estadoProductoFrecuencia = producto.Solido_Liquido ? frecuenciaResto.inicialSolido : frecuenciaResto.inicialLiquido;
                    estadoProductoMonto = producto.Solido_Liquido ? montoResto.inicialSolido : montoResto.inicialLiquido;
                    frecuenciaActual = calculoFrecuenciaActual(frecuenciaInicial, estadoProductoFrecuencia);
                    montoDisponible = (producto.PresupuestoInicial - estadoProductoMonto);
                    objProducto = {
                        NombreProducto: producto.NombreProducto,
                        CodigoProducto: producto.CodigoProducto,
                        Solido_Liquido: producto.Solido_Liquido,
                        Nivel: nivel.Nivel,
                        FrecuenciaDisponible: frecuenciaActual.toFixed(2),
                        MontoDisponible: montoDisponible.toFixed(2)
                    }
                    reporteProducto.push(objProducto);
                }
                if (nivel.Nivel == "Primaria") {
                    frecuenciaInicial = calculoFrecuencia(producto.PresupuestoInicial, producto.PrecioUnitario, poblacion.primaria);
                    frecuenciaResto = await getMenuFrecuencia(producto.CodigoProducto);
                    montoResto = await productoMontoDisponible(producto.CodigoProducto);
                    estadoProductoFrecuencia = producto.Solido_Liquido ? frecuenciaResto.primariaSolido : frecuenciaResto.primariaLiquido;
                    estadoProductoMonto = producto.Solido_Liquido ? montoResto.primariaSolido : montoResto.primariaLiquido;
                    frecuenciaActual = calculoFrecuenciaActual(frecuenciaInicial, estadoProductoFrecuencia);
                    montoDisponible = (producto.PresupuestoInicial - estadoProductoMonto);
                    objProducto = {
                        NombreProducto: producto.NombreProducto,
                        CodigoProducto: producto.CodigoProducto,
                        Solido_Liquido: producto.Solido_Liquido,
                        Nivel: nivel.Nivel,
                        FrecuenciaDisponible: frecuenciaActual.toFixed(2),
                        MontoDisponible: montoDisponible.toFixed(2)
                    }
                    reporteProducto.push(objProducto);
                }
                if (nivel.Nivel == "Segundaria") {
                    frecuenciaInicial = calculoFrecuencia(producto.PresupuestoInicial, producto.PrecioUnitario, poblacion.segundaria);
                    frecuenciaResto = await getMenuFrecuencia(producto.CodigoProducto);
                    montoResto = await productoMontoDisponible(producto.CodigoProducto);
                    estadoProductoFrecuencia = producto.Solido_Liquido ? frecuenciaResto.segundariaSolido : frecuenciaResto.segundariaLiquido;
                    estadoProductoMonto = producto.Solido_Liquido ? montoResto.segundariaSolido : montoResto.segundariaLiquido;
                    frecuenciaActual = calculoFrecuenciaActual(frecuenciaInicial, estadoProductoFrecuencia);
                    montoDisponible = (producto.PresupuestoInicial - estadoProductoMonto);
                    objProducto = {
                        NombreProducto: producto.NombreProducto,
                        CodigoProducto: producto.CodigoProducto,
                        Solido_Liquido: producto.Solido_Liquido,
                        Nivel: nivel.Nivel,
                        FrecuenciaDisponible: frecuenciaActual.toFixed(2),
                        MontoDisponible: montoDisponible.toFixed(2)
                    }
                    reporteProducto.push(objProducto);
                }
            }
        }
        res.status(200).send(reporteProducto)
    } catch (e) {
        res.status(400).send(e);
    }

}
reporteCtrl.cambiosIncidencias = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaInicio; // ejemplo: '2020/08/24'
        const fechaFinal = req.body.fechaFin;
        let result = await Boleta.find(
            {
                $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }],
                Entregado: true,
                Observaciones: { $exists: true }

            }, { NombreColegio: 1, Observaciones: 1, CodigoActa: 1, updatedAt: 1 });

        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e);
    }
}
reporteCtrl.estadistico = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaInicio; // ejemplo: '2020/08/24'
        const fechaFinal = req.body.fechaFin;
        let result = await Boleta.find(
            {
                $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }],
                Entregado: true,
                Observaciones: { $exists: true }
            }, { NombreColegio: 1, Observaciones: 1, CodigoActa: 1, updatedAt: 1 });
        let statistics = new Map();
        for (const detalis of result) {
            if (statistics.has(detalis.Observaciones)) {
                statistics.set(detalis.Observaciones, statistics.get(detalis.Observaciones) + 1);
            } else {
                statistics.set(detalis.Observaciones, 1);
            }
        }
        const objStatistics = Object.fromEntries(statistics);
        res.status(200).send(objStatistics);
    } catch (e) {
        res.status(400).send(e);
    }
}
reporteCtrl.menuAprobados = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaInicio;
        const fechaFinal = req.body.fechaFin;
        const id = req.body.id == undefined ? 0 : req.body.id;
        const menu = await Menu.find({
            $or:
                [
                    { codigoGenerado: id },
                    {
                        $and: [
                            { updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }
                        ]
                    }
                ], Aprovado: true
        });

        res.status(200).send(menu);
    } catch (e) {
        res.status(400).send(e);
    }
}
reporteCtrl.consolidadoColegio = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaInicio;
        const fechaFinal = req.body.fechaFin;

        let colegio = req.query.colegio;
        let getColegio = await Colegio.findOne(
            {
                NombreColegio: {
                    $regex: new RegExp(colegio),
                    $options: 'i'
                }
            }, { __v: 0 }).populate('IdRuta');

        if (getColegio.length == 0) {
            getColegio = await Colegio.findOne(
                {
                    CodColegio: {
                        $regex: new RegExp(colegio),
                        $options: 'i'
                    }
                }, { __v: 0 }).populate('IdRuta');
        }
        let getBoleta = await Boleta.find(
            {
                $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }],
                Entregado: true,
                CodColegio: getColegio.CodColegio

            }, { NombreColegio: 1, ProductoSolidoInicial: 1, ProductoLiquidoInicial: 1, LoteSolidoPrimaria: 1, LoteLiquidoPrimaria: 1, LoteSolidoSegundaria: 1, LoteLiquidoSegundaria: 1, CodigoActa: 1, CantidadAlumnosInicial: 1, CantidadAlumnosPrimaria: 1, CantidadAlumnosSegundaria: 1, updatedAt: 1, CodigoActa: 1 });
        res.status(200).send(getBoleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

async function getPoblacion() {
    let poblacionInicial = 0;
    let poblacionPrimaria = 0;
    let poblacionSegundaria = 0;
    const getAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosInicial: 1, CantidadAlumnosPrimaria: 1, CantidadAlumnosSegundaria: 1, _id: 0 });
    getAlumnos.forEach((poblacion) => {
        poblacionInicial += poblacion.CantidadAlumnosInicial;
        poblacionPrimaria += poblacion.CantidadAlumnosPrimaria;
        poblacionSegundaria += poblacion.CantidadAlumnosSegundaria;
    });
    return {
        inicial: poblacionInicial,
        primaria: poblacionPrimaria,
        segundaria: poblacionSegundaria
    };
}

function calculoFrecuencia(presupuestoInicial, precioUnitario, poblacion) {
    let frecuencia = presupuestoInicial / (poblacion * precioUnitario);
    return frecuencia;
}

async function getMenuFrecuencia(codigoProducto) {
    let inicialLiquido = 0;
    let inicialSolido = 0;
    let primariaLiquido = 0;
    let primariaSolido = 0;
    let segundariaLiquido = 0;
    let segundariaSolido = 0;
    const menuFrecuencia = await Menu.find({
        $or: [
            { CodigoLiquidoInicial: codigoProducto },
            { CodigoSolildoInicial: codigoProducto },
            { CodigoLiquidoPrimaria: codigoProducto },
            { CodigoSolidoPrimaria: codigoProducto },
            { CodigoLiquidoSegundaria: codigoProducto },
            { CodigoSolidoSegundaria: codigoProducto }
        ], Aprovado: true
    });

    menuFrecuencia.forEach((producto) => {
        inicialLiquido += producto.FrecuenciaLiquidaUtilizadoInicial;
        inicialSolido += producto.FrecuenciaSolidoUtilizadoInicial;
        primariaLiquido += producto.FrecuenciaLiquidaUtilizadoPrimaria;
        primariaSolido += producto.FrecuenciaSolidoUtilizadoPrimaria;
        segundariaLiquido += producto.FrecuenciaLiquidaUtilizadoSegundaria;
        segundariaSolido += producto.FrecuenciaSolidoUtilizadoSegundaria;
    });
    objFrecuencia = {
        inicialLiquido: inicialLiquido,
        inicialSolido: inicialSolido,
        primariaLiquido: primariaLiquido,
        primariaSolido: primariaSolido,
        segundariaLiquido: segundariaLiquido,
        segundariaSolido: segundariaSolido,
    };
    return menuFrecuencia == null ? 0 : objFrecuencia;
}

function calculoFrecuenciaActual(frecuanciaInicial, frecuenciaAnterior) {
    return frecuanciaInicial - frecuenciaAnterior;
}

async function productoMontoDisponible(codigoProducto) {
    let inicialLiquido = 0;
    let inicialSolido = 0;
    let primariaLiquido = 0;
    let primariaSolido = 0;
    let segundariaLiquido = 0;
    let segundariaSolido = 0;
    const menuFrecuencia = await Menu.find({
        $or: [
            { CodigoLiquidoInicial: codigoProducto },
            { CodigoSolidoInicial: codigoProducto },
            { CodigoLiquidoPrimaria: codigoProducto },
            { CodigoSolidoPrimaria: codigoProducto },
            { CodigoLiquidoSegundaria: codigoProducto },
            { CodigoSolidoSegundaria: codigoProducto }
        ], Aprovado: true
    });

    menuFrecuencia.forEach((producto) => {
        inicialLiquido += producto.MontoLiquidaUtilizadoInicial;
        inicialSolido += producto.MontoSolildoUtilizadoInicial;
        primariaLiquido += producto.MontoLiquidaUtilizadoPrimaria;
        primariaSolido += producto.MontoSolildoUtilizadoPrimaria;
        segundariaLiquido += producto.MontoLiquidaUtilizadoSegundaria;
        segundariaSolido += producto.MontoSolildoUtilizadaSegundaria;
    });
    objMonto = {
        inicialLiquido: inicialLiquido,
        inicialSolido: inicialSolido,
        primariaLiquido: primariaLiquido,
        primariaSolido: primariaSolido,
        segundariaLiquido: segundariaLiquido,
        segundariaSolido: segundariaSolido,
    };
    return objMonto == null ? 0 : objMonto;
}
module.exports = reporteCtrl;
