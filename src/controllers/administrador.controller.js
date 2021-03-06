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

administradorCtrl.getRolesUsuario = async (req, res) => {

        let q = req.query.q;
        let userRol = [];
        console.log(q)
        const userRoles = await User.find({ Estado: true })
            .populate('Rols.IdRol')
            .exec();

        userRoles.forEach(element => {
            element.Rols.forEach(r => {
                if (r.IdRol.NombreRol==q) {     
                 userRol.push(element.NombreCompleto);   
                }
            });
            
        });

        res.status(200).json(userRol);
}

administradorCtrl.getUsuarioDisabled = async (req, res) => {
    try {
        // let obj;
        const users = await User.find({ Estado: false });
            // .populate('Rols.IdRol')
            // .exec((err, userRol) => {
            //     userRol.forEach(data => {
            //          obj = {
            //             _id: data._id,
            //             NombreCompleto: data.NombreCompleto,
            //             Email: data.Email,
            //             Telefono: data.Telefono,
            //             Direccion: data.Direccion,
            //             Genero: data.Genero,
            //             Estado: data.Estado,
            //             Rols: data.Rols
            //         }
            //     });
            //     res.status(200).json(obj);
            // });

        res.status(200).send(users);

    } catch (e) {
        res.status(400).send(e);
    }
}


module.exports = administradorCtrl;
