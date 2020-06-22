const express = require('express');
const router = new express.Router();
const { createProveedor, getProveedores, getProveedor } = require('../controllers/proveedor.controller');

router.post('/proveedor/registrar', createProveedor);

router.get('/proveedores', getProveedores);

router.get('/proveedor/editar', async (req, res) => {
    res.send('Estamos en proveedor Editar')
});

router.get('/proveedor/:id', getProveedor);
module.exports = router;