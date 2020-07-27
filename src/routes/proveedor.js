const express = require('express');
const router = new express.Router();
const { createProveedor, getProveedores, getProveedor, updateProveedor, getProveedoresDisabled } = require('../controllers/proveedor.controller');

router.post('/proveedor/registrar', createProveedor);

router.get('/proveedores', getProveedores);

router.get('/proveedor/:id', getProveedor);

router.patch('/proveedor/editar/:id', updateProveedor);

router.patch('/proveedor/disable/:id', updateProveedor);

router.get('/proveedores/disabled', getProveedoresDisabled);

module.exports = router;
