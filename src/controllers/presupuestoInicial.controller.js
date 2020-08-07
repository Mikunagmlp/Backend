const presupuestoCtrl={};
const PresupuestoInicial=require("../models/presupuestoInicial");

presupuestoCtrl.createPresupuesto = async (req, res) => {
    try {
        const {CodigoPresupuesto, Presupuesto, Descripcion, IdUser} = req.body;
        const newPresupuesto = new PresupuestoInicial({
            CodigoPresupuesto,
            Presupuesto,
            Descripcion,
            IdUser,
        })
        await newPresupuesto.save();
        res.status(200).json(newPresupuesto);

    } catch (error) {
        res.status(400).send(error);
    }
}

presupuestoCtrl.getPresupuestos = async (req, res) => {
    try {
        const presupuesto = await PresupuestoInicial.find({ Estado: true })
        res.status(200).json(presupuesto);

    } catch (error) {
        res.status(400).send(error);
    }

}

presupuestoCtrl.updatePresupuesto = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [ 'Estado', 'Presupuesto', 'Descripcion', 'IdUser'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const presupuesto = await PresupuestoInicial.findOne({ _id: req.params.id });

        if (!presupuesto) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            presupuesto[update] = req.body[update];
        });
        await presupuesto.save();

        res.send(presupuesto);

    } catch (error) {
        res.status(400).send(error);
    }

}

presupuestoCtrl.desablePresupuesto = async (req, res) => {
    try {
        const { Estado } = req.body;
        await PresupuestoInicial.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}

presupuestoCtrl.getPresupuestosDisabled = async (req, res) => {
    try {
        const presupuesto = await PresupuestoInicial.find({ Estado: false })
        res.status(200).json(presupuesto);

    } catch (error) {
        res.status(400).send(error);
    }

}

module.exports = presupuestoCtrl;