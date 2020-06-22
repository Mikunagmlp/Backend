const almacenCtrl = {};
const Almacen = require('../models/almacen');

almacenCtrl.createAlmacen = async (req, res) => {
    try {
        const { NombreAlmacen, CodigoAlmacen, Descripcion, IdUser } = req.body;

        const newAlmacen = new Almacen({
            NombreAlmacen,
            CodigoAlmacen,
            Descripcion,
            IdUser
        })

        await newAlmacen.save();
        res.status(200).json(newAlmacen);

    } catch (error) {
        res.status(400).send(error);
    }
}

almacenCtrl.getAlmacenes = async (req, res) => {
    try {
        const almacenes = await Almacen.find({ Estado: true })
        res.status(200).json(almacenes);

    } catch (error) {
        res.status(400).send(error);
    }

}

almacenCtrl.getAlmacen = async (req, res) => {
    try {
        const almacen = await Almacen.findById(req.params.id);
        res.status(200).json(almacen);
    } catch (error) {
        res.status(400).send(error);
    }
}


almacenCtrl.updateAlmacen = async (req, res) => {
    try {
        const { NombreAlmacen, CodigoAlmacen, Descripcion, IdUser } = req.body;
        await Almacen.findByIdAndUpdate(req.params.id, {
            NombreAlmacen,
            CodigoAlmacen,
            Descripcion,
            IdUser
        })
        return res.status(400).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}

almacenCtrl.desableAlmacen = async (req, res) => {
    try {
        const { Estado } = req.body;
        await Almacen.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(400).json({ update: true });
    } catch (error) {
        res.status(200).send(error);
    }
}


module.exports = almacenCtrl;