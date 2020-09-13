const express = require('express');
const router = new express.Router();

const { listaAsignaciones, crearBoleta, listaBoletas, listaCodigoActa, firmaColegio, firmaEBA, firmaSiremu, firmaBoleta } = require('.//../controllers/boleta.controller');

router.get('/boleta/listado/asigaciones', listaAsignaciones);
router.post('/boleta/registrar/:id', crearBoleta);
router.get('/boleta/listado/allboletas', listaBoletas);
router.get('/boleta/listado/codigoacta', listaCodigoActa);
router.post('/boleta/firma/:id', firmaBoleta);

router.post('/boleta/aplicacion-colegio', firmaColegio);
router.post('/boleta/aplicacion-eba', firmaEBA);
router.post('/boleta/aplicacion-siremu', firmaSiremu);

module.exports = router;
