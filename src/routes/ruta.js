const express = require('express');
const router = new express.Router();
const { createRuta, desableRuta, getRuta, getRutaDisabled, getRutas, updateRuta } = require('../controllers/ruta.controller');

router.post('/ruta/registrar', createRuta);

router.get('/ruta/lista', getRutas);

router.get('/ruta/getdetails/:id', getRuta);

router.patch('/ruta/editar/:id', updateRuta);

router.put('/ruta/desable/:id', desableRuta);

router.get('/ruta/disabled', getRutaDisabled);

module.exports = router;
