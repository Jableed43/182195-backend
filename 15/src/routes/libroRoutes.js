import { Router } from 'express'
import * as libroController from "../controllers/libroController.js"
import { soloStaff } from '../utils/constants.js'

const router = Router()



// rutas

// get libros
router.get("/", libroController.listarLibroController)

// get by id , :id es path param - req.param
router.get("/:id", libroController.obtenerLibroIdController)

// crear libro
router.post("/", soloStaff, libroController.crearLibroController)

router.patch("/:id", soloStaff, libroController.actualizarLibroController);

router.delete("/:id", soloStaff, libroController.eliminarLibroController);


export default router