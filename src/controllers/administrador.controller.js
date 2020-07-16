const administradorCtrl = {};
const User = require('../models/usuario');

administradorCtrl.getSearch = async (req, res, next) => {
    let q = req.query.q;
    let userPermiso = [];
    await User.find(
        {
            NombreCompleto: {
                $regex: new RegExp(q),
                $options: 'i'
            }
        }, { __v: 0 })
        .populate('Rols.IdRol')
        .exec((err, userRol) => {
            if (!err) {
                if (userRol && userRol.length && userRol.length > 0) {

                    userRol.forEach(data => {
                        let obj = {
                            _id: data._id,
                            NombreCompleto: data.NombreCompleto,
                            Email: data.Email,
                            Telefono: data.Telefono,
                            Direccion: data.Direccion,
                            Genero: data.Genero,
                            Estado: data.Estado,
                            Rols: data.Rols
                        };

                        userPermiso.push(obj);
                    });
                }
            }
            res.status(200).json(userPermiso);
        });

}

administradorCtrl.getUsuario = async (req, res) => {
    try {
        let obj;
        await User.find({ _id: req.params.id, Estado: true })
            .populate('Rols.IdRol')
            .exec((err, userRol) => {
                userRol.forEach(data => {
                     obj = {
                        _id: data._id,
                        NombreCompleto: data.NombreCompleto,
                        Email: data.Email,
                        Telefono: data.Telefono,
                        Direccion: data.Direccion,
                        Genero: data.Genero,
                        Estado: data.Estado,
                        Rols: data.Rols
                    }
                });
                res.status(200).json(obj);
            });

    } catch (e) {
        res.status(400).send(e);
    }
}


module.exports = administradorCtrl;
