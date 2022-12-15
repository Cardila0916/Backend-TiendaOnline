import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import conectarDB from './src/config/bd.js';
import cors from 'cors';

//Importamos rutas
import roleRoute from './src/routes/roleRoute.js';
import usuarioRoute from './src/routes/usuarioRouter.js';
import categoriaRoute from './src/routes/categoriaRoute.js';
import productosRouter from './src/routes/productosRoute.js';

//Iniciamos el servidor de express
const app = express();
app.use(express.json())//Para  leer datos de forma json

//Inicializamos el uso de las variables de entorno .env
dotenv.config();

//Conexion a la base de datos MongoDB
conectarDB();

//Permitir conexiones externas con cors
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {

        if (whiteList.includes(origin)){
            //Puede consultar el api
            callback(null, true);
        } else {
            callback(new Error("Error de cors."))
        }
    } 
};
app.use(cors());

//Definimos rutas
app.use("/api/roles", roleRoute);
app.use("/api/usuarios", usuarioRoute);
app.use("/api/categorias", categoriaRoute);
app.use("/api/productos", productosRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(`${__dirname}/storage/imgs`));

//Puerto del servidor
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo el puerto ${PORT}`);
});