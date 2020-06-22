const express = require('express');
const router = new express.Router();
const { createProveedor, getProveedores, getProveedor, updateProveedor, desableProveedor } = require('../controllers/proveedor.controller');

router.post('/proveedor/registrar', createProveedor);

router.get('/proveedores', getProveedores);

router.get('/proveedor/:id', getProveedor);

router.put('/proveedor/editar/:id', updateProveedor);

router.put('/proveedor/desable/:id', desableProveedor);

module.exports = router;