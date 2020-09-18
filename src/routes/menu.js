const express = require('express');
const router = new express.Router();
const { createMenu, getSolidoInicial, getLiquidoInicial, getSolidoPrimario, getLiquidoPrimario,
    getSolidoSegundario, getLiquidoSegundario, updateMenu, listarMenuAprobado, listarMenuNoAprobado,
    listarMenuEbaNoAprobado, listarMenuEbaAprobado, listarMenuUnaceNoAprobado, aprobarMenuEba,
    aprobarMenuUnace, listarMenu, listarMenuUnaceAprobado } = require('../controllers/menu.controller');

const { createAsignacion, updateAsignacion, listarAsignacionCodigo,
    listarAsignacionColegio, listarAsignaciones } = require('../controllers/asignacion.controller');

const passportConfig = require('../passport/local-auth');

router.post('/menu/registrar/menudiario', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), createMenu);
router.patch('/menu/update/menudiario/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), updateMenu);

router.get('/menu/listado/aprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), listarMenuAprobado);
router.get('/menu/listado/noaprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), listarMenuNoAprobado);

router.get('/listarMenu/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), listarMenu);
router.get('/menu/listado/eba-no-aprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva'), listarMenuEbaNoAprobado);
router.get('/menu/listado/eba-aprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva'), listarMenuEbaAprobado);

router.get('/menu/listado/unace-no-aprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), listarMenuUnaceNoAprobado);
router.get('/menu/listado/unace-aprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), listarMenuUnaceAprobado);

router.patch('/menu/aprobar/menueba/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva'), aprobarMenuEba);
router.patch('/menu/aprobar/menuunace/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), aprobarMenuUnace);

router.get('/menu/productos/getSolidoInicial', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), getSolidoInicial);
router.get('/menu/productos/getLiquidoInicial', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), getLiquidoInicial);
router.get('/menu/productos/getSolidoPrimario', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), getSolidoPrimario);
router.get('/menu/productos/getLiquidoPrimario', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), getLiquidoPrimario);
router.get('/menu/productos/getSolidoSegundario', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), getSolidoSegundario);
router.get('/menu/productos/getLiquidoSegundario', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'unace'), getLiquidoSegundario);

router.post('/menu/asignacion/registrar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva', 'siremo'), createAsignacion);
router.get('/listar/asignaciones', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva', 'transporte'), listarAsignaciones)
router.patch('/menu/asignacion/update/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'siremo'), updateAsignacion);
router.get('/menu/asignacion/listcodigo', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva', 'transporte', 'siremo'), listarAsignacionCodigo);
router.get('/menu/asignacion/listcolegio', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'eva', 'transporte', 'siremo'), listarAsignacionColegio);
module.exports = router;
