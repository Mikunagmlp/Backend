const express = require('express');
// creamos el router para todas nuestras peticiones
const router = new express.Router();


// peticion CREATE para users
router.get('/usuario', async (req, res) => {
    res.send('Hola mundo');
});

module.exports = router;