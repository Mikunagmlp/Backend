const express = require('express');
const router = new express.Router();

const { createRol, getRoles, disableRol, getSearch, updateRol, getRol } = require('../controllers/rol.controller');
const passportConfig = require('../passport/local-auth');

//listar roles
router.get('/roles', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getRoles);
//localhost:3000/administracion/user/search?q=test
router.get('/rol/searchRol', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getSearch);
// post roles
router.post('/rol/create', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), createRol)
//edit roles
router.put('/rol/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateRol);
//desable roles
router.put('/rol/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), disableRol);
//obtener un rol
router.get('/rol/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getRol)

module.exports = router;
