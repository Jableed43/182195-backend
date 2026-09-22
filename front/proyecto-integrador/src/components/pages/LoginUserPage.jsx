import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoginUser from "../../hooks/user/useLoginUser";
import useAuth from "../../hooks/user/useAuth";
import { notifySuccess, notifyError } from "../../utils/notify";

function LoginUserPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const {login} = useAuth()
  const navigate = useNavigate()

  const {loginUser} = useLoginUser()

    const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

      const handleFormSubmit = async (e) => {
        e.preventDefault()
        // user = usuario sin password, con el rol y el token
        const { user, message } = await loginUser(form.email, form.password)
        if(user){
            login(user)
            setForm({
                email: "",
                password: ""
            })
            await notifySuccess("¡Bienvenido!", `Sesión iniciada como ${user.name}`)
            navigate("/")
        } else {
            // el mensaje viene del back (ej: "Email o contraseña incorrectos")
            notifyError("No se pudo iniciar sesión", message)
        }
    }

  return (
    <div className="container my-4" style={{ maxWidth: "420px" }}>
      <h1 className="mb-4"> Login de usuario </h1>

      <form onSubmit={handleFormSubmit} className="w-100">

        <div className="mb-3 w-100">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            onChange={handleInputChange}
            value={form.email}
            type="email"
            required
            name="email"
            id="email"
          />
        </div>

        <div className="mb-3 w-100">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            className="form-control"
            onChange={handleInputChange}
            value={form.password}
            type="password"
            required
            name="password"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100"> Login </button>
      </form>
    </div>
  );
}

export default LoginUserPage;
