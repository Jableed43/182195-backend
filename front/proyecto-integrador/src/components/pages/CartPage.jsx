import useCart from "../../hooks/cart/useCart"
import { notifyError, confirmAction } from "../../utils/notify"

// Vista del carrito (/cart), solo para compradores.
// Ya no cruza items con productos ni calcula totales: el back devuelve el
// carrito con los libros populados, el subtotal de cada ítem y el total,
// calculados con el precio VIVO del libro.
function CartPage() {
  const { items, unidades, total, loading, error, increment, decrement, removeItem, clearCart } = useCart()

  const handleClearCart = async () => {
    const confirmed = await confirmAction(
      "¿Vaciar el carrito?",
      "Se quitarán todos los productos.",
      "Sí, vaciar"
    )
    if (confirmed) clearCart()
  }

  // El back valida el stock: si no alcanza, contesta 409 con el detalle.
  const conAviso = async (accion) => {
    const { ok, error } = await accion()
    if (!ok) notifyError("No se pudo actualizar el carrito", error?.message || "Revisá el stock disponible.")
  }

  if (loading && items.length === 0) return <p className="text-center my-4">Cargando carrito...</p>

  return (
    <div className="container my-4">
      <h1 className="mb-4">Mi Carrito</h1>

      {error && <p className="text-danger">{error.message}</p>}

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ product, quantity, subtotal }) => (
                <tr key={product.id}>
                  <td style={{ textTransform: "capitalize" }}>{product.name}</td>
                  <td>${product.price}</td>
                  <td>
                    <button className="btn btn-outline-secondary btn-sm" disabled={loading} onClick={() => conAviso(() => decrement(product.id))}>-</button>
                    <span className="mx-3">{quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm" disabled={loading} onClick={() => conAviso(() => increment(product.id))}>+</button>
                  </td>
                  <td>${subtotal}</td>
                  <td>
                    <button className="btn btn-outline-danger btn-sm" disabled={loading} onClick={() => removeItem(product.id)}>Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="my-3">Total: ${total}</h2>
          <p className="text-muted">{unidades} {unidades === 1 ? "unidad" : "unidades"}</p>

          {/* Confirmar la compra crea un PEDIDO y descuenta el stock.
              Ese endpoint (POST /api/pedidos) todavía no existe en el back:
              se implementa en la clase de pedidos. Hasta entonces, el botón
              queda deshabilitado en vez de pegarle a una ruta inexistente. */}
          <button className="btn btn-success me-2" disabled title="Se habilita en la clase de pedidos">
            Finalizar compra
          </button>
          <button className="btn btn-outline-secondary" onClick={handleClearCart} disabled={loading}>
            Vaciar carrito
          </button>

          <p className="text-muted mt-3">
            <small>
              El carrito ya se guarda en el servidor: si cerrás sesión y volvés a entrar, sigue acá.
              Confirmar la compra llega con los pedidos.
            </small>
          </p>
        </>
      )}
    </div>
  )
}

export default CartPage
