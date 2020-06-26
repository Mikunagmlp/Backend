const colegioCtrl = {};
const Colegio = require('../models/colegio');

colegioCtrl.crearColegio = async (req, res) => {
    const { NombreColegio, Ruta, Distrito, CodColegio, Turno, Categoria, CantidadAlumnos, Telefono, Direccion } = req.body;
    try {
        const newColegio = new Colegio({
            NombreColegio,
            Ruta,
            Distrito,
            CodColegio,
            Turno,
            Categoria,
            CantidadAlumnos,
            Telefono,
            Direccion
        })
        await newColegio.save();
        res.json(newColegio);
    } catch (e) {
        res.status(400).send(e);
    }
}

colegioCtrl.listarColegios = async (req, res) => {
    try {
        const colegios = await Colegio.find();

        res.status(200).send( colegios );
    } catch (e) {
        res.status(400).send(e);
    }
}

colegioCtrl.updateColegio = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreColegio', 'Ruta', 'Distrito', 'CodColegio', 'Turno', 'Categoria', 'CantidadAlumnos', 'Telefono', 'Direccion', 'Estado'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const colegio = await Colegio.findOne({ _id: req.params.id });

        if (!colegio) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            colegio[update] = req.body[update];
        });
        await colegio.save();

        res.send(colegio);

    } catch (error) {
        res.status(400).send(error);
    }

}

module.exports = colegioCtrl;
