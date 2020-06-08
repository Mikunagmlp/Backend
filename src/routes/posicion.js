const express= require('express');
const router = new express.Router();

router.get('/posicion/registrar',async(req,res)=>{
    res.send('Estamos en posicion Registro');
} )

router.get('/posicion/editar',async(req,res)=>{
 res.send('Estamos en posicion Editar')
});

module.exports= router;