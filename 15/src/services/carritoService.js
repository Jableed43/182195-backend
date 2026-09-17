import mongoose from "mongoose"
import Carrito from "../models/carrito.js"

// No sabemos si el usuario tiene carrito o no
// Si el usuario tiene carrito lo devuelve
// si no  lo crea en la misma operacion

import { verificarUsuarioService } from "./usuarioService"

// populate anidado de 3 colecciones
// Populate - Carrito -> libros -> autor

const POPULATE_ITEMS = {
    path: "items.libro",
    select: "titulo precio stock disponible autor",
    populate: { path: "autor", select: "nombre" }
}

/**
 * Obtiene el carrito del usuario o lo crea si no existe (patrón Get or Create).
 * Usa 'upsert: true' junto con '$setOnInsert' para inicializar 'items: []'
 * únicamente al crear un nuevo registro, evitando sobrescribir datos existentes
 * de forma atómica y segura ante concurrencia.
 */
// $setOnInsert -> solo se aplica cuando se crea el carrito
const obtenerOCrear = async (usuarioId) => {
    await verificarUsuarioService(usuarioId)

    return await Carrito.findOneAndUpdate(
        { usuario: usuarioId },
        { $setOnInsert: { items: [] } },
        { upsert: true, returnDocument: "after" }
    )
}

// Necesitamos calcular total
// el total no se guarda: se calcula cada vez con el precio vivo del libro
const conTotal = (carrito) => {
    const items = carrito.items
    .filter(item => item.libro) // filter por si un libro se borró
    .map(item => ({
        libro: item.libro,
        cantidad: item.cantidad,
        subtotal: item.libro.precio * item.cantidad
    }))

    return {
        _id: carrito._id,
        usuario: carrito.usuario,
        items,
        unidades: items.reduce(( acc, item ) => acc + item.cantidad, 0),
        total: items.reduce((acc, item) => acc + item.subtotal, 0),
        actualizado: carrito.updateAt
    }
}

// get
export const obtenerCarritoService = async (usuarioId) => {
    // Asegura si el cliente tiene carrito, si no lo tiene lo crea
    const carrito = await obtenerOCrear(usuarioId)
    // al carrito le populamos los datos del libro y el autor
    await carrito.populate(POPULATE_ITEMS)
    // retornamos el carrito con las unidades y el total calculados
    return conTotal(carrito)
}

/**
 * Valida que la cantidad sea un número entero estrictamente positivo (>= 1).
 * Descarta decimales, textos, valores nulos y números menores o iguales a cero,
 * lanzando un error 400 si la entrada no es apta para operaciones de inventario.
 */
const validarCantidad = (cantidad) => {
    if(!Number.isInteger(cantidad) || cantidad < 1){
        throw new ErrorApp("La cantidad tiene que ser un número entero mayor a 0", 400)
    }
}

/**
 * Verifica que el ID provisto cumpla con la estructura hexadecimal de 24 caracteres
 * propia de un ObjectId de MongoDB/Mongoose antes de consultar la base de datos,
 * evitando fallos internos en las consultas y retornando un error 400.
 */
const validarLibro = (libroId) => {
    if(!mongoose.isValidObjectId(libroId)){
        throw new ErrorApp("Ese is de libro no tiene un formato valido", 400)
    }
}

// Funcionalidad para agregar un item al carrito
