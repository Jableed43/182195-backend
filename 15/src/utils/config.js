import dotenv from 'dotenv'

const config = dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

export {MONGO_URI, PORT}

