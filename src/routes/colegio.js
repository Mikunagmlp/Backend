const express= require('express');
const router = new express.Router();

router.get('/colegio/registrar',async(req,res)=>{
    res.send('Estamos en Colegio Registro');
} )

router.get('/colegio/editar',async(req,res)=>{
 res.send('Estamos en Colegio Editar')
});

module.exports= router;