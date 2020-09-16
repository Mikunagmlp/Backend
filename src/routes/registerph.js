const express = require('express');
const router = new express.Router();

const {  createRegisterph, listaRegisterph } = require('../controllers/registerph.controller');

router.post('/registerph/registrar/:id', createRegisterph);
router.get('/registerph/listado/allregisterph', listaRegisterph);


module.exports = router;

