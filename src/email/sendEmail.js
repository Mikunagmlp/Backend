const nodemailer = require('nodemailer');
const User = require('../models/usuario');
const smtpTransport = require('nodemailer-smtp-transport');
const enviarEmail = async (email, password) => {
    let resetUser = "";
    let newPass = "";
    try {
        newPass = Math.random().toString(36).substr(2, 9);
        const userPassword = new User({ Password: newPass })
        let pass = await userPassword.encryptPassword(newPass);
        resetUser = await User.findOne({ Email: email });
        resetUser.Password = pass;
        await resetUser.save();

    } catch (error) {
        res.status(400).send(error);
    }

    let transporter = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'mikunagmlp@gmail.com',
            pass: 'mikuna2020'
        },
        tls: {
            rejectUnauthorized: false
        }
    }));

    let mailOptions = {
        to: resetUser.Email,
        from: 'reset.mikuna@mikuna.com',
        subject: 'Cambio de Password Mikuna',
        html: 'Gracias por utilizar la recuperacion de Passwword<br/><hr/>' +
            'Su nuevo Password es :<br/>' +
            `<h1>${newPass}</h1>` + '\n\n' +
            'Atte: Team Mikuna.\n'
    }

    await transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error occurs', err)
        } else {
            console.log('Email sent!');
        }
    })
}

module.exports = {
    enviarEmail
}
