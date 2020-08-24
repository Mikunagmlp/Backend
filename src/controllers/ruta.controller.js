const rutaCtrl = {};
const Ruta = require('../models/ruta');

rutaCtrl.createRuta = async (req, res) => {
    try {
        const { Codigo, NombreRuta, Descripcion, IdUser } = req.body;
        const newRuta = new Ruta({
            Codigo,
            NombreRuta,
            Descripcion,
            IdUser
        })
        await newRuta.save();
        res.status(200).json(newRuta);
    } catch (error) {
        res.status(400).send(error);
    }
}

rutaCtrl.getRutas = async (req, res) => {
    try {
        const ruta = await Ruta.find({ Estado: true })
        res.status(200).json(ruta);
    } catch (error) {
        res.status(400).send(error);
    }
}

rutaCtrl.getRuta = async (req, res) => {
    try {
        const ruta = await Ruta.findById(req.params.id)
        res.status(200).json(ruta);
    } catch (error) {
        res.status(400).send(error);
    }
}

rutaCtrl.updateRuta = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreRuta', 'Descripcion'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }
    try {
        const ruta = await Ruta.findOne({ _id: req.params.id });

        if (!ruta) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            ruta[update] = req.body[update];
        });
        await ruta.save();

        res.send(ruta);

    } catch (error) {
        res.status(400).send(error);
    }
}

rutaCtrl.desableRuta = async (req, res) => {
    try {
        const { Estado } = req.body;
        await Ruta.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}

rutaCtrl.getRutaDisabled = async (req, res) => {
    try {
        const ruta = await Ruta.find({ Estado: false })
        res.status(200).json(ruta);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = rutaCtrl;