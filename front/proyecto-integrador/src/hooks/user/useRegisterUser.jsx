import { useState } from "react"
import { API_URL, RUTAS } from "../../config"
import { leerSesion, leerError } from "../../utils/adaptadores"

function useRegisterUser() {
    const [error, setError] = useState(null)

    // devuelve { user } si salio bien, o { message } si salio mal
    const registerUser = async (formData) => {
        setError(null)

        try {
            const response = await fetch(`${API_URL}${RUTAS.registro}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // el formulario usa nombres en ingles, el back en español.
                // ⚠️ el rol NO se manda: lo decide el back (todo registro es comprador)
                body: JSON.stringify({
                    nombre: formData.name,
                    apellido: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                })
            })

            if(!response.ok){
                const message = await leerError(response, "Ocurrió un error al crear la cuenta")
                setError(message)
                return { message }
            }

            const data = await response.json()
            // si el back devuelve token, el registro ya deja la sesion iniciada
            return { user: leerSesion(data) }

        } catch (error) {
            console.error("Error al registrar usuario", error)
            setError(error)
            return { message: "No se pudo conectar con el servidor" }
        }
    }
    return {error, registerUser}

}

export default useRegisterUser
