import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRegisterUser from '../../hooks/user/useRegisterUser'
import useAuth from '../../hooks/user/useAuth'
import { notifyToast, notifyError } from '../../utils/notify'

const FORM_VACIO = {
    email: "",
    name: "",
    lastName: "",
    password: "",
}

function RegisterUserPage() {
    // El rol ya no se elige aca: lo asigna el back (todo registro es "comprador").
    // Si el front pudiera mandarlo, cualquiera se registraria como admin.
    const [form, setForm] = useState(FORM_VACIO)

    const { registerUser } = useRegisterUser()
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const { user, message } = await registerUser(form)
        if(user){
            setForm(FORM_VACIO)
            // si el back devolvio token, el usuario ya queda logueado
            if (user.token) {
                login(user)
                notifyToast(`¡Bienvenido/a, ${user.name}!`)
                navigate("/")
            } else {
                notifyToast("Cuenta creada, ya podés entrar")
                navigate("/user/login")
            }
        } else {
            // el mensaje viene del back (ej: "La contraseña necesita al menos 6 caracteres")
            notifyError("No se pudo registrar", message)
        }
    }

  return (
    <div className="container my-4" style={{ maxWidth: "420px" }}>
    <h1 className="mb-4"> Registrar usuario </h1>

    <form onSubmit={handleFormSubmit} className="w-100">

    <div className="mb-3 w-100">
      <label htmlFor="name" className="form-label">Nombre</label>
      <input className="form-control" onChange={handleInputChange} value={form.name} type="text" required minLength={3} name='name' id='name' />
    </div>

    {/* El back exige apellido (mínimo 3 caracteres) */}
    <div className="mb-3 w-100">
      <label htmlFor="lastName" className="form-label">Apellido</label>
      <input className="form-control" onChange={handleInputChange} value={form.lastName} type="text" required minLength={3} name='lastName' id='lastName' />
    </div>

    <div className="mb-3 w-100">
      <label htmlFor="email" className="form-label">Email</label>
      <input className="form-control" onChange={handleInputChange} value={form.email} type="email" required name='email' id='email' />
    </div>

    <div className="mb-3 w-100">
      <label htmlFor="password" className="form-label">Password</label>
      <input className="form-control" onChange={handleInputChange} value={form.password} type="password" required name='password' id='password' />
    </div>

    <button type='submit' className="btn btn-primary w-100 mb-2"> Registrar usuario </button>
    <button type='reset' onClick={() => setForm(FORM_VACIO)} className="btn btn-outline-secondary w-100">Limpiar formulario </button>

    </form>
    </div>
  )
}

export default RegisterUserPage
