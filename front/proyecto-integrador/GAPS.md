# Gaps conocidos del front

Lo que **falta o está a medias**, anotado a propósito. Si algo está acá, es una decisión,
no un olvido. Fecha de corte: 1 de octubre de 2026, después de la clase de pedidos y checkout.

Referencia del back: `apuntes-utn/CODIGO/backend/express/7/15`.

---

## 1 · Bloqueados por el back

Estas dos pantallas están **deshabilitadas en la interfaz**, con un cartel que lo explica.

| Gap | Dónde | Qué falta en el back | Qué hay que hacer en el front |
|---|---|---|---|
| **Dar de baja un usuario** | [`AdminPanelPage.jsx`](src/components/pages/AdminPanelPage.jsx) · botón quitado | `DELETE /api/usuarios/:id` (o un `activo: false`) | un hook `useDeleteUser` y el botón de vuelta en la tabla |
| **Cambiar el rol de un usuario** | idem | `PATCH /api/usuarios/:id/rol`, solo admin | un select de rol en la fila o en el modal |
| **Pago de verdad** | el botón "Pagar" solo cambia el estado | integrar una pasarela (Mercado Pago, Stripe) | el redirect a la pasarela y la pantalla de vuelta |

> ✅ **Resuelto el 1/10/2026:** el checkout ya anda. `POST /api/pedidos` desde
> [`CartPage.jsx`](src/components/pages/CartPage.jsx), la pantalla `/orders`
> ([`OrdersPage.jsx`](src/components/pages/OrdersPage.jsx)) y el hook
> [`useOrders.jsx`](src/hooks/orders/useOrders.jsx), que sirve tanto "mis pedidos"
> como la vista del staff (`/api/pedidos/todos`).

---

## 2 · Decisiones tomadas que conviene revisar algún día

| Gap | Por qué está así | Cuándo lo cambiaría |
|---|---|---|
| ~~**El carrito no está en un contexto**~~ | ✅ **resuelto el 1/10/2026**: pasó a [`CartContext.jsx`](src/context/CartContext.jsx) justo porque se puso el contador en el header, que era el caso previsto | — |
| **Los pedidos NO están en un contexto** | `useOrders` lo usan `CartPage` (solo para `createOrder`) y `OrdersPage`. Son dos copias, pero ninguna muestra la lista en pantalla a la vez | si algún día hay un contador de pedidos pendientes en el header, sube a contexto. La regla: al contexto solo sube lo que comparten pantallas distintas |
| **El 401 no se maneja en un solo lugar** | cuando el token vence (2 h), cada pantalla muestra su propio error | un `if (status === 401) logout()` en [`api.js`](src/utils/api.js) y listo |
| **El token vive en `sessionStorage`** | simple y suficiente para clase | en producción: cookie `httpOnly`. Implica tocar el back (CORS con credenciales, CSRF) |
| **Cada hook repite el mismo `try/catch`** | se ve el patrón completo, sin magia | si crecen a diez, un `useApi` genérico |
| **La sesión no se revalida al cargar** | confiamos en lo que hay en `sessionStorage` | un `GET /api/auth/perfil` al arrancar diría si el token sigue vivo |
| **Estilos mezclados** (Bootstrap + `style={{}}`) | decisión explícita: no vale la pena pararse acá | — |
| **Sin tests, sin TypeScript, sin PropTypes** | el curso no los cubre | — |

---

## 3 · Detalles chicos

- Los libros **no tienen imagen**: la card muestra un ícono 📚 de relleno
  ([`adaptadores.js`](src/utils/adaptadores.js)). El back no tiene campo `imagen` ni dónde subir archivos.
- La **descripción** de la card se arma con autor + género, porque el libro no tiene descripción.
- El campo `highlighted` (producto destacado) quedó siempre en `false`: no existe en el back.
- El **buscador del panel admin** filtra en memoria; con muchos usuarios habría que pedirle al
  back un `?buscar=`.
- El listado de libros **no tiene paginado ni filtros**, aunque el back acepta
  `?genero=`, `?autor=` y `?disponible=`.
- El modal de usuario no atrapa el foco ni cierra con `Escape`.

---

## 4 · Lo que NO es un gap

Para que nadie lo "arregle" por error:

- **El front esconde botones por rol, y eso no es seguridad.** Cualquiera puede escribir la URL
  o pegarle a la API con Postman. El permiso real lo aplica el back con `verificarToken` y
  `permitirRoles`. El front sólo evita mostrar lo que no corresponde.
- **CORS no hace falta en desarrollo**: el proxy de Vite ([`vite.config.js`](vite.config.js))
  hace que para el navegador sea el mismo origen. El back igual tiene `cors()` puesto, que es
  lo que va a hacer falta en producción.
- **El registro no manda el rol.** Lo decide el back: todo registro nace `comprador`.
