import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/user/useAuth";

function Header() {
  const { isAuthenticated, isAdmin, isStaff, isComprador, user, logout } = useAuth();

  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Ecommerce
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/products"
                >
                  Productos
                </NavLink>
              </li>
              {
                !isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  aria-current="page"
                  className="nav-link"
                  to="/user/register"
                >
                  Registrate
                </NavLink>
              </li>
                )
              }
              {!isAuthenticated && (
                <li className="nav-item">
                  <NavLink
                    aria-current="page"
                    className="nav-link"
                    to="/user/login"
                  >
                    Ingresá
                  </NavLink>
                </li>
              )}
              {/* Carrito: solo el comprador tiene carrito */}
              {isComprador && (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to={`/cart/${user.id}`}>
                    Carrito
                  </NavLink>
                </li>
              )}
              {/* Cargar libros: vendedor y admin */}
              {isStaff && (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/products/create">
                    Cargar libro
                  </NavLink>
                </li>
              )}
              {/* Panel Admin: solo para administradores */}
              {isAdmin && (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/admin/users">
                    Panel Admin
                  </NavLink>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-2">
                    Logout
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </nav>
      {user && <p> Bienvenido {user.email} · <strong>{user.role}</strong> </p>}
    </header>
  );
}

export default Header;
