const express = require('express');
// creamos el router para todas nuestras peticiones
const passportConfig = require('../../passport/local-auth');
const router = new express.Router();
const { updateUser } = require('../../controllers/user.controller');

router.put('/user/edit/:id', passportConfig.isAuthenticated, updateUser);


router.get('/user/profile',passportConfig.isAuthenticated, (req, res, next) => {
    const user = req.user;
    console.log(user);
    res.json({
        status: 'ok',
        Email:user.Email,
    })
});

module.exports = router;
