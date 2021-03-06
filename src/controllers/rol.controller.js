const rolCtrl = {};
const Rol = require('../models/rol');

rolCtrl.createRol = async (req, res) => {
    const { NombreRol, Description, Estado, IdUser, Permiso } = req.body;
    const newRol = new Rol({
        NombreRol,
        Description,
        Estado,
        IdUser,
        Permiso
    })
    await newRol.save();
    res.json(newRol);
};

rolCtrl.getRoles = async (req, res) => {
    try {
        const roles = await Rol.find({ Estado: true });
        res.status(200).send(roles);
    } catch (e){
        console.log(e);
        res.status(404).send(e);
    }
};

rolCtrl.getRol = async (req, res) => {
    const rol = await Rol.findById(req.params.id);
    res.json(rol);
};

rolCtrl.updateRol = async (req, res) => {
    const { NombreRol, Description, Estado, IdUser, Permiso } = req.body;
    await Rol.findOneAndUpdate(req.params.id, {
        NombreRol,
        Description,
        Estado,
        IdUser,
        Permiso
    });
    res.status(200).send({ message: 'Rol actualizado' });
}

rolCtrl.disableRol = async (req, res) => {
    const { Estado } = req.body;
    await Rol.findOneAndUpdate(req.params.id, {
        Estado
    });
    res.status(200).send({ message: 'rol desactivado' });
}

rolCtrl.getSearch = async (req, res, next) => {
    let q = req.query.q;
    await Rol.find({
        NombreRol: {
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
                    data.forEach(rol => {
                        let obj = {
                            _id: rol._id,
                            NombreRol: rol.NombreRol,
                            Description: rol.Description,
                            Permiso: rol.Permiso
                        };
                        result.push(obj);
                    });

                }

            }
            res.json(result);
        }).limit(10);

}
module.exports = rolCtrl;
