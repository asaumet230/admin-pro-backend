const { validationResult } = require('express-validator');
const { response } = require('express');

const validacionCampos = (req, res = response, next) => {

        // Validamos si hay errores:
        const errores = validationResult(req);

        if(!errores.isEmpty()) {

            return res.status(400).json({
                ok: false,
                errores: errores.array()
            });
        }
        
        next();
}

module.exports = {
    validacionCampos
}
