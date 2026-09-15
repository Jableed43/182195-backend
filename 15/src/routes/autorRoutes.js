import {Router} from 'express'
import * as autorController from "../controllers/autorController.js"

const router = Router()

router.get("/", autorController.listarAutorController)

router.get("/:id", autorController.obtenerAutorIdController)

router.post("/", autorController.crearAutorController)

router.patch("/:id", autorController.actualizarAutorController)

router.delete("/:id", autorController.eliminarAutorController)

export default router