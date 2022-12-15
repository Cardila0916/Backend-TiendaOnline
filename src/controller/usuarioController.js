//Importamos el modelo
import generarJWT from '../helpers/generarJWT.js';
import Usuario from '../models/Usuario.js';

const agregar = async (req, res) => {
    
    //Evitar profesores duplicados
    const { nombresUsuario } = req.body;
    const existeUsuario = await Usuario.findOne({nombresUsuario});

    if (existeUsuario) {
        const error = new Error("Profesor ya esta registado en la base de datos");
        return res.status(400).json({msg: error.message, ok: "NO"});
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioAlmacenando = await usuario.save();
        res.json({body: usuarioAlmacenando, ok: "SI", msg: "Registro creado correctamente"});
    } catch (error) {
        console.log(error);
    }

    //console.log("Metodo agregar");
}

const listar = async (req, res) => {
    
    const usuario = await Usuario.find().populate('idRol', {
        nombreRol: 1,
        _id: 0
    });
    res.json(usuario);

    //console.log("Metodo listar");
}

const listarUno = async (req, res) => {
    
    const {id} = req.params;

    //validar si existe el registro
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Registro no encontrado");
        return res.status(404).json({msg: error.message, ok: "NO"});
    }
    
    res.json(usuario);
    //console.log("Metodo listar");
}
const editar = async (req, res) => {
    
    const {id} = req.params;

    //validar si existe el registro
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Registro no encontrado");
        return res.status(404).json({msg: error.message, ok: "NO"});
    }

    //Capturamos los datos del formulario
    usuario.idRol = req.body.idRol || usuario.idRol;
    usuario.idGrado = req.body.idGrado || usuario.idGrado;
    usuario.nombresUsuario = req.body.nombresUsuario || usuario.nombresUsuario;
    usuario.apellidosUsuario = req.body.apellidosUsuario || usuario.apellidosUsuario;
    usuario.tipoDocUsuario = req.body.tipoDocUsuario || usuario.tipoDocUsuario;
    usuario.documentoUsuario = req.body.documentoUsuario || usuario.documentoUsuario;
    usuario.correoUsuario = req.body.correoUsuario || usuario.correoUsuario;
    usuario.usuarioAcceso = req.body.usuarioAcceso || usuario.usuarioAcceso;
    usuario.claveAcceso = req.body.claveAcceso || usuario.claveAcceso;
    usuario.estadoUsuario = req.body.estadoUsuario || usuario.estadoUsuario;

    try {
        const usuarioGuardado = await usuario.save();
        res.json({body: usuarioGuardado, ok: "SI", msg: "Registro editado correctamente"});
    } catch (error) {
        console.log(error);
    }
    //console.log("Metodo editar");
}
const eliminar = async (req, res) => {
    
    //Recibir los parametros por la url
    const {id} = req.params;

    //validar si existe el registro
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        const error = new Error("Registro no encontrado");
        return res.status(404).json({msg: error.message, ok: "NO"});
    }

    try {
        await usuario.deleteOne();
        res.json({body: "Registro eliminado correctamene", ok: "SI", msg:"Registro eliminado correctamene"})
    } catch (error) {
        console.log(error);
    }
    
    //console.log("Metodo eliminar");
}

const autenticar = async (req, res) => {
    const {usuarioAcceso, claveAcceso} = req.body;

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ usuarioAcceso });
    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(404).json({msg: error.message, ok: "NO_EXISTE"});
    }

    //Comprobar la contraseña
    if (await usuario.comprobarClave(claveAcceso)) {
        
        res.json({
            _id: usuario._id,
            nombresUsuario: usuario.nombresUsuario,
            usuarioAcceso: usuario.usuarioAcceso,
            tokenJwt: generarJWT(usuario._id)
        });
    } else {
        const error = new Error("La clave es incorrecta.");
        return res.status(400).json({ msg: error.message, ok: "CLAVE_ERRONEA" });
    }
}

const crearCuenta = async (req, res) => {
    //Evitar usuarios dupliados por el usuariosAcceso
    const {usuarioAcceso} = req.body;
    const existeUsuario = await Usuario.findOne({usuarioAcceso});

    if(existeUsuario) {
        const error = new Error("Usuario ya esta registrado");
        return res.status(400).json({msg: error.message, ok: "NO"});
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioAlmacenando = await usuario.save();
        res.json({body: usuarioAlmacenando, ok: "SI", msg: "Usuario creado correctamente"});
    } catch (error) {
        console.log(error);
    }
}

export {
    agregar,
    listar,
    listarUno,
    editar,
    eliminar,
    autenticar,
    crearCuenta
};