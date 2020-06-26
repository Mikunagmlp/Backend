const express= require('express');
const router = new express.Router();

const { crearColegio, listarColegios } =  require('../controllers/colegio.controller');

router.post('/colegio/registrar', crearColegio );

router.get( '/colegios', listarColegios );

router.patch('/colegio/editar',async(req,res)=>{
 res.send('Estamos en Colegio Editar')
});

module.exports= router;
