import express from 'express'
import { conectarDB } from "./db.js";
import libroRoutes from "./routes/libroRoutes.js"
import autorRoutes from "./routes/autorRoutes.js"
import { PORT } from './utils/config.js';
import { manejarErrores } from './middleware/manejarErrores.js';

await conectarDB()

const app = express()
// express.json lee las consultas que recibimos en json y las puede utilizar
app.use(express.json())

// Agrupadores de rutas
// todas mis rutas de libro van a empezar con sujo "/api/libros"
app.use("/api/libros", libroRoutes)
app.use("/api/autores", autorRoutes)

// Caso 404 en caso que la direccion no exista
app.use((req, res) => {
    res.status(404).json({ error: "Esa dirección no existe" });
});

// middlewares a nivel aplicacion (global)
app.use(manejarErrores)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})