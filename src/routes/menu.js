const express = require('express');
const router = new express.Router();
const { createMenu, getSolidoInicial, getLiquidoInicial, getSolidoPrimario, getLiquidoPrimario,
    getSolidoSegundario, getLiquidoSegundario, updateMenu, listarMenuAprobado, listarMenuNoAprobado,
    listarMenuEbaNoAprobado, listarMenuEbaAprobado, listarMenuUnace, aprobarMenuEba,
    aprobarMenuUnace, listarMenu } = require('../controllers/menu.controller');

const { createAsignacion, updateAsignacion,listarAsignacionCodigo,
    listarAsignacionColegio } = require('../controllers/asignacion.controller');

router.post('/menu/registrar/menudiario', createMenu);
router.patch('/menu/update/menudiario/:id', updateMenu);

router.get('/menu/listado/aprobado', listarMenuAprobado);
router.get('/menu/listado/noaprobado', listarMenuNoAprobado);

router.get('/listarMenu/:id', listarMenu);
router.get('/menu/listado/eba-no-aprobado', listarMenuEbaNoAprobado);
router.get('/menu/listado/eba-aprobado', listarMenuEbaAprobado);

router.get('/menu/listado/unace', listarMenuUnace);

router.patch('/menu/aprobar/menueba/:id', aprobarMenuEba);
router.patch('/menu/aprobar/menuunace/:id', aprobarMenuUnace);

router.get('/menu/productos/getSolidoInicial', getSolidoInicial);
router.get('/menu/productos/getLiquidoInicial', getLiquidoInicial);
router.get('/menu/productos/getSolidoPrimario', getSolidoPrimario);
router.get('/menu/productos/getLiquidoPrimario', getLiquidoPrimario);
router.get('/menu/productos/getSolidoSegundario', getSolidoSegundario);
router.get('/menu/productos/getLiquidoSegundario', getLiquidoSegundario);

router.post('/menu/asignacion/registrar/:id', createAsignacion);
router.patch('/menu/asignacion/update/:id', updateAsignacion);
router.get('/menu/asignacion/listcodigo', listarAsignacionCodigo);
router.get('/menu/asignacion/listcolegio', listarAsignacionColegio);
module.exports = router;
