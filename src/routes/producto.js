const express= require('express');
const router = new express.Router();

router.get('/producto/registrar',async(req,res)=>{
    res.send('Estamos en Producto Registro');
} )

router.get('/producto/editar',async(req,res)=>{
 res.send('Estamos en Producto Editar')
});

module.exports= router;