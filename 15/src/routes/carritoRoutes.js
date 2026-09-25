import { Router } from "express"
import * as carritoController from "../controllers/carritoController.js"
import { verificarToken } from "../middleware/verificarToken.js"
import { permitirRoles } from "../middleware/permitirRoles.js"
import { ROLES } from "../utils/constants.js"

// paso 0: acá NO hace falta mergeParams: el :usuarioId está escrito en cada ruta de
// este router, no en el prefijo del app.use. mergeParams solo se necesita cuando
// el parámetro viene del padre, ej: router.use("/:usuarioId/carrito", carritoRoutes)
const router = Router()

router.use(verificarToken, permitirRoles(ROLES.COMPRADOR))

// si el user está loggeado, ya lo tenemos guardado en el sistema, no haria falta que lo manden por ruta
// si el user no está loggeado como podría acceder a una ruta de ese usuario especifico?
// no deberia poder hacerlo
// es una medida de seguridad para que nadie que conozca el usuarioId pueda acceder a su carrito si no está loggeado con el mismo userId

// si yo permito que accedan los compradores a estas rutas
// lo que sucede es que deberiamos controlar controlar tambien que los usuarios no vean carritos de otros

router.get("/", carritoController.obtenerCarritoController)
router.post("/", carritoController.agregarItemCarritoController)
router.patch("/:libroId", carritoController.actualizarItemCarritoController)
router.delete("/:libroId", carritoController.quitarItemCarritoController)
router.delete("/", carritoController.vaciarCarritoController)

export default router
