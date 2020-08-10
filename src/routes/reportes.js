const express = require('express');
const router = new express.Router();
const{poblacionAlumnos,getProductosDetalle} = require('../controllers/reportes.controller')

router.get('/reporte/listadoproductos', getProductosDetalle);
router.get('/reporte/calculodiario/:id', poblacionAlumnos);


module.exports = router;