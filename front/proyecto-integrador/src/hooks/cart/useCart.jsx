// Este hook nos permite consumir el CartContext desde cualquier componente.
// La lógica y el estado viven en el CartProvider: así el Header, el listado de
// productos y la página del carrito comparten UN solo carrito.
// Es el mismo patrón que useAuth con el AuthContext.
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

function useCart() {
    const context = useContext(CartContext)

    if (context === null) {
        throw new Error("useCart debe usarse dentro de un <CartProvider>")
    }

    return context
}

export default useCart
