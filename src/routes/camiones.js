const express = require('express');
const router = new express.Router();
const { createCamion, updateCamion, getCamion, getCamiones, desableCamion, getCamionesDisabled } = require('../controllers/camiones.controller');
const passportConfig = require('../passport/local-auth');

router.post('/camion/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), createCamion);

router.get('/camiones', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getCamiones);

router.get('/camion/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getCamion);

router.patch('/camion/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateCamion);

router.put('/camion/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), desableCamion);

router.get('/camiones/disabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getCamionesDisabled);

module.exports = router;
