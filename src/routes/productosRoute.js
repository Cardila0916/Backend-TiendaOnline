import express from "express";
import upload from "../libs/storage.js";
const router = express.Router();
import { agregar, listar } from "../controller/productosController.js";

router.post("/", upload.single('imagen'), agregar);
router.get("/", listar);

export default router;