import mongoose from 'mongoose'
import { MONGO_URI } from '../utils/config.js'

export const conectarDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`MongoDB conectado . base "${mongoose.connection.name}"`)
    } catch (error) {
        console.error(`No se pudo conectar ${error.message}`)
        process.exit(1)
    }
}
