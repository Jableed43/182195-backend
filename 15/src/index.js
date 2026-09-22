import express from 'express'
import cors from "cors" // cors
import { conectarDB } from "./db.js";
import libroRoutes from "./routes/libroRoutes.js"
import autorRoutes from "./routes/autorRoutes.js"
import { PORT } from './utils/config.js';
import { manejarErrores } from './middleware/manejarErrores.js';
import usuarioRoutes from "./routes/usuarioRoutes.js"
import carritoRoutes from "./routes/carritoRoutes.js"

await conectarDB()

const app = express()

// CORS: el navegador bloquea que una página de OTRO origen
// (ej: un front en localhost:5173) le pida datos a esta API (localhost:3000).
// cors() agrega los headers que le dicen al navegador "dejalo pasar".
// ⚠️ Postman no es un navegador: ahí anda con o sin CORS. Por eso no se nota hasta tener un front.
app.use(cors())

// express.json lee las consultas que recibimos en json y las puede utilizar
app.use(express.json())

// Agrupadores de rutas
// todas mis rutas de libro van a empezar con sujo "/api/libros"
app.use("/api/libros", libroRoutes)
app.use("/api/autores", autorRoutes)
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/carrito", carritoRoutes)

// Caso 404 en caso que la direccion no exista
app.use((req, res) => {
    res.status(404).json({ error: "Esa dirección no existe" });
});

// middlewares a nivel aplicacion (global)
app.use(manejarErrores)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})