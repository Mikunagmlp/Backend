const asigancionCtrl = {};
const Asignacion = require('../models/asignacion');
const Colegio = require('../models/colegio');
const Menu = require('../models/menu');

asigancionCtrl.createAsignacion = async (req, res) => {
    try {
        const { LoteSolidoInicial, SolidoInicial, LoteLiquidoInicial, LiquidoInicial, LoteSolidoPrimaria, SolidoPrimaria, LoteLiquidoPrimaria, LiquidoPrimaria, LoteSolidoSegundaria, SolidoSegundaria, LoteLiquidoSegundaria, LiquidoSegundaria, IdUser, IdMenu } = req.body;
        const colegio = await Colegio.findOne({ _id: req.params.id });
        const menu = await Menu.findOne({ _id: IdMenu });

        const newAsignacion = new Asignacion({
            codigoGenerado: menu.codigoGenerado,
            CodColegio: colegio.CodColegio,
            Colegio: colegio.NombreColegio,

            CodigoSolidoInicial: menu.CodigoSolidoInicial,
            ProductoSolidoInicial: menu.ProductoSolidoInicial,
            LoteSolidoInicial,
            SolidoInicial,

            CodigoLiquidoInicial: menu.CodigoLiquidoInicial,
            ProductoLiquidoInicial: menu.ProductoLiquidoInicial,
            LoteLiquidoInicial,
            LiquidoInicial,

            CodigoSolidoPrimaria: menu.CodigoSolidoPrimaria,
            ProductoSolidoPrimaria: menu.ProductoSolidoPrimaria,
            LoteSolidoPrimaria,
            SolidoPrimaria,

            CodigoLiquidoPrimaria: menu.CodigoLiquidoPrimaria,
            ProductoLiquidoPrimaria: menu.ProductoLiquidoPrimaria,
            LoteLiquidoPrimaria,
            LiquidoPrimaria,

            CodigoSolidoSegundaria: menu.CodigoSolidoSegundaria,
            ProductoSolidoSegundaria: menu.ProductoSolidoSegundaria,
            LoteSolidoSegundaria,
            SolidoSegundaria,

            CodigoLiquidoSegundaria: menu.CodigoLiquidoSegundaria,
            ProductoLiquidoSegundaria: menu.ProductoLiquidoSegundaria,
            LoteLiquidoSegundaria,
            LiquidoSegundaria,

            IdUser
        })
        await newAsignacion.save();
        res.status(200).json(newAsignacion);

    } catch (error) {
        res.status(400).send(error);
    }
}

asigancionCtrl.updateAsignacion = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['CodigoSolidoInicial', 'ProductoSolidoInicial', 'LoteSolidoInicial', 'SolidoInicial', 'CodigoLiquidoInicial', 'ProductoLiquidoInicial', 'LoteLiquidoInicial', 'LiquidoInicial', 'CodigoSolidoPrimaria', 'ProductoSolidoPrimaria', 'LoteSolidoPrimaria', 'SolidoPrimaria', 'CodigoLiquidoPrimaria', 'ProductoLiquidoPrimaria', 'LoteLiquidoPrimaria', 'LiquidoPrimaria', 'CodigoSolidoSegundaria', 'ProductoSolidoSegundaria', 'LoteSolidoSegundaria', 'SolidoSegundaria', 'CodigoLiquidoSegundaria', 'ProductoLiquidoSegundaria', 'LoteLiquidoSegundaria', 'LiquidoSegundaria'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const asiganacion = await Asignacion.findOne({ _id: req.params.id });

        if (!asiganacion) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            asiganacion[update] = req.body[update];
        });
        await asiganacion.save();

        res.send(asiganacion);

    } catch (error) {
        res.status(400).send(error);
    }
}

asigancionCtrl.listarAsignacionCodigo = async (req, res) => {
    try {
        const { codigoGenerado } = req.body;
        const asignacion = await Asignacion.find({ codigoGenerado: codigoGenerado, Estado: true })
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

asigancionCtrl.listarAsignacionColegio = async (req, res) => {
    try {
        const { Colegio } = req.body;
        const asignacion = await Asignacion.find({
            Colegio: {
                $regex: new RegExp(Colegio),
                $options: 'i'
            }, Estado: true
        })
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

module.exports = asigancionCtrl;