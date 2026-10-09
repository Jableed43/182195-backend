import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePostProduct from "../../hooks/products/usePostProduct";
import useGetAutores from "../../hooks/products/useGetAutores";
import { notifyToast, notifyError } from "../../utils/notify";

// Controlled forms -> permite el uso de una unica fuente de la verdad
// estado-input-evento
//
// Los campos son los del LIBRO en el back: título, ISBN, precio, stock,
// género, año, autor y la TAPA (un archivo).
// La descripción de la card se arma con el autor y el género (ver adaptadores).
const FORM_VACIO = {
  name: "",
  isbn: "",
  price: 0,
  quantity: 1,
  genero: "novela",
  anio: "",
  autor: "",
  // la tapa: acá no va un texto, va el ARCHIVO que elige el usuario
  imagen: null,
};

function CreateProductPage() {
  const [form, setForm] = useState(FORM_VACIO);
  const navigate = useNavigate();

  const { error, postProduct } = usePostProduct();
  const { autores } = useGetAutores();

  // Esto resuelve un problema: como tengo un objeto, ¿cómo sabe react cuál de
  // todos los campos del formulario disparó el evento del cambio?
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // un input de tipo file no tiene "value": tiene e.target.files, una lista.
    // Como subimos una sola imagen, nos quedamos con la primera.
    if (type === "file") {
      setForm({ ...form, [name]: files[0] ?? null });
      return;
    }

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

        <div className="mb-3">
          {/* ⭐ LA TAPA.
              accept="image/*" filtra lo que muestra el explorador de archivos, pero
              es solo comodidad: el que decide de verdad es el fileFilter del back. */}
          <label className="form-label" htmlFor="imagen">Tapa (opcional)</label>
          <input className="form-control" onChange={handleInputChange}
            type="file" accept="image/*" name="imagen" id="imagen" />

          {form.imagen && (
            <p className="form-text mb-0">
              {form.imagen.name} · {Math.round(form.imagen.size / 1024)} KB
              {form.imagen.size > 5 * 1024 * 1024 && (
                <span className="text-danger"> — pesa más de 5 MB, el back la va a rechazar</span>
              )}
            </p>
          )}
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
