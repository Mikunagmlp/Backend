const express = require('express');
const router = new express.Router();

const {  crearRegisterph,listaRegisterph } = require('.//../controllers/registerph.controller');


router.post('/registerph/registrar/:id', crearRegisterph);
router.get('/registerph/listado/allregisterph', listaRegisterph);


module.exports = router;
