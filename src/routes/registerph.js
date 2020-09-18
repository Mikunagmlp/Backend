const express = require('express');
const router = new express.Router();
const passportConfig = require('../passport/local-auth');
const {  createRegisterph, listaRegisterph } = require('../controllers/registerph.controller');

router.post('/registerph/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), createRegisterph);
router.get('/registerph/listado/allregisterph', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), listaRegisterph);


module.exports = router;

