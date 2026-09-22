import { useEffect, useState } from "react"
import { API_URL, RUTAS } from "../../config.js"
import { libroAProducto } from "../../utils/adaptadores.js"

function useGetProducts() {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    // url va a ser la direccion de la API
    const getProducts = async (url) => {
        try {
            setLoading(true)
            setError(null)

           const response = await fetch(url)

           if(!response.ok){
            throw new Error(`Error al traer los productos (${response.status})`)
           }

           // Convertimos la respuesta de la api en un obj de js
           const data = await response.json()

           // el back devuelve LIBROS: se traducen a la forma "product" que usan los componentes
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
        getProducts(`${API_URL}${RUTAS.productos}`)
    }, [])

    // refetch permite recargar el listado sin recargar toda la página (ej: tras borrar)
    const refetch = () => getProducts(`${API_URL}${RUTAS.productos}`)

    return {products, error, loading, refetch}
}

export default useGetProducts
