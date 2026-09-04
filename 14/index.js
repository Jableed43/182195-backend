import express from 'express'

// express() devuelve un objeto, ese objeto es nuestro servidor
// todo lo que le pidamos al servidor se lo pedimos a app
const app = express()

// Definir una ruta
app.get("/", (req, res) => {
    res.send("Servidor funcionando!!")
})

// Pedimos un usuario
// Parametros de solicitud - Request params
// Path params (es lo mismo)
// Datos que viajan por get, viajan por ruta
// No es la unica forma de mandar informacion por ruta PERO, esta forma es OBLIGATORIA
app.get("/usuarios/:id", (req, res) => {
    res.json({
        mensaje: "Me pediste un usuario",
        id: req.params.id,
        tipo: typeof req.params.id
    });
});

// Se pueden encadenar
app.get("/materias/:materia/alumnos/:legajo", (req, res) => {
    res.json({
        materia: req.params.materia,
        legajo: req.params.legajo
    })
})

// Query params -> es similar a request params PERO no es obligatoria
app.get("/buscar", (req, res) => {
    res.json({
        recibi: req.query
    })
})

// app.get("/", (req, res) => {
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="es">
//         <head>
//             <meta charset="UTF-8">
//             <title>Mi Servidor</title>
//             <style>
//                 body { font-family: sans-serif; text-align: center; margin-top: 50px; }
//                 h1 { color: #2c3e50; }
//             </style>
//         </head>
//         <body>
//             <h1>¡Servidor funcionando correctamente! 🚀</h1>
//             <p>Este HTML fue enviado desde Express.</p>
//         </body>
//         </html>
//     `);
// });

// Manejar el error 404 ?
// .status(n) -> define el codigo de estado enviado
// .json({}) -> permite mandar json
app.use((req, res) => {
    res.status(404).json({ error: "Esa direccion no existe" })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
