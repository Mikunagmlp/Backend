const permisoCtrl = {};
const Permiso = require('../models/permiso');

permisoCtrl.createPermiso = async (req, res) => {
    const { NombrePermiso, Description, Estado, IdUser } = req.body;
    const newPermiso = new Permiso({
        NombrePermiso,
        Description,
        Estado,
        IdUser,
    })
    await newPermiso.save();
    res.json(newPermiso);
};

permisoCtrl.getPermisos = async (req, res) => {
    const permisos = await Permiso.find({ Estado: true });
    res.json(permisos);
};

permisoCtrl.getPermiso = async (req, res) => {
    const permiso = await Permiso.findById(req.params.id);
    res.json(permiso);
};

permisoCtrl.updatePermiso = async (req, res) => {
    const { NombrePermiso, Description } = req.body;
    await Permiso.findOneAndUpdate(req.params.id, {
        NombrePermiso,
        Description,
    });
    res.json(200);
}

permisoCtrl.disablePermiso = async (req, res) => {
    const { Estado } = req.body;
    await Permiso.findOneAndUpdate(req.params.id, {
        Estado
    });
    res.json(200);
}

module.exports = permisoCtrl;