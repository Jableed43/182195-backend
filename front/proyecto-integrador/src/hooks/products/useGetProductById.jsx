import { useState } from 'react'
import { RUTAS } from '../../config'
import { api } from '../../utils/api'

// GET /api/libros/:id  (publico, no hace falta token)
// Devuelve el LIBRO tal cual lo manda el back: quien lo usa decide si lo
// adapta a "product" (para mostrar) o a formulario (para editar).
function useGetProductById() {
    const [error, setError] = useState(null)

    const getProductById = async (productId) => {
        try {
            setError(null)
            return await api("GET", `${RUTAS.productos}/${productId}`, {
                porDefecto: "Error al traer el producto"
            })
        } catch (error) {
            console.error(error)
            setError(error)
            return null
        }
    }
    return { getProductById, error }
}

export default useGetProductById
