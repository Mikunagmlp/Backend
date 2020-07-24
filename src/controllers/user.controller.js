const userCtrl = {};
const User = require('../models/usuario');
const { update } = require('../models/usuario');
const nodemailer= require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

userCtrl.updateUser = async (req, res) => {
    const { NombreCompleto, Email, Password, Telefono, Direccion, Genero } = req.body;
    const updateUser = new User({ NombreCompleto, Email, Password, Telefono, Direccion, Genero });
    updateUser.Password = await updateUser.encryptPassword(Password);

    await User.findOneAndUpdate(req.params.id, {
        NombreCompleto: updateUser.NombreCompleto,
        Email: updateUser.Email,
        Password: updateUser.Password,
        Telefono: updateUser.Telefono,
        Direccion: updateUser.Direccion,
        Genero: updateUser.Genero
    });
    res.json(200);
}

userCtrl.resetPassword = async (req, res) => {

    if (!req.body.Email) {
        return res.status(500).json({ message: 'Email is required' });
    }

    const user = await User.findOne({
        Email: req.body.Email
    });

    if (!user) {
        return res.status(409).json({ message: 'Email does not exist' });
    }
    try {
        newPass = Math.random().toString(36).substr(2, 9);
        const userPassword = new User({Password:newPass})
        let pass = await userPassword.encryptPassword(newPass);
        const resetUser = await User.findOne({ _id: user._id });
        resetUser.Password=pass;
        await resetUser.save();
        res.send(resetUser);  
    } catch (error) {
        res.status(400).send(error);
    }

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'mikunagmlp@gmail.com',
            pass: 'mikuna2020'
        },
        tls: {
            rejectUnauthorized: false
        }
    }));
    var mailOptions = {
        to: user.Email,
        from: 'reset.mikuna@mikuna.com',
        subject: 'Cambio de Password Mikuna',
        html: 'Gracias por utilizar la recuperacion de Passwword<br/><hr/>' +
            'Su nuevo Password es :<br/>' +
            `<h1>${newPass}</h1>`+'\n\n' +
            'Atte: Team Mikuna.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
          } else {
            console.log('Email sent: ' + info.response);
          }
   });
}


module.exports = userCtrl;
