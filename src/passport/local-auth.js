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
        expiresIn: 60 * 60 * 24
    });
    //req.user = user;
    req.token = token;
    res.json({ auth: true, token });
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

exports.isValiAdminCreate = async (req, res) => {
    const data = await User.find({ _id: req.user.id })
        .populate('IdRol').exec();

    if (data[0].IdRol.Permiso.length > 0) {
        for (i in data[0].IdRol.Permiso) {
            if (data[0].IdRol.Permiso[i].Idpermiso == 'AdminCreate') {
                return res.status(200).json(data);
            }
        }
        return res.status(401).json({
            ok: false,
            error: 'No tiene permiso'
        });
    } else {
        return res.status(401).json({
            ok: false,
            error: 'No tiene rol'
        });
    }
}
