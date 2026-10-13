import { Router } from 'express'
import * as libroController from "../controllers/libroController.js"
import { soloStaff } from '../utils/constants.js'
import { subirImagen, manejarErroresDeMulter } from '../middleware/subirImagen.js'

const router = Router()



// rutas

// get libros
router.get("/", libroController.listarLibroController)

// get by id , :id es path param - req.param
router.get("/:id", libroController.obtenerLibroIdController)

// crear libro
router.post("/", soloStaff, subirImagen, libroController.crearLibroController)

router.patch("/:id", soloStaff, subirImagen, libroController.actualizarLibroController);

router.delete("/:id", soloStaff, libroController.eliminarLibroController);

// clase 24 · los errores de Multer se traducen ACÁ, al final de este router.
// Un middleware de errores puesto en un router solo atrapa lo que pasó en ESE
// router: es el lugar natural, porque es el único que sabe de archivos.
// ⚠️ Sin esta línea, una imagen de más de 4 MB responde 500 en vez de 400.
router.use(manejarErroresDeMulter)

export default router