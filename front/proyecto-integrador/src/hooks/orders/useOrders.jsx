// Pedidos: listar, confirmar la compra, pagar y cancelar.
//
// Este hook NO va en un contexto: la lista de pedidos la usa una sola pantalla.
// El carrito sí lo necesita, porque lo miran el Header, el listado y el carrito.
// La regla: al contexto solo sube lo que comparten pantallas distintas.
import { useCallback, useEffect, useState } from "react"
import { RUTAS } from "../../config"
import { api } from "../../utils/api"
import { pedidoAVista } from "../../utils/adaptadores"
import useAuth from "../user/useAuth"

function useOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // El comprador ve LOS SUYOS (el back filtra por el token).
    // El staff ve TODOS, en otra ruta: /api/pedidos/todos.
    const { isComprador, isStaff } = useAuth()
    const ruta = isStaff ? RUTAS.pedidosTodos : RUTAS.pedidos

    const refetch = useCallback(async () => {
        if (!isComprador && !isStaff) return

        try {
            setError(null)
            setLoading(true)
            const pedidos = await api("GET", ruta)
            setOrders(pedidos.map(pedidoAVista))
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [ruta, isComprador, isStaff])

    useEffect(() => { refetch() }, [refetch])

    // Devuelve { ok, error, pedido } para que la pantalla decida qué avisar
    const accion = async (metodo, ruta) => {
        try {
            setError(null)
            setLoading(true)
            const pedido = await api(metodo, ruta)
            await refetch()
            return { ok: true, pedido: pedidoAVista(pedido) }
        } catch (error) {
            console.error(error)
            setError(error)
            return { ok: false, error }
        } finally {
            setLoading(false)
        }
    }

    // ⭐ Confirmar la compra. No lleva body: el back arma el pedido con el
    //    carrito del usuario del token y calcula el total él mismo.
    const createOrder = () => accion("POST", RUTAS.pedidos)
    const payOrder = (id) => accion("PATCH", `${RUTAS.pedidos}/${id}/pagar`)
    const cancelOrder = (id) => accion("PATCH", `${RUTAS.pedidos}/${id}/cancelar`)

    return { orders, loading, error, refetch, createOrder, payOrder, cancelOrder, verTodos: isStaff }
}

export default useOrders
