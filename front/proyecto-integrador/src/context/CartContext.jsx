// Contexto del carrito: fuente única de verdad de lo que hay en el carrito.
//
// ⚠️ POR QUÉ EXISTE ESTE ARCHIVO
// Antes la lógica estaba en el hook useCart y cada componente que lo llamaba
// se armaba SU PROPIA copia del estado: ProductCard tenía una, CartPage otra.
// Mientras fueran dos pantallas distintas no se notaba, pero al poner el
// contador de ítems en el Header el problema salta: agregás un libro desde el
// listado, ProductCard actualiza su copia... y la del Header no se entera.
//
// Es el mismo problema que ya resolvimos con la sesión en AuthContext:
// un solo estado, arriba de todos, y todos leen de ahí.
import { createContext, useCallback, useEffect, useState } from "react"
import { RUTAS } from "../config"
import { api } from "../utils/api"
import { carritoAVista } from "../utils/adaptadores"
import useAuth from "../hooks/user/useAuth"

export const CartContext = createContext(null)

// El carrito vive en el BACK, no en sessionStorage.
// Ventajas: sobrevive al cierre del navegador, es el mismo en cualquier
// dispositivo, y el stock se valida en el servidor (nadie puede cargar 999
// unidades tocando el sessionStorage desde la consola del navegador).
//
// Todas las rutas son /api/carrito y piden token: el back saca el usuario
// del token, por eso la URL ya no lleva ningún :usuarioId.
export function CartProvider({ children }) {
    const [cart, setCart] = useState({ items: [], unidades: 0, total: 0 })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Solo el comprador tiene carrito: el back responde 403 a un vendedor o
    // a un admin, y 401 a quien no esté logueado. Sin este freno, el listado
    // de productos dispararía un error cada vez que lo abre un invitado.
    const { isComprador } = useAuth()

    // Devuelve { ok, error } en vez de un booleano: el error viaja en la misma
    // llamada. Si quien llama leyera el estado `error`, se encontraría con el
    // valor del render anterior, porque setError no actualiza al instante.
    const pedir = useCallback(async (metodo, ruta = "", body) => {
        if (!isComprador) return { ok: false, error: new Error("Solo un comprador tiene carrito") }

        try {
            setError(null)
            setLoading(true)
            const carrito = await api(metodo, `${RUTAS.carrito}${ruta}`, { body })
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

    // al entrar, se trae el carrito guardado (si el usuario no tenía, el back lo crea).
    // isComprador está en las dependencias de `pedir`: cuando alguien hace login
    // o logout, esto se vuelve a correr solo.
    const refetch = useCallback(() => pedir("GET"), [pedir])

    useEffect(() => {
        if (!isComprador) {
            // al cerrar sesión el carrito de pantalla se limpia: el del servidor queda guardado
            setCart({ items: [], unidades: 0, total: 0 })
            return
        }
        refetch()
    }, [isComprador, refetch])

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

    const value = {
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

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
