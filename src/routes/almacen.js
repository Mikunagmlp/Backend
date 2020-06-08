const express= require('express');
const router = new express.Router();

router.get('/almacen/registrar',async(req,res)=>{
    res.send('Estamos en Almacen Registro');
} )

router.get('/almacen/editar',async(req,res)=>{
 res.send('Estamos en Almacen Editar')
});

module.exports= router;