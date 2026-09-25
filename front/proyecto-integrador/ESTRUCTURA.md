# Cómo está ordenado este front

Mapa corto para ubicarse. El detalle de lo que falta está en [GAPS.md](GAPS.md).

```
src/
├── config.js          las rutas del back en un solo lugar (RUTAS)
├── router.jsx         qué URL muestra qué página, y quién puede entrar
├── utils/
│   ├── api.js         ⭐ el ÚNICO lugar que hace fetch: agrega el token y traduce errores
│   ├── adaptadores.js ⭐ traduce back (español) ↔ front (inglés)
│   └── notify.js      avisos: toast, error, confirmación
├── context/
│   └── AuthContext    la sesión: quién está logueado, su rol y su token
├── hooks/             traen y mandan datos. Uno por operación
│   ├── products/      useGetProducts · useGetProductById · usePost · usePatch · useDelete · useGetAutores
│   ├── cart/          useCart (las 5 operaciones del carrito)
│   └── user/          useAuth · useLoginUser · useRegisterUser · useGetUsers
└── components/
    ├── layout/        Header · Footer · Layout · ProtectedRoute
    ├── pages/         una por ruta
    └── ...            ProductCard · UserDetailModal · Input
```

## La regla de oro

**El componente pinta, el hook trae.** Un componente no hace `fetch`; llama a un hook.
Un hook no dibuja; devuelve datos, `loading` y `error`.

Y todos los hooks pasan por `utils/api.js`, que es el único que sabe la URL del back,
mete el token y convierte la respuesta de error en un mensaje legible.

## El recorrido de un dato

```
Componente          "quiero los libros"
   ↓
Hook                useGetProducts()
   ↓
utils/api.js        GET /api/libros  + Authorization si hay sesión
   ↓
Vite (proxy)        /api → http://localhost:3000
   ↓
Backend             responde JSON en español
   ↑
adaptadores.js      libro → product (titulo→name, precio→price, stock→quantity)
   ↑
Componente          pinta la card
```

## Los tres roles

| | comprador | vendedor | admin |
|---|:--:|:--:|:--:|
| ver el catálogo | ✅ | ✅ | ✅ |
| carrito | ✅ | ❌ | ❌ |
| cargar, editar y borrar libros | ❌ | ✅ | ✅ |
| panel de usuarios | ❌ | ❌ | ✅ |

En el front eso se decide con `isComprador`, `isStaff` e `isAdmin` (`AuthContext`), y con
`<ProtectedRoute roles={[...]}>` en `router.jsx`. **Es sólo para la experiencia de uso:**
el permiso de verdad lo aplica el back.

## Correrlo

```bash
npm install
npm run dev
```

Necesita el back andando en el puerto **3000** (`apuntes-utn/CODIGO/backend/express/7/15`):

```bash
npm run seed   # carga libros y los 3 usuarios de prueba
npm start
```

Usuarios del seed: `ana.gomez@mail.com / ana12345` (comprador) ·
`carla.ruiz@mail.com / carla1234` (vendedor) · `admin@mail.com / admin1234` (admin).

`VITE_API_URL=/api/` está en `.env.local`: es una ruta relativa que atiende el proxy de Vite.
