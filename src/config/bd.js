import mongoose, { connect } from "mongoose";

const conectarDB = () => {
    const urlConexion = String(process.env.MONGO_URI);
    connect(urlConexion)
        .then(con => {
            console.log(`Conexión MongoDB: ${urlConexion} Establecida`);
        })
        .catch(error => {
            console.log(error);
        });
};

export default conectarDB;