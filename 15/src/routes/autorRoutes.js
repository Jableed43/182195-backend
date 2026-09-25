import {Router} from 'express'
import * as autorController from "../controllers/autorController.js"
import { soloStaff } from '../utils/constants.js'



const router = Router()

router.get("/", autorController.listarAutorController)

router.get("/:id", autorController.obtenerAutorIdController)

router.post("/", soloStaff, autorController.crearAutorController)

router.patch("/:id", soloStaff, autorController.actualizarAutorController)

router.delete("/:id", soloStaff, autorController.eliminarAutorController)

export default router