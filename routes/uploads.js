
/*
     /api/uploads/
*/

const { Router } = require('express');
const  expressFileUpload  =  require ( 'express-fileupload' ) ; 

const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, obtenerImagen } = require('../controllers/uploadsController');


const router = Router();

router.use(expressFileUpload()); // Aquí habilitamos la libreria utilizamos el router que tiene use y solo aquí porque no se va a usar en otro lado

router.put('/:tipo/:id', validarJWT, fileUpload );

router.get('/:tipo/:imagen', obtenerImagen)


module.exports = router;