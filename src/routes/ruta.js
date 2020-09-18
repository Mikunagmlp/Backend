const express = require('express');
const router = new express.Router();
const { createRuta, desableRuta, getRuta, getRutaDisabled, getRutas, updateRuta } = require('../controllers/ruta.controller');
const passportConfig = require('../passport/local-auth');

router.post('/ruta/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), createRuta);

router.get('/ruta/lista', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva', 'transporte'), getRutas);

router.get('/ruta/getdetails/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), getRuta);

router.patch('/ruta/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), updateRuta);

router.put('/ruta/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), desableRuta);

router.get('/ruta/disabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), getRutaDisabled);

module.exports = router;
