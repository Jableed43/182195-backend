import mongoose from "mongoose"

// posible GAP (brecha) a futuro, añadir roles

// ESTA ES UNA VERDADERA CONSTANTE
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ^[a-zA-Z0-9._%+-]+: El usuario solo puede contener letras, números y los caracteres especiales estándar permitidos en emails (., _, %, +, -). Cero símbolos raros o caracteres de control.

// @: Un único arroba divisorio.

// [a-zA-Z0-9.-]+: El dominio solo acepta letras, números, guiones y puntos (sin caracteres extraños).

// \.: El punto literal divisor del TLD.

// [a-zA-Z]{2,}$: Exige que la extensión (.com, .ar, .org) sea únicamente de letras y tenga como mínimo 2 caracteres. Chau dominios raros como hola@sitio.123.

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minLength: [3, "El nombre necesita al menos 3 caracteres"],
        maxLength: [100, "El nombre no puede ser mayor a 100 caracteres"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        trim: true,
        minLength: [3, "El apellido necesita al menos 3 caracteres"],
        maxLength: [100, "El apellido no puede ser mayor a 100 caracteres"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
        // regex
        match: [emailRegex, "Ese email no tiene forma de email"]
    }
}, {timestamps: true})

export default mongoose.model("Usuario", usuarioSchema)