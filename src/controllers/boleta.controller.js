const boletaCtrl = {};
const Boleta = require('../models/boleta');
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');
const Menu = require('../models/menu');
const Asignacion = require('../models/asignacion');


boletaCtrl.listaAsignaciones = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaBusqueda; // ejemplo: '2020/08/24'
        const fechaFinal = fechaInicial.substring(0, 8).concat(Number(fechaInicial.substring(8)) + 1);
        const { codigoGenerado } = req.body;
        const asignacion = await Asignacion.find({ $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }], Estado: true })
            .populate("SolidoInicial.IdProveedor")
            .populate("LiquidoInicial.IdProveedor")
            .populate("SolidoPrimaria.IdProveedor")
            .populate("LiquidoPrimaria.IdProveedor")
            .populate("SolidoSegundaria.IdProveedor")
            .populate("LiquidoSegundaria.IdProveedor")
        res.status(200).send(asignacion);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.crearBoleta = async (req, res) => {
    const { FirmaEntrega, FirmaRecibido, FirmaSiremu } = req.body;
    try {
        let codigoBoleta = await Boleta.countDocuments() + 1;
        const asignacion = await Asignacion.findOne({ _id: req.params.id })
            .populate("SolidoInicial.IdProveedor")
            .populate("LiquidoInicial.IdProveedor")
            .populate("SolidoPrimaria.IdProveedor")
            .populate("LiquidoPrimaria.IdProveedor")
            .populate("SolidoSegundaria.IdProveedor")
            .populate("LiquidoSegundaria.IdProveedor")

        const colegio = await Colegio.findOne({ CodColegio: asignacion.CodColegio }).populate('IdRuta');

        const solidoInicial = await Producto.findOne({ CodigoProducto: asignacion.CodigoSolidoInicial }, { NombreProducto: 1, PrecioUnitario: 1, CodigoProducto: 1 });

        const liquidoInicial = await Producto.findOne({ CodigoProducto: asignacion.CodigoLiquidoInicial }, { NombreProducto: 1, PrecioUnitario: 1, CodigoProducto: 1 })

        const solidoPrimaria = await Producto.findOne({ CodigoProducto: asignacion.CodigoSolidoPrimaria }, { NombreProducto: 1, PrecioUnitario: 1, CodigoProducto: 1 })

        const liquidoPrimaria = await Producto.findOne({ CodigoProducto: asignacion.CodigoLiquidoPrimaria }, { NombreProducto: 1, PrecioUnitario: 1, CodigoProducto: 1 })

        const solidoSegundaria = await Producto.findOne({ CodigoProducto: asignacion.CodigoSolidoSegundaria }, { NombreProducto: 1, PrecioUnitario: 1, CodigoProducto: 1 })

        const liquidoSegundaria = await Producto.findOne({ CodigoProducto: asignacion.CodigoLiquidoSegundaria }, { NombreProducto: 1, PrecioUnitario: 1, CodigoProducto: 1 })

        const newBoleta = new Boleta({
            CodigoActa: codigoBoleta + "000-" + asignacion.codigoGenerado,
            Turno: colegio.Turno,
            NombreColegio: colegio.NombreColegio,
            Ruta: colegio.IdRuta.NombreRuta,
            CodigoRuta: colegio.IdRuta.Codigo,
            CodColegio: colegio.CodColegio,
            Direccion: colegio.Direccion,
            Encargado: colegio.Encargado,
            CantidadAlumnosInicial: colegio.CantidadAlumnosInicial,
            PrecioSolidoInicial: solidoInicial.PrecioUnitario,
            ProductoSolidoInicial: solidoInicial.NombreProducto,
            PrecioLiquidoInicial: liquidoInicial.PrecioUnitario,
            ProductoLiquidoInicial: liquidoInicial.NombreProducto,
            CodigoSolidoInicial: solidoInicial.CodigoProducto,
            CodigoLiquidoInicial: liquidoInicial.CodigoProducto,

            CantidadAlumnosPrimaria: colegio.CantidadAlumnosPrimaria,
            PrecioSolidoPrimaria: solidoPrimaria.PrecioUnitario,
            ProductoSolidoPrimaria: solidoPrimaria.NombreProducto,
            PrecioLiquidoPrimaria: liquidoPrimaria.PrecioUnitario,
            ProductoLiquidoPrimaria: liquidoPrimaria.NombreProducto,
            CodigoSolidoPrimaria: solidoPrimaria.CodigoProducto,
            CodigoLiquidoPrimaria: liquidoPrimaria.CodigoProducto,

            CantidadAlumnosSegundaria: colegio.CantidadAlumnosSegundaria,
            PrecioSolidoSegundaria: solidoSegundaria.PrecioUnitario,
            ProductoSolidoSegundaria: solidoSegundaria.NombreProducto,
            PrecioLiquidoSegundaria: liquidoSegundaria.PrecioUnitario,
            ProductoLiquidoSegundaria: liquidoSegundaria.NombreProducto,
            CodigoSolidoSegundaria: solidoSegundaria.CodigoProducto,
            CodigoLiquidoSegundaria: liquidoSegundaria.CodigoProducto,

            FirmaEntrega,
            FirmaRecibido,
            FirmaSiremu
        })
        await newBoleta.save();
        res.json(newBoleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.listaBoletas = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaBusqueda; // ejemplo: '2020/08/24'
        const fechaFinal = fechaInicial.substring(0, 8).concat(Number(fechaInicial.substring(8)) + 1);
        const { codigoGenerado } = req.body;
        const boleta = await Boleta.find({ $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }], Estado: true })
        res.status(200).send(boleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.listaCodigoActa = async (req, res) => {
    try {
        const CodigoActa = req.body.CodigoActa;
        const boleta = await Boleta.findOne({ CodigoActa: CodigoActa, Estado: true })
        res.status(200).send(boleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaColegio = async (req, res) => {
    try {
        const colegioApp = req.body;
        const imagen = req.body.Imagen;

        // console.log(imagen);

        res.status(200).send({ message: 'Recibido' });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

boletaCtrl.firmaEBA = async (req, res) => {
    try {
        const ebaApp = req.body;
        const imagen = req.body.Imagen;

        // console.log(imagen);

        res.status(200).send({ message: 'Recibido' });

    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaSiremu = async (req, res) => {
    try {
        const siremuApp = req.body;
        const imagen = req.body.Imagen;

        // console.log(imagen);

        res.status(200).send({ message: 'Recibido' });
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = boletaCtrl;
