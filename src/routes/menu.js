const express = require('express');
const router = new express.Router();
const { createMenu,getSolidoInicial, getLiquidoInicial,getSolidoPrimario, getLiquidoPrimario,getSolidoSegundario,getLiquidoSegundario } = require('../controllers/menu.controller');

router.post('/menu/registrar/menudiario', createMenu);

router.get('/menu/productos/getSolidoInicial', getSolidoInicial);
router.get('/menu/productos/getLiquidoInicial', getLiquidoInicial);
router.get('/menu/productos/getSolidoPrimario', getSolidoPrimario);
router.get('/menu/productos/getLiquidoPrimario', getLiquidoPrimario);
router.get('/menu/productos/getSolidoSegundario', getSolidoSegundario);
router.get('/menu/productos/getLiquidoSegundario', getLiquidoSegundario);

// router.get('/producto/:id', getProducto);

// router.patch('/producto/editar/:id', updateProducto);

// router.put('/producto/desable/:id', desableProducto);

// router.get('/productos/disabled', getProductosDisabled);

module.exports = router;
