import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UsuarioSchema = mongoose.Schema({
    
    idRol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rol",
        require: true
    },

    nombresUsuario: {
        type: String,
        require: true,
        trim: true
    },

    apellidosUsuario: {
        type: String,
        require: true,
        trim: true
    },
    
    tipoDocUsuario: {
        type: Number,
        require: false,
        trim: true
    },

    documentoUsuario: {
        type: Number,
        require: false,
        trim: true
    },
    
    correoUsuario: {
        type: String,
        require: true,
        trim: true
    },
    usuarioAcceso: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },

    claveAcceso: {
        type: String,
        require: true,
        trim: true
    },

    estadoUsuario: {
        type: Number,
        require: true,
        trim: true
    }
}, {
    timestamps: true
});

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified("claveAcceso")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
});

UsuarioSchema.methods.comprobarClave = async function (claveFormulario) {
    return await bcrypt.compare(claveFormulario, this.claveAcceso);
};

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;