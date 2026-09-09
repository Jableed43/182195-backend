import express from 'express'
import { conectarDB } from "./db.js";
import Autor from "./models/autor.js";
import Libro from "./models/libro.js";

await conectarDB()

const app = express()
// express.json lee las consultas que recibimos en json y las puede utilizar
app.use(express.json())

// rutas
app.get("/libros", async (req, res) => {
    try {
        const libros = await Libro
        .find()
        .populate("autor", "nombre nacionalidad")
        .sort({ titulo: 1})

    res.status(200).json(libros)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/autores", async (req, res) => {
    try {
        const autores = await Autor.find().sort({nombre: 1})
        res.status(200).json(autores)
    } catch (error) {
        console.error(error.message)
    }
})

// Caso 404 en caso que la direccion no exista
app.use((req, res) => {
    res.status(404).json({ error: "Esa dirección no existe" });
});

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})