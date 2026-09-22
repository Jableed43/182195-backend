import { useState } from "react"
import { API_URL, RUTAS } from "../../config"
import { leerSesion, leerError } from "../../utils/adaptadores"

// Antes: se bajaban TODOS los usuarios y se comparaba la password en el navegador.
// Ahora: se le manda email + password al back, el back compara contra el hash (bcrypt)
// y si esta bien devuelve el usuario (sin password) y un token JWT.
function useLoginUser() {
    const [error, setError] = useState(null)

    // devuelve { user } si salio bien, o { message } si salio mal
    const loginUser = async (email, password) => {
        setError(null)

        try {
            const response = await fetch(`${API_URL}${RUTAS.login}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if(!response.ok){
                const message = await leerError(response, "Credenciales incorrectas")
                setError(message)
                return { message }
            }

            const data = await response.json()
            // user = { id, name, email, role, token }
            return { user: leerSesion(data) }

        } catch (error) {
            console.error("Error al loggear usuario", error)
            setError(error)
            return { message: "No se pudo conectar con el servidor" }
        }
    }
    return {error, loginUser}
}

export default useLoginUser
