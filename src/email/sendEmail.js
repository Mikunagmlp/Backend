const nodemailer = require('nodemailer');

const enviarEmail = async (email, password) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // TODO: aqui deben poner su correo electronico y su password para hacer la prueba
        // TODO: antes de hacer la prueba deben activar esto en la cuenta de gmail que enviara
        // https://myaccount.google.com/lesssecureapps entren a este link y lo activan
        auth: {
            user: 'xxx@gmail.com',
            pass: 'xxx'
        }
    });

    let mailOptions = {
        // TODO: aqui su correo que enviara, yo utilice el mio
        from: 'xxx@gmail.com',
        to: email,
        subject: 'Su password',
        text: `Aqui tiene su password: ${password}`
    }

    await  transporter.sendMail( mailOptions, function ( err, data ) {
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
