// Contexto de autenticación: fuente única de verdad de la sesión.
// Antes useAuth usaba estado local, por lo que cada componente tenía su propia
// copia y los cambios de login/logout no se propagaban. Con el Context, todos
// los componentes (Header, ProtectedRoute, ProductCard, etc.) comparten el
// mismo estado de sesión y reaccionan de forma inmediata.
import { createContext, useState } from "react"

// Clave de la sesión en sessionStorage. Guarda el usuario y su token.
const SESSION_KEY = "usuario"

export const AuthContext = createContext(null)

// Lee la sesión guardada. Se ejecuta UNA vez, al crear el estado.
function leerSesionGuardada() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY))
    } catch (error) {
        console.error(error)
        return null
    }
}

export function AuthProvider({ children }) {
    // ⚠️ Se pasa la FUNCIÓN, no su resultado: así React la corre en el primer
    // render (lazy initializer). Antes esto se hacía en un useEffect, que corre
    // DESPUÉS del primer render: en ese primer render user era null, y al
    // recargar una página protegida ProtectedRoute te mandaba al login aunque
    // la sesión existiera.
    const [user, setUser] = useState(leerSesionGuardada)
    const [error, setError] = useState(null)

    // Crear sesión y persistirla
    const login = (userData) => {
        setUser(userData)
        // TODO: NO GUARDAR PASSWORD (useLoginUser ya la omite antes de llegar acá)
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        sessionStorage.removeItem(SESSION_KEY)
    }

    // Los tres roles del back: comprador, vendedor y admin.
    //   comprador -> arma su carrito y compra
    //   vendedor  -> administra el catalogo (libros y autores)
    //   admin     -> todo lo anterior + administra usuarios
    // "staff" = quien puede tocar el catalogo. Se usa para mostrar u ocultar
    // botones; el permiso de verdad lo aplica el back con permitirRoles.
    const value = {
        user,
        token: user?.token ?? null,
        login,
        logout,
        error,
        isAuthenticated: user !== null,
        isAdmin: user?.role === "admin",
        isVendedor: user?.role === "vendedor",
        isStaff: user?.role === "admin" || user?.role === "vendedor",
        isComprador: user?.role === "comprador",
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
