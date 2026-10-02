import useOrders from "../../hooks/orders/useOrders"
import { notifyError, notifyToast, confirmAction } from "../../utils/notify"

// Un color por estado, para leer la tabla de un vistazo
const COLOR_ESTADO = {
  pendiente: "text-bg-warning",
  pagado: "text-bg-success",
  cancelado: "text-bg-secondary",
}

// /orders
//   comprador -> MIS pedidos, y puede pagarlos o cancelarlos
//   staff     -> TODOS los pedidos, solo para mirar
// El front muestra u oculta los botones; el permiso de verdad lo pone el back.
function OrdersPage() {
  const { orders, loading, error, payOrder, cancelOrder, verTodos } = useOrders()

  const conAviso = async (accion, exito) => {
    const { ok, error } = await accion()
    if (ok) notifyToast(exito)
    // el back explica por qué no se pudo (ej: "No se puede pasar a pagado un pedido que está cancelado")
    else notifyError("No se pudo", error?.message || "Intentá de nuevo")
  }

  const handleCancel = async (id) => {
    const confirmado = await confirmAction(
      "¿Cancelar el pedido?",
      "El stock vuelve al catálogo.",
      "Sí, cancelar"
    )
    if (confirmado) conAviso(() => cancelOrder(id), "Pedido cancelado")
  }

  if (loading && orders.length === 0) return <p className="text-center my-4">Cargando pedidos...</p>

  return (
    <div className="container my-4">
      <h1 className="mb-4">{verTodos ? "Todos los pedidos" : "Mis pedidos"}</h1>

      {error && <p className="text-danger">{error.message}</p>}

      {orders.length === 0 ? (
        <p>{verTodos ? "Todavía nadie compró nada." : "Todavía no compraste nada."}</p>
      ) : (
        orders.map((pedido) => (
          <div className="card mb-3" key={pedido.id}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <strong>{pedido.fecha}</strong>
                {/* el nombre del comprador solo viene en la vista del staff */}
                {pedido.comprador && <span className="text-muted"> · {pedido.comprador}</span>}
              </div>
              <span className={`badge ${COLOR_ESTADO[pedido.estado] ?? "text-bg-light"}`}>
                {pedido.estado}
              </span>
            </div>

            <div className="card-body">
              <table className="table table-sm align-middle mb-3">
                <thead>
                  <tr>
                    <th>Libro</th>
                    <th>Precio pagado</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.lineas.map((linea) => (
                    <tr key={linea.libroId}>
                      <td style={{ textTransform: "capitalize" }}>{linea.titulo}</td>
                      <td>${linea.precioUnitario}</td>
                      <td>{linea.cantidad}</td>
                      <td>${linea.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h5 mb-0">Total: ${pedido.total}</h2>

                {/* Solo el dueño puede pagar o cancelar, y solo si está pendiente.
                    Si se mandara igual, el back responde 403 (no es tuyo) o 409 (ya no está pendiente). */}
                {!verTodos && pedido.estado === "pendiente" && (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      disabled={loading}
                      onClick={() => conAviso(() => payOrder(pedido.id), "Pedido pagado")}
                    >
                      Pagar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      disabled={loading}
                      onClick={() => handleCancel(pedido.id)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      <p className="text-muted">
        <small>
          Cada línea guarda el precio que se pagó en ese momento: si el libro cambia de precio,
          el pedido no se mueve.
        </small>
      </p>
    </div>
  )
}

export default OrdersPage
