const express = require('express');
const router = new express.Router();
const { createProducto, updateProducto, getProducto, getProductos, desableProducto, getProductosDisabled } = require('../controllers/producto.controller');
const passportConfig = require('../passport/local-auth');

router.post('/producto/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), createProducto);

router.get('/productos', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getProductos);

router.get('/producto/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getProducto);

router.patch('/producto/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateProducto);

router.put('/producto/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), desableProducto);

router.get('/productos/disabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getProductosDisabled);

module.exports = router;
