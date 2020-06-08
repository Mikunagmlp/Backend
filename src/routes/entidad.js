const express= require('express');
const router = new express.Router();

router.get('/entidad/registrar',async(req,res)=>{
    res.send('Estamos en Entidad Registro');
} )

router.get('/entidad/editar',async(req,res)=>{
 res.send('Estamos en entidad Editar')
});

module.exports= router;