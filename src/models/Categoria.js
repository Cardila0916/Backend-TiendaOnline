import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema({
    
    nombreCategoria: {
        type: String,
        require: true,
        trim: true
    },

    estadoCategoria: {
        type: Number,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;