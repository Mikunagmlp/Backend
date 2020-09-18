const jwk = require('jsonwebtoken');
const User = require('../models/usuario');

exports.isSignin = async (req, res, next) => {

    const { Email, Password } = req.body;
    const user = await User.findOne({ Email: Email });
    if (!user) {
        return res.status(404).send("Email does't exist")
    }
    const validPassword = await user.comparePassword(Password)
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null });
    }
    const token = jwk.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    //req.user = user;
    req.token = token;
    res.status(200).json({ user, token });
    return next();
}


exports.verifiToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'not token provided'
        });
    }
    const decodec = jwk.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodec.id, { Password: 0 }).populate('IdRol').exec();;
    if (!user) {
        return res.status(404).send('not user found');
    }
    //req.token = token;
    req.user = user;
    return next();
}

exports.isValiPermiso = (p, u, t, s) => async (req, res, next) => {
    const data = await User.find({ _id: req.user.id })
        .populate('Rols.IdRol').exec();
    if (data[0].Rols.length > 0) {
        for (i in data[0].Rols) {
            let obtRoles = data[0].Rols[i].IdRol;

            for (r in obtRoles.Permiso) {
                if (obtRoles.Permiso[r].Idpermiso == p || obtRoles.Permiso[r].Idpermiso == u || obtRoles.Permiso[r].Idpermiso == t || obtRoles.Permiso[r].Idpermiso == s) {
                    return next();
                }
            }
            return res.status(401).json({
                ok: false,
                error: 'No tiene permiso'
            });
        }
    }
    else {
        return res.status(401).json({
            ok: false,
            error: 'No tiene rol'
        });
    }
}
