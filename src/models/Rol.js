import mongoose from "mongoose";

const rolSchema = mongoose.Schema({

    nombreRol: {
        type: String,
        require: true,
        trim: true,
        uniquw: true
    },

    estadoRol: {
        type: Number,
        require: true,
        trim: true
    }

}, {
    timestamps: true
});

const Rol = mongoose.model("Rol", rolSchema);
export default Rol;