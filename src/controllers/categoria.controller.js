const categoriaCtrl = {};
const Categoria = require('../models/categoria');
const permiso = require('../models/permiso');

categoriaCtrl.createCategoria = async (req, res) => {
    const { NombreRol, Description, Estado, IdUser, Permiso } = req.body;
    console.log(Permiso);
    const newCategoria = new Categoria({
        NombreRol,
        Description,
        Estado,
        IdUser,
        Permiso
    })
    await newCategoria.save();
    res.json(newCategoria);
}

module.exports = categoriaCtrl;