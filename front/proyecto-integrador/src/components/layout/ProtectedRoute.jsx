// Guardián de rutas: evalúa sesión y rol antes de conceder acceso.
// - Guest (no logueado)            -> redirige a /user/login
// - Autenticado sin rol autorizado -> redirige a / (home)
// Consume el AuthContext (vía useAuth), por lo que reacciona a login/logout.
//
// ⚠️ Esto es solo para la EXPERIENCIA de uso: esconde pantallas que no
// corresponden. La seguridad de verdad está en el back (verificarToken +
// permitirRoles), porque cualquiera puede escribir la URL a mano.
import { Navigate } from "react-router-dom"
import useAuth from "../../hooks/user/useAuth"

function ProtectedRoute({ children, roles }) {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/user/login" replace />
    }

    // roles={["vendedor", "admin"]} -> solo esos roles entran
    if (roles && !roles.includes(user?.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
