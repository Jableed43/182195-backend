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

    // Hay dos formas de mandar datos, y se eligen solas segun lo que llegue:
    //   objeto comun -> JSON            (lo de siempre)
    //   FormData     -> multipart       (cuando hay un ARCHIVO)
    const esArchivo = body instanceof FormData

    const response = await fetch(`${API_URL}${ruta}`, {
        method: metodo,
        headers: {
            // ⚠️ Con FormData NO se pone Content-Type a proposito.
            // El navegador lo arma solo y le agrega la "frontera" (boundary) que
            // separa los campos del multipart. Si lo escribimos nosotros, va sin
            // frontera y el back no puede leer nada: responde 400.
            ...(body !== undefined && !esArchivo ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // el FormData viaja tal cual; un objeto comun se convierte a texto JSON
        body: body === undefined ? undefined : esArchivo ? body : JSON.stringify(body),
    })

    if (!response.ok) {
        throw new ApiError(await leerError(response, porDefecto), response.status)
    }

    // 204 (sin contenido) no trae JSON
    if (response.status === 204) return null

    return await response.json()
}
