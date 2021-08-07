const express = require('express');
const cors = require('cors');
require("dotenv").config();

const { conexionDb }= require('./dataBase/config');

const app = express();

// Conexión DB:
conexionDb();

// Habilitar Cors:
app.use(cors());

// Habilitar body parser
app.use( express.json() );

// Rutas:
app.get('/', (req, res) => {

    return res.status(200).json({
        ok: true,
        message: 'Todo ok'
    });
});


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})