const express = require('express');
const router = new express.Router();
const { calculoDiario, getProductosDetalle,ruteo } = require('../controllers/reportes.controller')

router.get('/reporte/listadoproductos', getProductosDetalle);
router.get('/reporte/calculodiario/:id', calculoDiario);
router.get('/reporte/ruteo/colegio', ruteo);

module.exports = router;