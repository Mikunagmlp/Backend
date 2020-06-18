const express = require('express');
const router = new express.Router();

const { createRol, getRoles, disableRol, getSearch, updateRol, getRol } = require('../controllers/rol.controller');

//listar roles
router.get('/roles', getRoles)
//localhost:3000/administracion/user/search?q=test
router.get('/rol/searchRol', getSearch);
// post roles
router.post('/rol/create', createRol)
//edit roles
router.put('/rol/editar/:id', updateRol);
//desable roles
router.put('/rol/desable/:id', disableRol);
//obtener un rol
router.get('/rol/:id', getRol)

module.exports = router;