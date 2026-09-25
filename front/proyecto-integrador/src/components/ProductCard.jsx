import { useNavigate } from "react-router-dom";
import useDeleteProduct from "../hooks/products/useDeleteProduct";
import useAuth from "../hooks/user/useAuth";
import useCart from "../hooks/cart/useCart";
import { notifyToast, notifyError, confirmAction } from "../utils/notify";

function ProductCard({ products, onProductDeleted }) {
  const navigate = useNavigate()
  const {deleteProduct, error} = useDeleteProduct()
  // isStaff = vendedor o admin: los que pueden tocar el catálogo
  // isComprador = el único que tiene carrito
  const { isStaff, isComprador } = useAuth()
  const { addToCart } = useCart()

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation()
    const { ok, error } = await addToCart(productId)
    if (ok) {
      notifyToast("Producto agregado al carrito")
    } else {
      // el back rechaza si no hay stock (409) o si el libro no está disponible,
      // y explica por qué: ese mensaje es el que se le muestra al usuario
      notifyError("No se pudo agregar", error?.message || "Revisá el stock disponible")
    }
  }
  
  const handleEditProduct = (e, productId) => {
    e.stopPropagation()
    navigate(`/products/edit/${productId}`)
  }

   const handleDeleteProduct = async (e, productId) => {
    e.stopPropagation()
    const confirmed = await confirmAction(
      "¿Eliminar producto?",
      "Esta acción no se puede deshacer.",
      "Sí, eliminar"
    )
    if(confirmed){
     // el back, además de borrar el libro, lo saca de todos los carritos
     const response = await deleteProduct(productId)
     if(response){
      // Recargar solo el listado de productos (sin recargar toda la página)
      onProductDeleted?.()
     } else {
      notifyError("No se pudo eliminar", "Ocurrió un error al borrar el producto")
     }
    }

  }

    if(error){
    return (
      <>
      <div className="loading-error-screen">
        <h2> Error al borrar el producto </h2>
        {/* <p> {error.message} </p> */}
        <p> {error?.message || String(error)} </p>
      </div>
      </>
    )
  }

  return (
    <section className="d-flex flex-row flex-wrap gap-3 justify-content-center p-3">
      {/* // La mera card */}
      {products.map((product) => (
        // Este div se va a repetir por cada producto que posea
        <div
          className="card text-center"
          style={{ width: "200px", backgroundColor: "#d0d7d8" }}
          key={product.id}
        >
          <img
            className="card-img-top"
            style={{ height: "120px", objectFit: "cover" }}
            src={product.image}
            alt={product.name}
          />

          <div className="card-body d-flex flex-column">
            <h2 className="card-title" style={{ fontSize: "16px", textTransform: "capitalize" }}>
              {product.name}
            </h2>

            <p className="card-text" style={{ textTransform: "capitalize" }}> {product.description} </p>
            <p className="fw-bold mb-1"> ${product.price} </p>
            <p className="mb-1"> Stock Disponible: {product.quantity} </p>
            {/* Renderizado condicional, condicion cortocircuito */}
            {product.highlighted && (
              <span className="badge text-bg-success mb-2"> Producto destacado </span>
            )}

            <div className="mt-auto d-grid gap-2">
              {/* Agregar al carrito: solo el comprador tiene carrito.
                  Si el libro no está disponible, el back lo rechaza con 409 */}
              {isComprador && (
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!product.available || product.quantity < 1}
                  onClick={(e) => handleAddToCart(e, product.id)}
                >
                  {product.available && product.quantity > 0 ? "Agregar al carrito" : "Sin stock"}
                </button>
              )}

              {/* Editar / Borrar: vendedor y admin */}
              {isStaff && (
                <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-outline-secondary btn-sm" onClick={(e) => handleEditProduct(e, product.id)}> Editar </button>
                <button className="btn btn-outline-danger btn-sm" onClick={(e) => handleDeleteProduct(e, product.id)} >Borrar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductCard;
