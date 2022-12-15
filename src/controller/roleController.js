//Importamos el modelo
import Rol from '../models/Rol.js'

const agregar = async (req, res) => {
    //console.log("Metodo agregar");

    //Evitar roles con nombres duplicaco
    const {nombreRol} = req.body;
    const existeRol = await Rol.findOne({nombreRol});

    if (existeRol) {
        const error = new Error("Rol esta registrado en la base de datos");
        return res.status(400).json({msg: error.message, ok:"NO"});
    }

    try {
        const rol = new Rol(req.body);
        const rolAlmacenado = await rol.save();
        res.json({body: rolAlmacenado, ok:"SI", msg: "Registro creado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const listar = async (req, res) => {
    //console.log("Metodo listar");

    const roles = await Rol.find();
    res.json(roles);
}

const listarUno = async (req, res) => {
    //console.log("Metodo listar");

    const {id} = req.params;

    //Validamos si existe el registro 
    const rol = await Rol.findById(id);

    if (!rol){
        const error = new Error("Registro no encontrado");
        return res.status(404).json({msg: error.message, ok: "NO"});
    }

    res.json(rol);
}

const editar = async (req, res) => {
    //console.log("Metodo editar");
    //Recibir los parametros por la url
    const {id} = req.params;

    //Validamos si existe el registro 
    const rol = await Rol.findById(id);

    if (!rol){
        const error = new Error("Registro no encontrado");
        return res.status(404).json({msg: error.message, ok: "NO"});
    }

    //Capurar los datos enviados desde el formulario
    rol.nombreRol = req.body.nombreRol || rol.nombreRol;
    rol.estadoRol = req.body.estadoRol || rol.estadoRol;

    try {
        const rolGuardado = await rol.save();
        res.json({body: rolGuardado, ok: "SI", msg:"Registro editado correctamente"});
    } catch (error) {
        console.log(error)
    }
}

const eliminar = async (req, res) => {
    //console.log("Metodo eliminar");
    //Recibir los parametros por la url
    const {id} = req.params;

    //Validamos si existe el registro 
    const rol = await Rol.findById(id);

    if (!rol){
        const error = new Error("Registro no encontrado");
        return res.status(404).json({msg: error.message, ok: "NO"});
    }

    try {
        await rol.deleteOne();
        res.json({body: "Registro eliminado correctamente.", ok: "SI", msg: "Registro eliminado correctamente." })
    } catch (error) {
        console.log(error)
    }
}
const comboRoles = async (req, res) => {
    const roles = await Rol.find({ estadoRol: 1 });
    res.json(roles);
}

export {
    agregar,
    listar,
    listarUno,
    editar,
    eliminar,
    comboRoles
};