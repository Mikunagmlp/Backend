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

colegioCtrl.updateUser = async (req, res) => {
    const { NombreColegio, Ruta, Distrito,CodColegio, Turno, Categoria, CantidadAlumnos,Telefono, Direccion, Estado } = req.body;
    const updateUser = new Colegio({NombreColegio,Ruta,  Distrito, CodColegio,Turno, Categoria, CantidadAlumnos,Telefono, Direccion, Estado });
    updateUser.Password = await updateUser.encryptPassword(Password);

    await Colegio.findOneAndUpdate(req.params.id, {
        NombreColegio:updateUser.NombreColegio,
        Ruta:updateUser.Ruta,
        Distrito:updateUser.Distrito,
        CodColegio:updateUser.CodColegio,
        Turno:updateUser.Turno,
        Categoria:updateUser.Categoria,
        CantidadAlumnos:updateUser.CantidadAlumnos,
        Telefono:updateUser.Telefono,
        Direccion:updateUser.Direccion,
        Estado:updateUser.Estado,
    });
    res.json(200);
}

module.exports = colegioCtrl;
