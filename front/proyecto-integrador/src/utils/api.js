// Un solo lugar para hablar con la API.
// Antes cada hook armaba su fetch a mano y ninguno mandaba el token: por eso
// todas las rutas protegidas respondian 401. Ahora todos pasan por aca.
import { API_URL } from "../config"
import { leerError } from "./adaptadores"

// La sesion se guarda en sessionStorage con la clave "usuario" (ver AuthContext).
// De ahi sale el token que viaja en el header Authorization.
const SESSION_KEY = "usuario"

export function leerToken() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY))?.token ?? null
    } catch {
        return null
    }
}

// Error con el status adentro, para que quien llama pueda distinguir
// 401 (no estas logueado) de 403 (no podes) o 409 (no hay stock).
export class ApiError extends Error {
    constructor(mensaje, status) {
        super(mensaje)
        this.name = "ApiError"
        this.status = status
    }
}

/**
 * api("GET", "libros")                      -> GET  /api/libros
 * api("POST", "carrito", { body: {...} })   -> POST /api/carrito + Authorization
 *
 * Agrega el token solo si hay sesion. Devuelve el JSON ya parseado y, si el
 * back contesta con error, tira un ApiError con el mensaje que mando el back
 * (el formato { error, detalles } de manejarErrores.js).
 */
export async function api(metodo, ruta, { body, porDefecto = "Error al conectar con el servidor" } = {}) {
    const token = leerToken()

    const response = await fetch(`${API_URL}${ruta}`, {
        method: metodo,
        headers: {
            ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        throw new ApiError(await leerError(response, porDefecto), response.status)
    }

    // 204 (sin contenido) no trae JSON
    if (response.status === 204) return null

    return await response.json()
}
