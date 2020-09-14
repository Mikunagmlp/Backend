<<<<<<< HEAD
const express = require('express');
const router = new express.Router();

const {  crearRegisterph,listaRegisterph } = require('.//../controllers/registerph.controller');


router.post('/registerph/registrar/:id', crearRegisterph);
router.get('/registerph/listado/allregisterph', listaRegisterph);


module.exports = router;
=======
const express = require('express');
const router = new express.Router();

const {  createRegisterph,listaRegisterph } = require('.//../controllers/registerph.controller');


router.post('/registerph/registrar/:id', createRegisterph);
router.get('/registerph/listado/allregisterph', listaRegisterph);


module.exports = router;
>>>>>>> c727a96a7f3c84f3d2bc2f6c6b3601d6c0ab3ee6
