const express = require('express');
const router = new express.Router();
const { createProducto, updateProducto, getProducto, getProductos, desableProducto } = require('../controllers/producto.controller');

router.post('/producto/registrar', createProducto);

router.get('/productos', getProductos);

router.get('/producto/:id', getProducto);

router.put('/producto/editar/:id', updateProducto);

router.put('/producto/desable/:id', desableProducto);

module.exports = router;