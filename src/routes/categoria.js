const express = require('express');
const router = new express.Router();
const {listarCategoriasDisabled, createCategoria, getCategoria, getCategorias, updateCategoria, desableCategoria } = require('.//../controllers/categoria.controller');

router.post('/categoria/registrar', createCategoria);

router.get('/categorias', getCategorias);

router.get('/categoria/:id', getCategoria);

router.patch('/categoria/editar/:id', updateCategoria);

router.put('/categoria/desable/:id', desableCategoria);

router.get('/categorias/disabled', listarCategoriasDisabled);

module.exports = router;
