import { Router } from "express"
import * as usuarioController from "../controllers/usuarioController.js"

const router = Router()

router.get("/", usuarioController.listarUsuarioController)
router.get("/:id", usuarioController.obtenerUsuarioIdController)
router.post("/", usuarioController.crearUsuarioController)

// GAP: faltan rutas de carrito y rutas de pedidos

export default router