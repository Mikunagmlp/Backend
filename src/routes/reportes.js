const express = require('express');
const router = new express.Router();
const { calculoDiario, getProductosDetalle, ruteo, entregaLote, menuAprobados, productoDisponible, cambiosIncidencias, estadistico, searchColegio, consolidadoColegio, consolidadoGlobal, consolidadoProducto } = require('../controllers/reportes.controller')
const passportConfig = require('../passport/local-auth');

router.get('/reporte/listadoproductos', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), getProductosDetalle);
router.get('/reporte/calculodiario/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), calculoDiario);

//localhost:3000/reporte/ruteo/colegio?ruta=ruta001
router.get('/reporte/ruteo/colegio', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), ruteo);

//localhost:3000/reporte/entrega/lote?codigo=loteLiquido0003
router.get('/reporte/entrega/lote', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), entregaLote);

router.get('/reporte/menu/aprobado', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), menuAprobados);

router.get('/reporte/productos/disponibles', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), productoDisponible);

router.get('/reporte/cambios/incidencias', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), cambiosIncidencias);
//localhost:3000/reporte/consolidado/colegio?colegio=Brasil
router.get('/reporte/consolidado/colegio', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), consolidadoColegio);

router.get('/reporte/consolidado/global', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), consolidadoGlobal);

router.get('/reporte/consolidado/producto', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador', 'operador'), consolidadoProducto);
module.exports = router;
