const administradorCtrl = {};
const User = require('../models/usuario');

administradorCtrl.getSearch = async (req, res, next) => {
    let q = req.query.q;
    await User.find({
        NombreCompleto: {
            $regex: new RegExp(q),
            $options: 'i'
        }
    }
        , {
            __v: 0
        }, function (err, data) {
            var result = [];
            if (!err) {
                if (data && data.length && data.length > 0) {
                    data.forEach(user => {
                        let obj = {
                            idUser: user._id,
                            NombreCompleto: user.NombreCompleto,
                            Email: user.Email,
                            Password: user.Password,
                            Telefono: user.Telefono,
                            Direccion: user.Direccion,
                            Genero: user.Genero,
                            Estado: user.Estado,
                        };
                        result.push(obj);
                    });

                }

            }
            res.json(result);
        }).limit(10);
}
module.exports = administradorCtrl;