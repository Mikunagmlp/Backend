const express = require('express');
const router = new express.Router();
const { createProveedor, getProveedores, getProveedor, updateProveedor, getProveedoresDisabled } = require('../controllers/proveedor.controller');
const passportConfig = require('../passport/local-auth');
router.post('/proveedor/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), createProveedor);

router.get('/proveedores', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getProveedores);

router.get('/proveedor/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getProveedor);

router.patch('/proveedor/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateProveedor);

router.patch('/proveedor/disable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateProveedor);

router.get('/proveedores/disabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getProveedoresDisabled);

module.exports = router;
