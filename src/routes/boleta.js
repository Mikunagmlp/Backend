const express = require('express');
const router = new express.Router();
const passportConfig = require('../passport/local-auth');

const { listaAsignaciones, crearBoleta, listaBoletas,
    listaCodigoActa, firmaColegio, firmaEBA, firmaSiremu,
    firmaBoleta, incidenciasBoleta, firmaEbaImage, firmaSiremuImage,
    firmaColegioImage } = require('../controllers/boleta.controller');

router.get('/boleta/listado/asigaciones', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), listaAsignaciones);
router.get('/boleta/registrar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), crearBoleta);
router.get('/allboletas', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), listaBoletas);
router.get('/boleta/listado/codigoacta', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), listaCodigoActa);
router.post('/boleta/firma/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaBoleta);

router.patch('/boleta/aplicacion-colegio', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaColegio);
router.patch('/boleta/aplicacion-eba', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaEBA);
router.patch('/boleta/aplicacion-siremu', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaSiremu);

router.get('/firmaColegio/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaColegioImage);
router.get('/firmaSiremu/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaSiremuImage);
router.get('/firmaEba/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), firmaEbaImage);

module.exports = router;
