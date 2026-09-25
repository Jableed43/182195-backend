import { useCallback, useEffect, useState } from "react"
import { RUTAS } from "../../config"
import { api } from "../../utils/api"
import { carritoAVista } from "../../utils/adaptadores"
import useAuth from "../user/useAuth"

// El carrito ahora vive en el BACK, no en sessionStorage.
// Ventajas: sobrevive al cierre del navegador, es el mismo en cualquier
// dispositivo, y el stock se valida en el servidor (nadie puede cargar 999
// unidades tocando el sessionStorage desde la consola del navegador).
//
// Todas las rutas son /api/carrito y piden token: el back saca el usuario
// del token, por eso la URL ya no lleva ningún :usuarioId.
function useCart() {
    const [cart, setCart] = useState({ items: [], unidades: 0, total: 0 })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Solo el comprador tiene carrito: el back responde 403 a un vendedor o
    // a un admin, y 401 a quien no esté logueado. Sin este freno, el listado
    // de productos dispararía un error cada vez que lo abre un invitado.
    const { isComprador, user } = useAuth()

    // Devuelve { ok, error } en vez de un booleano: el error viaja en la misma
    // llamada. Si quien llama leyera el estado `error`, se encontraría con el
    // valor del render anterior, porque setError no actualiza al instante.
    const pedir = useCallback(async (metodo, ruta = "", body) => {
        if (!isComprador) return { ok: false, error: new Error("Solo un comprador tiene carrito") }

        try {
            setError(null)
            setLoading(true)
            const carrito = await api(metodo, `${RUTAS.carrito}${ruta}/${user.id}`, { body })
            setCart(carritoAVista(carrito))
            return { ok: true }
        } catch (error) {
            console.error(error)
            setError(error)
            return { ok: false, error }
        } finally {
            setLoading(false)
        }
    }, [isComprador])

    // al entrar, se trae el carrito guardado (si el usuario no tenía, el back lo crea)
    const refetch = useCallback(() => pedir("GET"), [pedir])
    useEffect(() => { refetch() }, [refetch])

    // POST suma a lo que ya había · PATCH fija la cantidad
    const addToCart = (libroId, cantidad = 1) => pedir("POST", "", { libro: libroId, cantidad })
    const setQuantity = (libroId, cantidad) => pedir("PATCH", `/${libroId}`, { cantidad })
    const removeItem = (libroId) => pedir("DELETE", `/${libroId}`)
    const clearCart = () => pedir("DELETE")

    // el "+" y el "-" son casos particulares de fijar la cantidad
    const increment = (libroId) => addToCart(libroId, 1)
    const decrement = (libroId) => {
        const item = cart.items.find((i) => i.product.id === libroId)
        if (!item) return Promise.resolve({ ok: false })
        // si queda en 0, se saca del carrito: el back exige cantidad >= 1
        return item.quantity <= 1 ? removeItem(libroId) : setQuantity(libroId, item.quantity - 1)
    }

    return {
        items: cart.items,
        unidades: cart.unidades,
        total: cart.total,
        loading,
        error,
        addToCart,
        setQuantity,
        increment,
        decrement,
        removeItem,
        clearCart,
        refetch,
    }
}

export default useCart
