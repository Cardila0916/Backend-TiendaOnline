import mongoose from 'mongoose';

const ProductosSchema = mongoose.Schema({

    nombreProducto: {
        type: String,
        require: true,
        trim: true
    },

    descripcion: {
        type: String,
        require: true,
        trim: true
    },

    precioProducto: {
        type: Number,
        require: true,
        trim: true
    },

    imagen: {
        type: String,
        require: false,
        trim: true
    }

}, {
    timestamps: true
});

ProductosSchema.methods.setImgUrl = async function (filename) {
    const port = process.env.PORT;
    const host = process.env.APP_HOST;
    this.imagen = await `${host}:${port}/public/${filename}`
}

const Productos = mongoose.model("Productos", ProductosSchema);
export default Productos;