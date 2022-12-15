import Productos from "../models/Productos.js";

const agregar = async (req, res) => {
    
    const {nombreProducto} = req.body;
    const existeProducto = await Productos.findOne({nombreProducto});

    if (existeProducto) {
        const error = new Error("Producto ya existe");
        return res.status(400).json({msg: error.message, ok: "NO"});
    }

    try {
        
        const productos = new Productos(req.body);
        if (req.file) {
            const {filename} = req.file
            productos.setImgUrl(filename);
        }
        const productoAlmacenado = await productos.save();
        res.json({body: productoAlmacenado, ok: "SI", msg: "Registro creado correctamente"})
    } catch (error) {
        console.log(error);
    }
}

const listar = async (req, res) => {
    //console.log("Metodo listar");

    const productos = await Productos.find();
    res.json(productos);
}

export {
    agregar,
    listar
}