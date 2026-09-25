import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostProduct from "../../hooks/products/usePostProduct";
import useGetAutores from "../../hooks/products/useGetAutores";
import { notifyToast, notifyError } from "../../utils/notify";

// Controlled forms -> permite el uso de una unica fuente de la verdad
// estado-input-evento
//
// Los campos son los del LIBRO en el back: título, ISBN, precio, stock,
// género, año y autor. El back ya no acepta "imagen" ni "descripción":
// la descripción de la card se arma con el autor y el género (ver adaptadores).
const FORM_VACIO = {
  name: "",
  isbn: "",
  price: 0,
  quantity: 1,
  genero: "novela",
  anio: "",
  autor: "",
};

function CreateProductPage() {
  const [form, setForm] = useState(FORM_VACIO);
  const navigate = useNavigate();

  const { error, postProduct } = usePostProduct();
  const { autores } = useGetAutores();

  // Esto resuelve un problema: como tengo un objeto, ¿cómo sabe react cuál de
  // todos los campos del formulario disparó el evento del cambio?
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      // ... este spread evita que se sobreescriban los campos no editados
      ...form,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    });
  };

  const handleFormSubmit = async (e) => {
    // Evita que la pagina refresque al enviar el formulario
    e.preventDefault();

    const creado = await postProduct(form);

    if (creado) {
      setForm(FORM_VACIO);
      notifyToast(`"${creado.titulo}" se cargó al catálogo`);
      navigate("/products");
    } else {
      // el back explica qué está mal: ISBN repetido (409), validaciones (400),
      // sin token (401) o sin permiso (403)
      notifyError("No se pudo crear el libro", error?.message || "Revisá los datos");
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: "600px" }}>
      <h1>Cargar libro</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Título</label>
          <input className="form-control" onChange={handleInputChange} value={form.name}
            type="text" required minLength={2} name="name" id="name" />
        </div>

        <div className="mb-3">
          {/* El ISBN es obligatorio y ÚNICO: si se repite, el back responde 409 */}
          <label className="form-label" htmlFor="isbn">ISBN</label>
          <input className="form-control" onChange={handleInputChange} value={form.isbn}
            type="text" required name="isbn" id="isbn" placeholder="978-84-376-0007" />
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
          {/* El back valida el género con un enum: solo estos tres */}
          <label className="form-label" htmlFor="genero">Género</label>
          <select className="form-select" onChange={handleInputChange} value={form.genero}
            name="genero" id="genero">
            <option value="novela">Novela</option>
            <option value="cuento">Cuento</option>
            <option value="poesia">Poesía</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="anio">Año (opcional)</label>
          <input className="form-control" onChange={handleInputChange} value={form.anio}
            type="number" min={1400} max={2027} name="anio" id="anio" />
        </div>

        <div className="mb-3">
          {/* El libro guarda el _id del autor: por eso es un select y no un texto */}
          <label className="form-label" htmlFor="autor">Autor (opcional)</label>
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

        <button className="btn btn-primary me-2" type="submit">Crear libro</button>
        <button className="btn btn-outline-secondary" type="button" onClick={() => setForm(FORM_VACIO)}>
          Limpiar
        </button>

        {error && <p className="text-danger mt-3">{error.message}</p>}
      </form>
    </div>
  );
}

export default CreateProductPage;
