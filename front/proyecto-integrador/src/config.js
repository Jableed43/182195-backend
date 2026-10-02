// Este archivo .env va a ser un diccionario que va a contener todas las variables de entorno
export const API_URL = import.meta.env.VITE_API_URL

// Rutas del back (182195-backend/15). Si el back las nombra distinto, se cambian ACA
export const RUTAS = {
    productos: "libros",
    autores: "autores",
    usuarios: "usuarios",
    carrito: "carrito",
    pedidos: "pedidos",
    pedidosTodos: "pedidos/todos",
    login: "auth/login",
    registro: "auth/registro",
    perfil: "auth/perfil",
}

// Lo que el back TODAVIA no tiene:
//   DELETE /api/usuarios/:id -> baja de usuarios
//   PATCH  /api/usuarios/:id -> cambiar el rol
// Mientras tanto, el front muestra esas acciones deshabilitadas.
