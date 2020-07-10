const express = require('express');
const router = new express.Router();
const { createAlmacen, desableAlmacen, getAlmacen, getAlmacenes, updateAlmacen } = require('../controllers/almacen.controller');

router.post('/almacen/registrar', createAlmacen);

router.get('/almacenes', getAlmacenes);

router.get('/almacen/:id', getAlmacen);

router.patch('/almacen/editar/:id', updateAlmacen);

router.put('/almacen/desable/:id', desableAlmacen);

module.exports = router;
