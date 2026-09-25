import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePatchProduct from "../../hooks/products/usePatchProduct";
import useGetProductById from "../../hooks/products/useGetProductById";
import useGetAutores from "../../hooks/products/useGetAutores";
import { libroAFormulario } from "../../utils/adaptadores";
import { notifyToast, notifyError } from "../../utils/notify";

// Mismos campos que "Cargar libro", pero arrancando con los datos del libro.
function EditProductPage() {
  const [form, setForm] = useState({
    name: "", isbn: "", price: 0, quantity: 0, genero: "novela", anio: "", autor: "", available: true,
  });
  const [cargando, setCargando] = useState(true);

  const { error, patchProduct } = usePatchProduct();
  // error: getByIdError -> le cambias el nombre para que no choque con el de arriba
  const { error: getByIdError, getProductById } = useGetProductById();
  const { autores } = useGetAutores();

  // Como se usan los path params? Primero tienen que estar definidos en la ruta
  const { id } = useParams();
  const navigate = useNavigate();

  // Rellenamos el formulario con la informacion del libro que vamos a editar
  useEffect(() => {
    const loadProduct = async () => {
      const libro = await getProductById(id);
      // el back devuelve el libro en español: se traduce a los campos del form
      if (libro) setForm(libroAFormulario(libro));
      setCargando(false);
    };

    if (id) loadProduct();
    // 1. se ejecuta cuando la pagina carga  2. y de nuevo si cambia el id
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const actualizado = await patchProduct(form, id);

    if (actualizado) {
      notifyToast(`"${actualizado.titulo}" se guardó`);
      navigate("/products");
    } else {
      notifyError("No se pudo editar el libro", error?.message || "Revisá los datos");
    }
  };

  if (cargando) return <p className="text-center my-4">Cargando libro...</p>;
  if (getByIdError) return <p className="text-danger text-center my-4">{getByIdError.message}</p>;

  return (
    <div className="container my-4" style={{ maxWidth: "600px" }}>
      <h1>Editar libro</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Título</label>
          <input className="form-control" onChange={handleInputChange} value={form.name}
            type="text" required minLength={2} name="name" id="name" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="isbn">ISBN</label>
          <input className="form-control" onChange={handleInputChange} value={form.isbn}
            type="text" required name="isbn" id="isbn" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="price">Precio</label>
          <input className="form-control" onChange={handleInputChange} value={form.price}
            type="number" min={0} required name="price" id="price" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="quantity">Stock</label>
          <input className="form-control" onChange={handleInputChange} value={form.quantity}
            type="number" min={0} required name="quantity" id="quantity" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="genero">Género</label>
          <select className="form-select" onChange={handleInputChange} value={form.genero}
            name="genero" id="genero">
            <option value="novela">Novela</option>
            <option value="cuento">Cuento</option>
            <option value="poesia">Poesía</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="anio">Año</label>
          <input className="form-control" onChange={handleInputChange} value={form.anio}
            type="number" min={1400} max={2027} name="anio" id="anio" />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="autor">Autor</label>
          <select className="form-select" onChange={handleInputChange} value={form.autor}
            name="autor" id="autor">
            <option value="">— sin autor —</option>
            {autores.map((autor) => (
              <option key={autor._id} value={autor._id} style={{ textTransform: "capitalize" }}>
                {autor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-check mb-3">
          {/* disponible: si está en false, el back no deja agregarlo al carrito */}
          <input className="form-check-input" onChange={handleInputChange} checked={form.available}
            type="checkbox" name="available" id="available" />
          <label className="form-check-label" htmlFor="available">A la venta</label>
        </div>

        <button className="btn btn-primary me-2" type="submit">Guardar cambios</button>
        <button className="btn btn-outline-secondary" type="button" onClick={() => navigate("/products")}>
          Cancelar
        </button>

        {error && <p className="text-danger mt-3">{error.message}</p>}
      </form>
    </div>
  );
}

export default EditProductPage;
