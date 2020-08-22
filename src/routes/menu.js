const express = require('express');
const router = new express.Router();
const { createMenu,getSolidoInicial, getLiquidoInicial,getSolidoPrimario, getLiquidoPrimario,getSolidoSegundario,getLiquidoSegundario,updateMenu,listarMenuAprobado,listarMenuNoAprobado,listarMenuEba,listarMenuUnace,aprobarMenuEba, aprobarMenuUnace } = require('../controllers/menu.controller');

router.post('/menu/registrar/menudiario', createMenu);
router.patch('/menu/update/menudiario/:id', updateMenu);

router.get('/menu/listado/aprobado', listarMenuAprobado);
router.get('/menu/listado/noaprobado', listarMenuNoAprobado);
router.get('/menu/listado/eba', listarMenuEba);
router.get('/menu/listado/unace', listarMenuUnace);

router.patch('/menu/aprobar/menueba/:id', aprobarMenuEba);
router.patch('/menu/aprobar/menuunace/:id', aprobarMenuUnace);

router.get('/menu/productos/getSolidoInicial', getSolidoInicial);
router.get('/menu/productos/getLiquidoInicial', getLiquidoInicial);
router.get('/menu/productos/getSolidoPrimario', getSolidoPrimario);
router.get('/menu/productos/getLiquidoPrimario', getLiquidoPrimario);
router.get('/menu/productos/getSolidoSegundario', getSolidoSegundario);
router.get('/menu/productos/getLiquidoSegundario', getLiquidoSegundario);

module.exports = router;
