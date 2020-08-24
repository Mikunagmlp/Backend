const express = require('express');
const router = new express.Router();

const { listaAsignaciones, crearBoleta,listaBoletas,listaCodigoActa } = require('.//../controllers/boleta.controller');

router.get('/boleta/listado/asigaciones', listaAsignaciones);
router.post('/boleta/registrar/:id', crearBoleta);
router.get('/boleta/listado/allboletas', listaBoletas);
router.get('/boleta/listado/codigoacta', listaCodigoActa);

module.exports = router;
