import { Router } from 'express'
import * as libroController from "../controllers/libroController.js"

const router = Router()

// rutas

// get libros
router.get("/", libroController.listarLibroController)

// get by id , :id es path param
router.get("/:id", libroController.obtenerLibroIdController)

// crear libro
router.post("/", libroController.crearLibroController)

router.patch(  "/:id", libroController.actualizarLibroController);
router.delete( "/:id", libroController.eliminarLibroController);

export default router