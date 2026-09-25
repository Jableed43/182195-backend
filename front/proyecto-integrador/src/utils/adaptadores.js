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

// product del front -> libro del back (para POST y PATCH)
// Solo se mandan los campos que el usuario completó: el back valida el resto.
export const productoALibro = (form) => {
    const libro = {
        titulo: form.name,
        precio: Number(form.price),
        stock: Number(form.quantity),
    }
    // el ISBN es obligatorio al crear, pero en un PATCH puede no venir
    if (form.isbn) libro.isbn = form.isbn
    if (form.genero) libro.genero = form.genero
    if (form.anio) libro.anio = Number(form.anio)
    // "" significa "sin autor": se manda null para poder sacárselo a un libro
    if (form.autor !== undefined) libro.autor = form.autor || null
    if (form.available !== undefined) libro.disponible = form.available

    return libro
}

// libro del back -> el formulario de editar (campos en inglés, como el form)
export const libroAFormulario = (libro) => ({
    name: libro.titulo ?? "",
    isbn: libro.isbn ?? "",
    price: libro.precio ?? 0,
    quantity: libro.stock ?? 0,
    genero: libro.genero ?? "novela",
    anio: libro.anio ?? "",
    // el autor viene POPULADO (un objeto) en los GET: para el select se necesita el id
    autor: libro.autor?._id ?? libro.autor ?? "",
    available: libro.disponible ?? true,
})

// carrito del back -> lo que dibuja CartPage
// El back ya manda el subtotal y el total calculados con el precio vivo.
export const carritoAVista = (carrito) => ({
    items: (carrito?.items ?? []).map((item) => ({
        product: libroAProducto(item.libro),
        quantity: item.cantidad,
        subtotal: item.subtotal,
    })),
    unidades: carrito?.unidades ?? 0,
    total: carrito?.total ?? 0,
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
