import { useState } from 'react'
import { RUTAS } from '../../config'
import { api } from '../../utils/api'
import { productoALibro, libroAFormData } from '../../utils/adaptadores'

// PATCH /api/libros/:id  ·  PROTEGIDA: token + rol vendedor o admin
// PATCH (no PUT) porque se mandan solo los campos que cambian.
// Si el usuario eligio una imagen, el libro viaja como multipart (FormData).
// Si no, sigue viajando como JSON, igual que siempre: el back acepta las dos formas.
const cuerpo = (formData) =>
    formData.imagen instanceof File ? libroAFormData(formData) : productoALibro(formData)

function usePatchProduct() {
  const [error, setError] = useState(null)

  const patchProduct = async (formData, productId) => {
    setError(null)
    try {
      return await api("PATCH", `${RUTAS.productos}/${productId}`, {
        body: cuerpo(formData),
        porDefecto: "Error al editar el producto"
      })
    } catch (error) {
      console.error(error)
      setError(error)
      return null
    }
  }
  return { patchProduct, error }
}

export default usePatchProduct
