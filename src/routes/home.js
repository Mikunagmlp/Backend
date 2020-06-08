const express= require('express');
const router = new express.Router();

router.get('/',async(req,res)=>{
    res.send('Bienvenidos a mikuna');
} )

module.exports= router;