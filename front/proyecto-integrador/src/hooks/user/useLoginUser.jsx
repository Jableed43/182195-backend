import { useState } from "react"
import { RUTAS } from "../../config"
import { api } from "../../utils/api"
import { leerSesion } from "../../utils/adaptadores"

// Antes: se bajaban TODOS los usuarios y se comparaba la password en el navegador.
// Ahora: se le manda email + password al back, el back compara contra el hash (bcrypt)
// y si esta bien devuelve el usuario (sin password) y un token JWT.
function useLoginUser() {
    const [error, setError] = useState(null)

    // devuelve { user } si salio bien, o { message } si salio mal
    const loginUser = async (email, password) => {
        setError(null)

        try {
            const data = await api("POST", RUTAS.login, {
                body: { email, password },
                porDefecto: "Credenciales incorrectas"
            })
            // user = { id, name, lastName, email, role, token }
            return { user: leerSesion(data) }
        } catch (error) {
            console.error("Error al loggear usuario", error)
            setError(error)
            return { message: error.message }
        }
    }
    return { error, loginUser }
}

export default useLoginUser
