const express = require('express');
const router = new express.Router();
const passportConfig = require('../passport/local-auth');

const { crearColegio, listarColegios, updateColegio, getSearch, listarColegiosDisabled } = require('../controllers/colegio.controller');

router.post('/colegio/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), crearColegio);

router.get('/colegios', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), listarColegios);

router.patch('/colegio/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), updateColegio);

router.patch('/colegio/eliminar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateColegio);

//localhost:3000/colegio/search?q=Colegio2
router.get('/colegio/search', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), getSearch);

router.get('/colegios/disabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'eva'), listarColegiosDisabled);

module.exports = router;
