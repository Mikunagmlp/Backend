const express = require('express');
const router = new express.Router();
const User = require('../models/usuario');
const { enviarEmail } = require('../email/sendEmail');

router.post('/usuario/recovery', async (req, res) => {
    const email = req.body.Email;

    try {
        const user = await User.find({ Email: email });
        // console.log(user[0].Password);

        if ( user.length === 0 ) {
            res.status(404).send({ onerror: 'Correo electrónico invalido!'});
        }

        await enviarEmail( email, user[0].Password );

        res.status(200).send({ message: 'email enviado' })
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
