const userCtrl = {};
const User = require('../models/usuario');

userCtrl.updateUser = async (req, res) => {
    const { NombreCompleto, Email, Password, Telefono, Direccion,Genero } = req.body;
    const updateUser = new User({ NombreCompleto, Email, Password, Telefono, Direccion, Genero});
    updateUser.Password = await updateUser.encryptPassword(Password);

    await User.findOneAndUpdate(req.params.id, {
        NombreCompleto:updateUser.NombreCompleto,
        Email:updateUser.Email,
        Password:updateUser.Password,
        Telefono:updateUser.Telefono,
        Direccion:updateUser.Direccion,
        Genero:updateUser.Genero
    });
    res.json(200);
}

module.exports = userCtrl;
