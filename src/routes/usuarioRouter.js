import express from "express";
const router = express.Router();
import { agregar, listar, listarUno, editar, eliminar, autenticar, crearCuenta } from '../controller/usuarioController.js'; 
import validarAutenticacion from "../middleware/validarAuenticacion.js";

//Rutas <--Privadas-->
router.get("/:id", validarAutenticacion, listarUno);
router.get("/", validarAutenticacion, listar);
router.post("/", validarAutenticacion, agregar);
router.put("/:id", validarAutenticacion, editar);
router.delete("/:id", validarAutenticacion, eliminar);

//Rutas <--Publicas-->
router.post("/login", autenticar);
router.post("/crear-cuenta", crearCuenta);

export default router;