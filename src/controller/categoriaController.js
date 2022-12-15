import Categoria from "../models/Categoria.js";

const agregar = async (req, res) => {
    
    //Evitar categorias duplicadas
    const { nombreCategoria } = req.body;
    const existeCategoria = await Categoria.findOne({nombreCategoria});

    if (existeCategoria) {
        const error = new Error("Categoria ya esta registado en la base de datos");
        return res.status(400).json({msg: error.message, ok: "NO"});
    }

    try {
        const categoria = new Categoria(req.body);
        const categoriaAlmacenando = await categoria.save();
        res.json({body: categoriaAlmacenando, ok: "SI", msg: "Registro creado correctamente"});
    } catch (error) {
        console.log(error);
    }
    
    //console.log("Metodo agregar");
}
const listar = async (req, res) => {
    console.log("Metodo listar");
}
const listarUno = async (req, res) => {
    console.log("Metodo listar");
}
const editar = async (req, res) => {
    console.log("Metodo editar");
}
const eliminar = async (req, res) => {
    console.log("Metodo eliminar");
}

export {
    agregar,
    listar,
    listarUno,
    editar,
    eliminar
};