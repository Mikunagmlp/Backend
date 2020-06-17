const express= require('express');
const router = new express.Router();
const {createCategoria }= require('../controllers/categoria.controller');
// get registro
router.post('/categoria/crearCategoria',createCategoria)

router.get('/categoria/editar',async(req,res)=>{
 res.send('Estamos en categoria Editar')
});

module.exports= router;