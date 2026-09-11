import express from 'express'
import { conectarDB } from "./db.js";
import Autor from "./models/autor.js";
import Libro from "./models/libro.js";
import { PORT } from '../utils/config.js';
import libroRoutes from "./routes/libroRoutes.js"

await conectarDB()

const app = express()
// express.json lee las consultas que recibimos en json y las puede utilizar
app.use(express.json())

// rutas viejas
// app.get("/libros", async (req, res) => {
//     try {
//         const libros = await Libro
//         .find()
//         .populate("autor", "nombre nacionalidad")
//         .sort({ titulo: 1})

//     res.status(200).json(libros)
//     } catch (error) {
//         console.error(error.message)
//     }
// })

// app.get("/autores", async (req, res) => {
//     try {
//         const autores = await Autor.find().sort({nombre: 1})
//         res.status(200).json(autores)
//     } catch (error) {
//         console.error(error.message)
//     }
// })

// Agrupadores de rutas
// todas mis rutas de libro van a empezar con sujo "/api/libros"
app.use("/api/libros", libroRoutes)

// Caso 404 en caso que la direccion no exista
app.use((req, res) => {
    res.status(404).json({ error: "Esa dirección no existe" });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})