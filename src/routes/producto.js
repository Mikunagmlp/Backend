const express = require('express');
const router = new express.Router();
const { createProducto, updateProducto, getProducto, getProductos, desableProducto, getProductosDisabled, getProductosMenu } = require('../controllers/producto.controller');

router.post('/producto/registrar', createProducto);

router.get('/productos', getProductos);

router.get('/productos/generarMenu', getProductosMenu)

router.get('/producto/:id', getProducto);

router.patch('/producto/editar/:id', updateProducto);

router.put('/producto/desable/:id', desableProducto);

router.get('/productos/disabled', getProductosDisabled);

module.exports = router;
