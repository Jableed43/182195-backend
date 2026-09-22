import { Router } from "express"
import * as usuarioController from "../controllers/usuarioController.js"

const router = Router()

router.get("/", usuarioController.listarUsuarioController)
router.get("/:id", usuarioController.obtenerUsuarioIdController)
router.post("/", usuarioController.crearUsuarioController)

// paso 0: el carrito ya está en /api/carrito. Pendiente: pedidos (clase aparte, con pagos).

export default router