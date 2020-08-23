const express = require('express');
const router = new express.Router();
const{calculoDiario,getProductosDetalle} = require('../controllers/reportes.controller')

router.get('/reporte/listadoproductos', getProductosDetalle);
router.get('/reporte/calculodiario/:id', calculoDiario);


module.exports = router;