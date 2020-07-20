const express = require('express');
const router = new express.Router();
const { createCamion, updateCamion, getCamion, getCamiones, desableCamion } = require('../controllers/camiones.controller');

router.post('/camion/registrar', createCamion);

router.get('/camiones', getCamiones);

router.get('/camion/:id', getCamion);

router.patch('/camion/editar/:id', updateCamion);

router.put('/camion/desable/:id', desableCamion);

module.exports = router;
