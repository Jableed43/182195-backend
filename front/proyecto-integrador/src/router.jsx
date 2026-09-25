import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './components/pages/Home'
import Products from './components/pages/Products'
import CreateProductPage from './components/pages/CreateProductPage'
import EditProductPage from './components/pages/EditProductPage'
import RegisterUserPage from './components/pages/RegisterUserPage'
import LoginUserPage from './components/pages/LoginUserPage'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AdminPanelPage from './components/pages/AdminPanelPage'
import CartPage from './components/pages/CartPage'

export const router = createBrowserRouter([
    {
        path: "/",
        // App va a ser la pagina padre, el componente que maneja al resto de los componentes
        element: <App/>,
        children: [
            // El componente App va a tener varios hijos, que son el resto de las rutas
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/products",
                element: <Products/>
            },
            {
                // el catalogo lo maneja el staff: vendedor y admin
                path: "/products/create",
                element: (
                    <ProtectedRoute roles={["vendedor", "admin"]}>
                        <CreateProductPage />
                    </ProtectedRoute>
                )
            },
            {
                // El :id es la "creacion" del path param
                path: "/products/edit/:id",
                element: (
                    <ProtectedRoute roles={["vendedor", "admin"]}>
                        <EditProductPage />
                    </ProtectedRoute>
                )
            },
            {
                // los usuarios son solo del admin
                path: "/admin/users",
                element: (
                    <ProtectedRoute roles={["admin"]}>
                        <AdminPanelPage />
                    </ProtectedRoute>
                )
            },
            {
                // el carrito es del comprador: en el back, /api/carrito pide ese rol
                path: "/cart",
                element: (
                    <ProtectedRoute roles={["comprador"]}>
                        <CartPage />
                    </ProtectedRoute>
                )
            },
            {
                path: "/user/register",
                element: <RegisterUserPage/>
            },
            {
                path: "/user/login",
                element: <LoginUserPage />
            },
            {
                // Una ruta de error, cualquier ruta mal escrita te lleva a esta pagina
                path: "*",
                element: (
                    <div>
                        <h1> Error 404 </h1>
                        <p>Pagina no encontrada</p>
                    </div>
                )
            }
        ]
    }
])