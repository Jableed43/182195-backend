// ADAPTADORES: traducen lo que manda el back (en español, con los nombres de Mongo)
// a lo que esperan los componentes del front (en inglés, con los nombres de mockapi).
// Asi los componentes no se tocan: si cambia el back, se cambia solo este archivo.

// Imagen de relleno: los libros del back no tienen imagen
const IMAGEN_LIBRO =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120">
            <rect width="100%" height="100%" fill="#e9ecef"/>
            <text x="50%" y="55%" font-size="48" text-anchor="middle" dominant-baseline="middle">📚</text>
        </svg>`
    )

// libro del back -> product del front
export const libroAProducto = (libro) => ({
    id: libro._id,
    name: libro.titulo,
    // el back no tiene descripcion: se arma con el autor (viene populado) y el genero
    description: [libro.autor?.nombre, libro.genero].filter(Boolean).join(" · "),
    price: libro.precio,
    quantity: libro.stock,
    image: IMAGEN_LIBRO,
    highlighted: false,
    available: libro.disponible,
})

// usuario del back -> user del front (el AuthContext mira user.role para isAdmin)
export const usuarioAUser = (usuario, token) => ({
    id: usuario._id ?? usuario.id,
    name: usuario.nombre ?? usuario.name,
    lastName: usuario.apellido,
    email: usuario.email,
    role: usuario.rol ?? usuario.role,
    token,
})

// La respuesta de login/registro puede venir como { usuario, token } o { user, token }:
// se aceptan las dos para no depender del nombre exacto que elija el back
export const leerSesion = (data) => {
    const usuario = data.usuario ?? data.user ?? data
    const token = data.token ?? data.accessToken
    return usuarioAUser(usuario, token)
}

// El back manda { error, detalles } (ver manejarErrores.js). Esto arma un mensaje legible
export const leerError = async (response, porDefecto) => {
    try {
        const data = await response.json()
        const detalles = Array.isArray(data.detalles) ? `: ${data.detalles.join(" · ")}` : ""
        return (data.error ?? data.message ?? porDefecto) + detalles
    } catch {
        return porDefecto
    }
}
