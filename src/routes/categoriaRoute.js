import express from "express";
const router = express.Router();
import { agregar, listar, listarUno, editar, eliminar } from '../controller/categoriaController.js';

//Rutas <--Privadas-->
router.get("/:id", listarUno);
router.get("/", listar);
router.post("/", agregar);
router.put("/:id", editar);
router.delete("/:id", eliminar);

export default router;