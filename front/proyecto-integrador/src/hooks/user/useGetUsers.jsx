import { useEffect, useState } from "react"
import { RUTAS } from "../../config"
import { api } from "../../utils/api"
import { usuarioAUser } from "../../utils/adaptadores"

// GET /api/usuarios  ·  PROTEGIDA: token + rol admin (el back responde 403 a los demás)
// El back nunca manda la password: el modelo la tiene en select: false y
// además la borra en toJSON. Por eso acá ya no hace falta filtrarla.
function useGetUsers() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const getUsers = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await api("GET", RUTAS.usuarios, { porDefecto: "Error al traer los usuarios" })

            // usuarios del back (nombre, apellido, rol) -> users del front (name, lastName, role)
            setUsers(data.map((usuario) => usuarioAUser(usuario)))
        } catch (error) {
            console.error(error)
            setError(error)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    // refetch permite recargar el listado sin recargar la página
    return { users, error, loading, refetch: getUsers }
}

export default useGetUsers
