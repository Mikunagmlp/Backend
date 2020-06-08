const express= require('express');
const router = new express.Router();

router.get('/proveedor/registrar',async(req,res)=>{
    res.send('Estamos en proveedor Registro');
} )

router.get('/proveedor/editar',async(req,res)=>{
 res.send('Estamos en proveedor Editar')
});

module.exports= router;