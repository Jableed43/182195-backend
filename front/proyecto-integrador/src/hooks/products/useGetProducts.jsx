import { useEffect, useState } from "react"
import { RUTAS } from "../../config.js"
import { api } from "../../utils/api.js"
import { libroAProducto } from "../../utils/adaptadores.js"

// GET /api/libros (publico). El back devuelve LIBROS: se traducen a la forma
// "product" que usan los componentes (ver adaptadores.js).
function useGetProducts() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            setLoading(true)
            setError(null)

            const data = await api("GET", RUTAS.productos, { porDefecto: "Error al traer los productos" })
            setProducts(data.map(libroAProducto))
        } catch (error) {
            console.error(error)
            setError(error)
            setProducts([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    // refetch permite recargar el listado sin recargar toda la página (ej: tras borrar)
    return { products, error, loading, refetch: getProducts }
}

export default useGetProducts
