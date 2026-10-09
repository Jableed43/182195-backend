import { useState } from "react"
import { RUTAS } from "../../config"
import { api } from "../../utils/api"
import { productoALibro, libroAFormData } from "../../utils/adaptadores"

// POST /api/libros  ·  PROTEGIDA: pide token y rol vendedor o admin
// Si el usuario eligio una imagen, el libro viaja como multipart (FormData).
// Si no, sigue viajando como JSON, igual que siempre: el back acepta las dos formas.
const cuerpo = (formData) =>
    formData.imagen instanceof File ? libroAFormData(formData) : productoALibro(formData)

function usePostProduct() {
    const [error, setError] = useState(null)

    const postProduct = async (formData) => {
        setError(null)

        try {
            // el formulario está en inglés, el back espera un libro en español
            return await api("POST", RUTAS.productos, {
                body: cuerpo(formData),
                porDefecto: "Error al crear el producto"
            })
        } catch (error) {
            console.error("Error al crear un nuevo producto", error)
            setError(error)
            return null
        }
    }
    return { error, postProduct }
}

export default usePostProduct
