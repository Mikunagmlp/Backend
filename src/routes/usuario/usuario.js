const express = require('express');
// creamos el router para todas nuestras peticiones
const passportConfig = require('../../passport/local-auth');
const router = new express.Router();
const { updateUser, resetPassword } = require('../../controllers/user.controller');

router.put('/user/edit/:id', passportConfig.verifiToken, updateUser);

router.get('/user/profile',passportConfig.verifiToken, (req, res ) => {
    const user = req.user;
    // console.log(user);
    res.status(200).send(user);
});

router.patch('/user/reserpassword',resetPassword);

module.exports = router;
