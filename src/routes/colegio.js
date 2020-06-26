const express= require('express');
const router = new express.Router();

const { crearColegio, listarColegios, updateColegio } =  require('../controllers/colegio.controller');

router.post('/colegio/registrar', crearColegio );

router.get( '/colegios', listarColegios );

router.patch('/colegio/editar/:id', updateColegio );

module.exports= router;
