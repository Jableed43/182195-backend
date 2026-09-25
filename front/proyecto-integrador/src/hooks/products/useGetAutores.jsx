import { useEffect, useState } from "react"
import { RUTAS } from "../../config"
import { api } from "../../utils/api"

// GET /api/autores (publico). Sirve para el <select> de autor en los
// formularios de crear y editar libro: el back guarda el _id del autor.
function useGetAutores() {
    const [autores, setAutores] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const traer = async () => {
            try {
                setError(null)
                setAutores(await api("GET", RUTAS.autores, { porDefecto: "Error al traer los autores" }))
            } catch (error) {
                console.error(error)
                setError(error)
                setAutores([])
            }
        }
        traer()
    }, [])

    return { autores, error }
}

export default useGetAutores
