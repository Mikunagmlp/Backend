const express = require('express');
const router = new express.Router();
const { createAlmacen, desableAlmacen, getAlmacen, getAlmacenes, updateAlmacen, getAlmacenesDisabled } = require('../controllers/almacen.controller');
const { createPresupuesto, getPresupuestos, updatePresupuesto, desablePresupuesto, getPresupuestosDisabled } = require('../controllers/presupuestoInicial.controller');
const passportConfig = require('../passport/local-auth');

router.post('/almacen/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), createAlmacen);

router.get('/almacenes', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getAlmacenes);

router.get('/almacen/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getAlmacen);

router.patch('/almacen/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updateAlmacen);

router.put('/almacen/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), desableAlmacen);

router.get('/almacenes/disabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getAlmacenesDisabled);

router.post('/almacens/presupuesto/registrar', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), createPresupuesto);

router.get('/almacens/presupuestos', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getPresupuestos);

router.patch('/almacens/presupuesto/editar/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), updatePresupuesto);

router.put('/almacens/presupuesto/desable/:id', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), desablePresupuesto);

router.get('/almacens/presupuesto/desabled', passportConfig.verifiToken, passportConfig.isValiPermiso('rootAll', 'administrador'), getPresupuestosDisabled);
module.exports = router;
