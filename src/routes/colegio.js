const express= require('express');
const router = new express.Router();

const { crearColegio } =  require('../controllers/colegio.controller');

router.post('/colegio/registrar', crearColegio );

router.get('/colegio/editar',async(req,res)=>{
 res.send('Estamos en Colegio Editar')
});

module.exports= router;
