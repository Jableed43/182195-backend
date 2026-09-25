import { useState } from "react"
import { NavLink } from "react-router-dom"
import useGetUsers from "../../hooks/user/useGetUsers"
import UserDetailModal from "../UserDetailModal"

// Panel de Administrador (Gestión de Usuarios).
// Layout tipo Dashboard con sidebar. El buscador filtra en memoria del cliente
// sobre el estado de React (no vuelve a pegarle a la API).
//
// La lista sale de GET /api/usuarios, que el back reserva para el rol admin.
// Dar de baja usuarios todavía no existe en el back (no hay DELETE ni PATCH
// de usuarios): por eso ese botón no está. Cuando exista, vuelve.
function AdminPanelPage() {
  const { users, error, loading } = useGetUsers()

  const [search, setSearch] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  // Filtro en memoria por nombre o email
  const term = search.trim().toLowerCase()
  const filteredUsers = term
    ? users.filter(
        (u) =>
          u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term)
      )
    : users

  return (
    <div style={{ display: "flex", minHeight: "70vh" }}>
      {/* Sidebar de navegación rápida */}
      <aside
        style={{
          width: "220px",
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Panel Admin</h2>
        <NavLink to="/admin/users" style={{ color: "white" }}>
          👥 Usuarios
        </NavLink>
        <NavLink to="/products" style={{ color: "white" }}>
          📦 Productos
        </NavLink>
        <NavLink to="/products/create" style={{ color: "white" }}>
          ➕ Cargar libro
        </NavLink>
      </aside>

      {/* Contenido principal */}
      <main style={{ flex: 1, padding: "20px" }}>
        <h1>Gestión de Usuarios</h1>
        {/* BUSCADOR */}
        <input
          type="text"
          className="form-control my-3"
          placeholder="Buscar por nombre o email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "400px" }}
        />

        {loading && <p>Cargando usuarios...</p>}
        {error && <p className="text-danger">{error?.message || String(error)}</p>}

        <p className="text-muted">
          <small>
            Dar de baja usuarios y cambiar roles todavía no existen en la API.
            Los vendedores y el admin se crean con el seed.
          </small>
        </p>

        {!loading && !error && (
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge text-bg-${user.role === "admin" ? "danger" : user.role === "vendedor" ? "warning" : "secondary"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setSelectedUser(user)}>Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* Modal de detalles del usuario seleccionado (sin historial de compras) */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}

export default AdminPanelPage
