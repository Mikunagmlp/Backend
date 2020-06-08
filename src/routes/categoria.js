const express= require('express');
const router = new express.Router();

router.get('/categoria/registrar',async(req,res)=>{
    res.send('Estamos en categoria Registro');
} )

router.get('/categoria/editar',async(req,res)=>{
 res.send('Estamos en categoria Editar')
});

module.exports= router;