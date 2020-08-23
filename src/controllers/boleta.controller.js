const colegioCtrl = {};
const Boleta = require('../models/boleta');
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');

colegioCtrl.crearBoleta = async (req, res) => {
    const { Codigo, Ruta, NombreColegio, CodColegio, Encargado, NombreProducto, Direccion, Encargado, CantidadAlumnosInicial, NombreProducto,
        PrecioProducto, CantidadAlumnosPrimaria, NombreProducto,
        PrecioProducto, CantidadAlumnosSegundaria, NombreProducto,
        PrecioProducto, } = req.body;
    try {
        const newBoleta = new Boleta({
            Codigo,
            Ruta,
            NombreColegio,
            CodColegio,
            Encargado,
            Direccion,
            Encargado,
            CantidadAlumnosInicial,
            NombreProducto,
            PrecioProducto,
            CantidadAlumnosPrimaria,
            NombreProducto,
            PrecioProducto,
            CantidadAlumnosSegundaria,
            NombreProducto,
            PrecioProducto,
        })

        await newBoleta.save();
        res.json(newBoleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.listarBoletas = async (req, res) => {
    try {
        const Boleta = await Boleta.find({ Estado: true });

        res.status(200).send(Boleta);
    } catch (e) {
        res.status(400).send(e);
    }
}

boletaCtrl.updateBoleta = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['Codigo',
        'Ruta',
        'NombreColegio',
        'CodColegio',
        'Encargado',
        'Direccion',
        'Encargado',
        'CantidadAlumnosInicial',
        ' NombreProducto',
        ' PrecioProducto',
        '  CantidadAlumnosPrimaria',
        'NombreProducto',
        ' PrecioProducto',
        'CantidadAlumnosSegundaria',
        'NombreProducto',
        'PrecioProducto',];
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

        updates.forEach((update) => {
            boleta[update] = req.body[update];
        });
        await boleta.save();

        res.send(boleta);

    } catch (error) {
        res.status(400).send(error);
    }
}

boletaCtrl.getSearch = async (req, res, next) => {

    try {
        let q = req.query.q;
        let result = await Boleta.find(
            {
                NombreBoleta: {
                    $regex: new RegExp(q),
                    $options: 'i'
                }
            }, { __v: 0 });

        if (result.length == 0) {
            result = await Boleta.find(
                {
                    CodBoleta: {
                        $regex: new RegExp(q),
                        $options: 'i'
                    }
                }, { __v: 0 });
        }
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send(e);
    }

}