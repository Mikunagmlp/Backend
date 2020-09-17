const express = require('express');
const router = new express.Router();

const { listaAsignaciones, crearBoleta, listaBoletas, listaCodigoActa, firmaColegio, firmaEBA, firmaSiremu, firmaBoleta, incidenciasBoleta } = require('../controllers/boleta.controller');

router.get('/boleta/listado/asigaciones', listaAsignaciones);
router.get('/boleta/registrar/:id', crearBoleta);
router.get('/allboletas', listaBoletas);
router.get('/boleta/listado/codigoacta', listaCodigoActa);
router.post('/boleta/firma/:id', firmaBoleta);



router.patch('/boleta/aplicacion-colegio', firmaColegio);
router.patch('/boleta/aplicacion-eba', firmaEBA);
router.patch('/boleta/aplicacion-siremu', firmaSiremu);

module.exports = router;
