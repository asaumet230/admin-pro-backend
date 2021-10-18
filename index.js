const express = require('express');
const cors = require('cors');
const path= require('path');
require("dotenv").config();

const { conexionDb }= require('./dataBase/config');

const app = express();

// Conexión DB:
conexionDb();

// Habilitar Cors:
app.use(cors());
/** Nota aqui no tienes que restringir el acceso a la API porque todo esta en el mismo lugar, en los 
 * otros despliegues que hemos hecho con react el frontend estaba en Netlify y el backend en Heroku
 * pro esto habia que restringir el acceso a la API
 */

// Habilitar body parser
app.use( express.json() );


// Habilitar directorio publico:
app.use( express.static('public') );

// Rutas:
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/busquedas', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));


/* 
Eto es para obligar que mi SPA al recargar todas las rutas deban pasar por el index.html 
Ojo esto solo aplica si es una single page aplication o SPA, no si usas angular universal
o en el caso de react next o gatsby
*/
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') );
});


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})