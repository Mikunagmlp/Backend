const express = require('express');
const router = new express.Router();
const { createAlmacen, desableAlmacen, getAlmacen, getAlmacenes, updateAlmacen,getAlmacenesDisabled } = require('../controllers/almacen.controller');
const { createPresupuesto, getPresupuestos, updatePresupuesto, desablePresupuesto, getPresupuestosDisabled } = require('../controllers/presupuestoInicial.controller');

router.post('/almacen/registrar', createAlmacen);

router.get('/almacenes', getAlmacenes);

router.get('/almacen/:id', getAlmacen);

router.patch('/almacen/editar/:id', updateAlmacen);

router.put('/almacen/desable/:id', desableAlmacen);

router.get('/almacenes/disabled', getAlmacenesDisabled);

router.post('/almacens/presupuesto/registrar', createPresupuesto);

router.get('/almacens/presupuestos', getPresupuestos);

router.patch('/almacens/presupuesto/editar/:id', updatePresupuesto);

router.put('/almacens/presupuesto/desable/:id',desablePresupuesto);

router.get('/almacens/presupuesto/desabled',getPresupuestosDisabled);
module.exports = router;
