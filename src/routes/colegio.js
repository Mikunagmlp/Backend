const express= require('express');
const router = new express.Router();

const { crearColegio, listarColegios, updateColegio, getSearch } =  require('../controllers/colegio.controller');

router.post('/colegio/registrar', crearColegio );

router.get( '/colegios', listarColegios );

router.patch('/colegio/editar/:id', updateColegio );

router.patch( '/colegio/eliminar/:id', updateColegio );
//localhost:3000/colegio/search/?q=Colegio2
router.get( '/colegio/search/', getSearch );

module.exports= router;
