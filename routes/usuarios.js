/* Ruta: /api/usuarios */
const { Router } = require('express');
const { check } = require('express-validator');

const { validacionCampos } = require('../middlewares/validar-campos');
const  { validarJWT, validarAdminRole, validarAdminRoleUsuario } = require('../middlewares/validar-jwt');
 const { crearUsuario, getUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/userControllers');

const router = Router();

router.post('/',[

    check('nombre', 'El nombre es obligatorío').not().isEmpty(),
    check('email', 'Email con formato no valido').isEmail(),
    check('password', 'El password debe tener minímo 6 caracteres').isLength({ min: 6 }).not().isEmpty(),
    validacionCampos
    
], crearUsuario);

router.get('/',[ validarJWT, validarAdminRole ], getUsuario);

router.put('/:id',[
    validarJWT,
    validarAdminRoleUsuario,
    check('nombre', 'El nombre es obligatorío').not().isEmpty(),
    check('email', 'Email con formato no valido').isEmail(),
    check('role', 'El rol es obligatorío').not().isEmpty(),
    validacionCampos

], actualizarUsuario);

router.delete('/:id',[validarJWT, validarAdminRole ], eliminarUsuario);

module.exports = router;