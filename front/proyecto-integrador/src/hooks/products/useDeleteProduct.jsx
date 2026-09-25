import { useState } from 'react'
import { RUTAS } from '../../config'
import { api } from '../../utils/api'

// DELETE /api/libros/:id  ·  PROTEGIDA: token + rol vendedor o admin
// El back devuelve 200 con el libro borrado (no 204), y además lo saca
// de todos los carritos.
function useDeleteProduct() {
  const [error, setError] = useState(null)

  const deleteProduct = async (productId) => {
    setError(null)
    try {
      return await api("DELETE", `${RUTAS.productos}/${productId}`, {
        porDefecto: "Error al borrar el producto"
      })
    } catch (error) {
      console.error(error)
      setError(error)
      return null
    }
  }
  return { error, deleteProduct }
}

export default useDeleteProduct
