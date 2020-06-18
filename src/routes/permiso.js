const express = require('express');
const router = new express.Router();

const { createPermiso, disablePermiso, getPermisos, getPermiso, updatePermiso } = require('../controllers/permiso.controller');

router.get('/permisos', getPermisos)

router.post('/permiso/create', createPermiso)
// //edit roles
router.put('/permiso/editar/:id', updatePermiso);
// //desable roles
router.put('/permiso/desable/:id', disablePermiso);
// //obtener un rol
router.get('/permiso/:id', getPermiso)

module.exports = router;