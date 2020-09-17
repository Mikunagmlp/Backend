const boletaCtrl = {};
const Boleta = require('../models/boleta');
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');
const Menu = require('../models/menu');
const Asignacion = require('../models/asignacion');
const sharp = require('sharp');


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
            LoteSolidoInicial: asignacion.LoteSolidoInicial,
            LoteLiquidoInicial: asignacion.LoteLiquidoInicial,

            CantidadAlumnosPrimaria: colegio.CantidadAlumnosPrimaria,
            PrecioSolidoPrimaria: solidoPrimaria.PrecioUnitario,
            ProductoSolidoPrimaria: solidoPrimaria.NombreProducto,
            PrecioLiquidoPrimaria: liquidoPrimaria.PrecioUnitario,
            ProductoLiquidoPrimaria: liquidoPrimaria.NombreProducto,
            CodigoSolidoPrimaria: solidoPrimaria.CodigoProducto,
            CodigoLiquidoPrimaria: liquidoPrimaria.CodigoProducto,
            LoteSolidoPrimaria: asignacion.LoteSolidoPrimaria,
            LoteLiquidoPrimaria: asignacion.LoteLiquidoPrimaria,

            CantidadAlumnosSegundaria: colegio.CantidadAlumnosSegundaria,
            PrecioSolidoSegundaria: solidoSegundaria.PrecioUnitario,
            ProductoSolidoSegundaria: solidoSegundaria.NombreProducto,
            PrecioLiquidoSegundaria: liquidoSegundaria.PrecioUnitario,
            ProductoLiquidoSegundaria: liquidoSegundaria.NombreProducto,
            CodigoSolidoSegundaria: solidoSegundaria.CodigoProducto,
            CodigoLiquidoSegundaria: liquidoSegundaria.CodigoProducto,
            LoteSolidoSegundaria: asignacion.LoteSolidoSegundaria,
            LoteLiquidoSegundaria: asignacion.LoteLiquidoSegundaria,
        })
        await newBoleta.save();
        res.json(newBoleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaBoleta = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['FirmaEntrega', 'FirmaRecibido', 'FirmaSiremu', 'Observaciones'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }
    try {
        const boleta = await Boleta.findOne({ _id: req.params.id });

        if (!boleta) {
            return res.status(404).send();
        }
        boleta.Entregado = true;
        updates.forEach((update) => {
            boleta[update] = req.body[update];
        });
        await boleta.save();

        res.send(boleta);

    } catch (error) {
        res.status(400).send(error);
    }
}

// boletaCtrl.listaBoletas = async (req, res) => {
//     try {
//         const fechaInicial = req.body.fechaBusqueda; // ejemplo: '2020/08/24'
//         const fechaFinal = fechaInicial.substring(0, 8).concat(Number(fechaInicial.substring(8)) + 1);
//         const { codigoGenerado } = req.body;
//         const boleta = await Boleta.find({ $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }], Estado: true })
//         res.status(200).send(boleta);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// }

boletaCtrl.listaBoletas = async (req, res) => {
    try {
        const boletas = await Boleta.find({}); // ejemplo: '2020/08/24'

        res.status(200).send(boletas);
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
        const codigoBoleta = req.body.CodigoBoleta;
        const ci = req.body.CI;
        const nombre = req.body.Nombre;
        const Observaciones = req.body.Observaciones;
        const imagen = req.body.Imagen;

        const imgBuff = decodeBase64Image(imagen);
        const buffer = await sharp(imgBuff.data).resize({ width: 250, height: 150 }).png().toBuffer();

        // console.log(colegioApp);

        await Boleta.findOneAndUpdate({ CodigoActa: codigoBoleta },
            { FirmaColegio: buffer, nombre: nombre, ci: ci, Observaciones: Observaciones });

        res.status(200).send({ message: 'Recibido' });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

boletaCtrl.firmaEBA = async (req, res) => {
    try {
        const codigoBoleta = req.body.CodigoBoleta;
        const imagen = req.body.Imagen;

        const imgBuff = decodeBase64Image(imagen);
        const buffer = await sharp(imgBuff.data).resize({ width: 250, height: 150 }).png().toBuffer();

        await Boleta.findOneAndUpdate({ CodigoActa: codigoBoleta },
            { FirmaEba: buffer });

        res.status(200).send({ message: 'Recibido' });

    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaSiremu = async (req, res) => {
    try {
        const codigoBoleta = req.body.CodigoBoleta;
        const imagen = req.body.Imagen;

        const imgBuff = decodeBase64Image(imagen);
        const buffer = await sharp(imgBuff.data).resize({ width: 250, height: 150 }).png().toBuffer();

        await Boleta.findOneAndUpdate({ CodigoActa: codigoBoleta },
            { FirmaSiremu: buffer });

        res.status(200).send({ message: 'Recibido' });
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaColegioImage = async (req, res) => {
    const id = req.params.id;
    try {
        const boleta = await Boleta.findById(id);

        if (!boleta || !boleta.FirmaColegio) {
            throw new Error();
        }
        // hacemos las configuraciones previas de la imagen
        res.set('Content-Type', 'image/png');
        // mandamos como respuesta la imagen
        res.send(boleta.FirmaColegio);

    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaEbaImage = async (req, res) => {
    const id = req.params.id;
    try {
        const boleta = await Boleta.findById(id);

        if (!boleta || !boleta.FirmaEba) {
            throw new Error();
        }
        // hacemos las configuraciones previas de la imagen
        res.set('Content-Type', 'image/png');
        // mandamos como respuesta la imagen
        res.send(boleta.FirmaEba);

    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.firmaSiremuImage = async (req, res) => {
    const id = req.params.id;
    try {
        const boleta = await Boleta.findById(id);

        if (!boleta || !boleta.FirmaSiremu) {
            throw new Error();
        }
        // hacemos las configuraciones previas de la imagen
        res.set('Content-Type', 'image/png');
        // mandamos como respuesta la imagen
        res.send(boleta.FirmaSiremu);

    } catch (e) {
        res.status(400).send(e);
    }
}

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

module.exports = boletaCtrl;
