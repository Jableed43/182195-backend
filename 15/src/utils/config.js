import dotenv from 'dotenv'

const config = dotenv.config()

// Con valor por defecto: sin .env, PORT quedaba undefined y app.listen(undefined)
// NO falla, arranca en un puerto al azar sin avisar.
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/biblioteca"
const PORT = process.env.PORT || 3000

// El secreto con el que se FIRMAN los tokens. Quien lo tenga puede fabricar
// tokens validos y entrar como cualquier usuario: va en el .env, nunca en el codigo.
// ⚠️ este default es SOLO para que la clase arranque sin tocar el .env
const JWT_SECRET = process.env.JWT_SECRET || "secreto-de-clase-no-usar-en-produccion"

// cuanto dura el token. Corto = mas seguro (si te lo roban vence antes) y mas molesto
const JWT_EXPIRA = process.env.JWT_EXPIRA || "2h"

export {MONGO_URI, PORT, JWT_SECRET, JWT_EXPIRA}

