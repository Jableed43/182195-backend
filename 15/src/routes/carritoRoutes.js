import { Router } from "express"
import * as carritoController from "../controllers/carritoController.js"

// si este router ve el :usuarioId del prefijo
// sin esto req.params.usuarioId llega undefined sin ningun error 
const router = Router()

// si el user está loggeado, ya lo tenemos guardado en el sistema, no haria falta que lo manden por ruta
// si el user no está loggeado como podría acceder a una ruta de ese usuario especifico?
// no deberia poder hacerlo
// es una medida de seguridad para que nadie que conozca el usuarioId pueda acceder a su carrito si no está loggeado con el mismo userId

router.get("/:usuarioId", carritoController.obtenerCarritoController)
router.post("/:usuarioId", carritoController.agregarItemCarritoController)
router.patch("/:usuarioId/:libroId", carritoController.actualizarItemCarritoController)
router.delete("/:usuarioId/:libroId", carritoController.quitarItemCarritoController)
router.delete("/:usuarioId", carritoController.vaciarCarritoController)

export default router
