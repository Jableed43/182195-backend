import dotenv from 'dotenv'

const config = dotenv.config()

// Con valor por defecto: sin .env, PORT quedaba undefined y app.listen(undefined)
// NO falla, arranca en un puerto al azar sin avisar.
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/biblioteca"
const PORT = process.env.PORT || 3000

export {MONGO_URI, PORT}

