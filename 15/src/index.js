import express from 'express'

const app = express()
// express.json lee las consultas que recibimos en json y las puede utilizar
app.use(express.json())

// Caso 404 en caso que la direccion no exista
app.use((req, res) => {
    res.status(404).json({ error: "Esa dirección no existe" });
});

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})