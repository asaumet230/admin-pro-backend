const moongose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await moongose.connect( process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        process.exit(1); //Detiene la aplicacion en caso de error
    }
}

module.exports = {
    conexionDb: dbConnection
}
