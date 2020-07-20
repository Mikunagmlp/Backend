const camionCtrl = {};
const Camion = require('../models/camiones');

camionCtrl.createCamion = async (req, res) => {
    try {
        const { Codigo, NombreConductor, Ruta, NumeroPlaca, Modelo, IdUser} = req.body;
        const newCamion = new Camion({
              Codigo,
	      NombreConductor,
	      Ruta,
	      NumeroPlaca,
	      Modelo,
	      IdUser
        })
        await newCamion.save();
        res.status(200).json(newCamion);
    } catch (error) {
        res.status(400).send(error);
    }
}

camionCtrl.getCamiones = async (req, res) => {
    try {
        const camion = await Camion.find({ Estado: true })
        res.status(200).json(camion);
    } catch (error) {
        res.status(400).send(error);
    }
}

camionCtrl.getCamion = async (req, res) => {
    try {
        const camion = await Camion.findById(req.params.id)
        res.status(200).json(camion);
    } catch (error) {
        res.status(400).send(error);
    }
}


camionCtrl.updateCamion = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['Codigo', 'NombreConductor', 'Ruta', 'NumeroPlaca', 'Modelo', 'IdUser'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const camion = await Camion.findOne({ _id: req.params.id });

        if (!camion) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            camion[update] = req.body[update];
        });
        await camion.save();

        res.send(camion);

    } catch (error) {
        res.status(400).send(error);
    }

}

camionCtrl.desableCamion = async (req, res) => {
    try {
        const { Estado } = req.body;
        await Camion.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = camionCtrl;
