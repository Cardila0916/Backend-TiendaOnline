import express from "express";
const router = express.Router();
import { agregar, listar, listarUno, editar, eliminar, comboRoles } from '../controller/roleController.js'; 
import validarAutenticacion from "../middleware/validarAuenticacion.js";

//Rutas <--Privadas-->
router.get("/combo-roles", validarAutenticacion, comboRoles)
router.get("/:id", validarAutenticacion, listarUno);
router.get("/", validarAutenticacion, listar);
router.post("/", agregar);
router.put("/:id", validarAutenticacion, editar);
router.delete("/:id", validarAutenticacion, eliminar);

export default router;