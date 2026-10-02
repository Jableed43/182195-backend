// clase 22
import { Router } from "express"
import * as pedidoController from "../controllers/pedidoController.js"
import { verificarToken } from "../middleware/verificarToken.js"
import { permitirRoles } from "../middleware/permitirRoles.js"
import { ROLES, soloStaff } from "../utils/constants.js"

const router = Router()

// Todas las rutas de pedidos necesitan estar logueado: sin token no hay pedidos.
// Pero el ROL lo decidimos ruta por ruta, porque acá NO todas son del comprador
// (a diferencia del carrito, donde todo el router era para compradores).
router.use(verificarToken)

const soloComprador = permitirRoles(ROLES.COMPRADOR)

router.post("/", soloComprador, pedidoController.crearPedidoController)
router.get("/", soloComprador, pedidoController.listarMisPedidosController)

// ⚠️ "/todos" va ANTES que "/:id".
// Express prueba las rutas EN ORDEN: si /:id estuviera primero, GET /api/pedidos/todos
// entraría ahí con id = "todos": al vendedor le daría 403 (esa ruta pide
// rol comprador) y a un comprador, 400 por CastError.
// soloStaff ya trae [verificarToken, permitirRoles(VENDEDOR, ADMIN)] de constants.js
router.get("/todos", soloStaff, pedidoController.listarTodosPedidosController)

router.get("/:id", soloComprador, pedidoController.obtenerMiPedidoController)
router.patch("/:id/pagar", soloComprador, pedidoController.pagarPedidoController)
router.patch("/:id/cancelar", soloComprador, pedidoController.cancelarPedidoController)

export default router
