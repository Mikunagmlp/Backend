const express = require('express');
const router = new express.Router();
const { calculoDiario, getProductosDetalle, ruteo, entregaLote, menuAprobados, productoDisponible, cambiosIncidencias, estadistico, searchColegio, consolidadoColegio } = require('../controllers/reportes.controller')

router.get('/reporte/listadoproductos', getProductosDetalle);
router.get('/reporte/calculodiario/:id', calculoDiario);

//localhost:3000/reporte/ruteo/colegio?ruta=ruta001
router.get('/reporte/ruteo/colegio', ruteo);

//localhost:3000/reporte/entrega/lote?codigo=loteLiquido0003
router.get('/reporte/entrega/lote', entregaLote);

router.get('/reporte/menu/aprobado', menuAprobados);

router.get('/reporte/productos/disponibles', productoDisponible);

router.get('/reporte/cambios/incidencias', cambiosIncidencias);
//localhost:3000/reporte/consolidado/colegio?colegio=Brasil
router.get('/reporte/consolidado/colegio', consolidadoColegio);

module.exports = router;
