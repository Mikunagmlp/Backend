const express = require('express');
// creamos el router para todas nuestras peticiones
const passportConfig = require('../../passport/local-auth');

const router = new express.Router();

const User = require('../../models/usuario');
// token
const bcrypt = require('bcryptjs');

router.get('/user/edit', passportConfig.isAuthenticated, (req, res, next) => {
    const user = req.user;
    console.log(user);
    res.json({
        status: 'ok',
        message:'estamos en User/edit',
        Email: user.Email,
    })
});

module.exports = router;
