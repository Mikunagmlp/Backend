const express = require('express');
const router = new express.Router();

const { createPermiso, disablePermiso, getPermisos, getPermiso, updatePermiso } = require('../controllers/permiso.controller');
const passportConfig = require('../passport/local-auth');

router.get('/permisos', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), getPermisos)

router.post('/permiso/create', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), createPermiso)
// //edit roles
router.put('/permiso/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), updatePermiso);
// //desable roles
router.put('/permiso/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), disablePermiso);
// //obtener un rol
router.get('/permiso/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll'), getPermiso)

module.exports = router;