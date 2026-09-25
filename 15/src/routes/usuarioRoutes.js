import { Router } from "express"
import * as usuarioController from "../controllers/usuarioController.js"
import { verificarToken } from "../middleware/verificarToken.js"
import { permitirRoles } from "../middleware/permitirRoles.js"
import { ROLES } from "../utils/constants.js"

const router = Router()

// todo este router es solo para admin
// permite aplicar un middleware a todas las rutas
// esto involucra a todas las rutas que están debajo
router.use(verificarToken, permitirRoles(ROLES.ADMIN))

router.get("/", usuarioController.listarUsuarioController)
router.get("/:id", usuarioController.obtenerUsuarioIdController)
router.post("/", usuarioController.crearUsuarioController)

// paso 0: el carrito ya está en /api/carrito. Pendiente: pedidos (clase aparte, con pagos).

export default router