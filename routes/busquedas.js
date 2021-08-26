
/*
     /api/busquedas/:busqueda
*/
const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const{ obtenerBusqueda, obtenerDocmuentosColeccion } = require('../controllers/busquedaController');

const router = Router();

router.get('/:busqueda', validarJWT, obtenerBusqueda);

router.get('/coleccion/:tabla/:busqueda', validarJWT, obtenerDocmuentosColeccion);


module.exports = router;