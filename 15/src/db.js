import mongoose from 'mongoose'

const MONGO_URI = "mongodb://localhost:27017/biblioteca"

export const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`MongoDB conectado . base "${mongoose.connection.name}"`)
    } catch (error) {
        console.error(`No se pudo conectar ${error.message}`)
        process.exit(1)
    }
}
