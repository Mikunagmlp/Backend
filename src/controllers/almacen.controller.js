const almacenCtrl = {};
const Almacen = require('../models/almacen');

almacenCtrl.createAlmacen = async (req, res) => {
    try {
        const { NombreAlmacen, CodigoAlmacen, Descripcion, IdUser } = req.body;

        const newAlmacen = new Almacen({
            NombreAlmacen,
            CodigoAlmacen,
            Descripcion,
            // IdUser
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
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreAlmacen', 'Descripcion', 'IdUSer', 'Estado'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const almacen = await Almacen.findOne({ _id: req.params.id });

        if (!almacen) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            almacen[update] = req.body[update];
        });
        await almacen.save();

        res.send(almacen);

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
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = almacenCtrl;
