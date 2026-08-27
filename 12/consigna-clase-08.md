# Consigna — Clase 8: consultas y operadores

**Nombre:** ______________________________   **Fecha:** ____________

> Trabajás en el equipo de sistemas de una tienda online. Te van llegando pedidos.
> **Tu trabajo es traducir cada pedido a una consulta.**
>
> Nadie te va a decir qué operador usar: eso lo decidís vos.
> Tenés `REFERENCIA-OPERADORES.md` al lado.

```js
use tienda
db.producto.countDocuments()      // tiene que dar 16
```

> Si no la tenés, corré `00-crear-tienda.js`.

**Para cada pedido:** escribí la consulta y anotá **cuántos documentos devuelve**.

---

# PARTE 1 — Pedidos simples

### 1.1
> *"Necesito obtener todos los productos de la categoría **audio**."*

```js

```
**Devuelve:** `____`

### 1.2
> *"Necesito obtener los productos que cuestan **más de 200.000**."*

```js

```
**Devuelve:** `____`

### 1.3
> *"Necesito obtener los productos que cuestan **menos de 100.000**."*

```js

```
**Devuelve:** `____`

### 1.4
> *"Necesito obtener los productos que **no son** de la categoría informática."*

```js

```
**Devuelve:** `____`

### 1.5
> *"Necesito obtener los productos que están **dados de baja** (inactivos)."*

```js

```
**Devuelve:** `____`

### 1.6
> *"Necesito obtener los productos que cuestan **entre 50.000 y 150.000**, incluidos los dos
> extremos."*

```js

```
**Devuelve:** `____`

### 1.7
> *"Necesito obtener los productos que tienen **entre 10 y 30 unidades** de stock."*

```js

```
**Devuelve:** `____`

### 1.8
> *"Necesito obtener los productos de las marcas **Sony, Samsung o Asus**."*

```js

```
**Devuelve:** `____`

### 1.9
> *"Necesito obtener los productos que **no** son ni de hogar ni de audio."*

```js

```
**Devuelve:** `____`

### 1.10
> *"Necesito obtener los productos dados de alta **a partir del 1 de abril de 2025**."*

```js

```
**Devuelve:** `____`

---

# PARTE 2 — Pedidos con más de una condición

### 2.1
> *"Necesito obtener los productos de **gaming** que además tengan **más de 10 unidades** en stock."*

```js

```
**Devuelve:** `____`

### 2.2
> *"Necesito obtener los productos que cuesten **menos de 20.000** **o** que tengan **más de 50
> unidades** en stock. Con que cumplan una de las dos, me sirve."*

```js

```
**Devuelve:** `____`

### 2.3
> *"Para la sección de productos premium necesito obtener los que cuestan **más de 250.000** **o**
> tienen la etiqueta `premium`."*

```js

```
**Devuelve:** `____`

### 2.4
> *"Necesito obtener los productos con la etiqueta `accesorio` que cuesten **menos de 50.000**."*

```js

```
**Devuelve:** `____`

### 2.5 — La difícil ⭐
> *"Necesito obtener los productos de **gaming o audio**, que además tengan **más de 5 unidades** en
> stock **o** cuesten **menos de 100.000**."*

> 💡 Son dos grupos de condiciones. Pensá bien cómo combinarlos.

```js

```
**Devuelve:** `____`

---

# PARTE 3 — Pedidos sobre texto

### 3.1
> *"Necesito obtener todos los productos cuyo nombre **empiece con** la palabra Notebook."*

```js

```
**Devuelve:** `____`

### 3.2
> *"Necesito obtener los productos que tengan la palabra **Blue** en algún lugar del nombre."*

```js

```
**Devuelve:** `____`

### 3.3
> *"Necesito obtener los productos cuyo nombre **empiece con la letra M**."*

```js

```
**Devuelve:** `____`

### 3.4
> *"En el buscador de la web alguien escribió **`note`** en minúscula. Necesito obtener todas las
> notebooks igual, sin importar cómo lo haya escrito."*

```js

```
**Devuelve:** `____`

### 3.5
> *"Necesito obtener los productos que tengan la palabra **philips** en el nombre, sin importar
> mayúsculas ni minúsculas."*

```js

```
**Devuelve:** `____`

### 3.6
> *"Necesito obtener todos los productos **excepto** las notebooks."*

```js

```
**Devuelve:** `____`

---

# PARTE 4 — Pedidos sobre la ficha técnica

> Recordá que `specs` es un objeto anidado: `{ garantia_meses, color }`

### 4.1
> *"Necesito obtener los productos con **24 meses de garantía o más**."*

```js

```
**Devuelve:** `____`

### 4.2
> *"Necesito obtener los productos de **color negro**."*

```js

```
**Devuelve:** `____`

### 4.3
> *"Necesito obtener los productos que sean **negros o blancos**."*

```js

```
**Devuelve:** `____`

### 4.4
> *"Estamos por incorporar un campo `descuento`. Necesito obtener los productos que **todavía no lo
> tienen** cargado."*

```js

```
**Devuelve:** `____`

---

# PARTE 5 — Pedidos sobre listas

### 5.1
> *"Necesito obtener los productos que tengan la etiqueta `inalambrico`."*

```js

```
**Devuelve:** `____`

### 5.2
> *"Necesito obtener los productos que tengan las etiquetas `gaming` **y** `premium`, las dos."*

```js

```
**Devuelve:** `____`

### 5.3
> *"Necesito obtener los productos que tengan **al menos una** de estas dos etiquetas: `premium` o
> `rgb`."*

```js

```
**Devuelve:** `____`

### 5.4
> *"Necesito obtener los productos que tengan **exactamente 4** etiquetas cargadas."*

```js

```
**Devuelve:** `____`

### 5.5
> *"Necesito obtener los productos que tengan **alguna reseña con puntaje 5**."*

```js

```
**Devuelve:** `____`

### 5.6
> *"Necesito obtener los productos que recibieron **alguna reseña floja**: de 3 puntos o menos."*

```js

```
**Devuelve:** `____`

### 5.7 — ⭐
> *"Necesito obtener los productos donde **el usuario `carla` puso un 5**."*
>
> ⚠️ Ojo: no alcanza con que carla haya opinado y que además exista un 5. Tiene que ser **carla la
> que puso ese 5**.

```js

```
**Devuelve:** `____`

### 5.8 — ⭐
> *"Necesito obtener los productos donde **`beto` puso 4 o más**."*

```js

```
**Devuelve:** `____`

---

# PARTE 6 — Pedidos con orden y límite

### 6.1
> *"Necesito obtener los **3 productos más caros**, mostrando solo el nombre y el precio."*

```js

```

### 6.2
> *"Necesito obtener los **3 más baratos**, con nombre y precio."*

```js

```

### 6.3
> *"Necesito obtener los productos a los que **les queda poco stock** (menos de 10 unidades),
> mostrando nombre, marca y stock, ordenados de menor a mayor stock."*

```js

```
**Devuelve:** `____`

### 6.4
> *"Necesito obtener **cuántos productos** hay en cada situación: activos e inactivos."*
>
> 💡 Son dos consultas.

```js

```
**Activos:** `____`   **Inactivos:** `____`

---

# PARTE 7 — Para pensar

**7.1** ¿Cuándo conviene usar `$in` y cuándo `$or`?

`_______________________________________________________________`

**7.2** En el pedido 2.5 tuviste que combinar dos grupos de condiciones. ¿Por qué no alcanzaba con
escribir los dos `$or` separados por coma?

`_______________________________________________________________`

`_______________________________________________________________`

**7.3** ¿Qué diferencia hay entre estas dos consultas?

```js
db.producto.find({ etiquetas: "notebook" })
db.producto.find({ etiquetas: ["notebook", "trabajo"] })
```

`_______________________________________________________________`

**7.4** ¿En qué casos hace falta `$elemMatch` y en cuáles no?

`_______________________________________________________________`

`_______________________________________________________________`

---

## ✅ Antes de entregar

- [ ] Las 10 consultas de la parte 1
- [ ] Las 5 de la parte 2, incluida la difícil (2.5)
- [ ] Las 6 de texto (parte 3)
- [ ] Las 4 de ficha técnica (parte 4)
- [ ] Las 8 de listas (parte 5)
- [ ] Las 4 de orden y límite (parte 6)
- [ ] Las 4 preguntas (parte 7)

---

## 🆘 Si algo no da

| Síntoma | Revisá |
|---|---|
| Un "o" devuelve de menos | ¿Lo escribiste con comas? Las comas son **y**. El "o" va con `$or` y un array |
| `SyntaxError` en un campo anidado | Le faltan las comillas: `"specs.color"` |
| Una fecha no filtra bien | ¿Usaste `ISODate(...)` o la comparaste contra un texto entre comillas? |
| Una búsqueda de texto no encuentra nada | ¿Le falta la `i` para ignorar mayúsculas? |
| Buscando en una lista no devuelve lo esperado | Sin corchetes es "contiene". Con corchetes es "la lista es exactamente esa" |
| `$size` con `$gt` da error | `$size` solo acepta un número exacto |
| `Unknown operator` | Revisá el `$` y que esté bien escrito |
| Se rompió la base | Volvé a correr `00-crear-tienda.js` |
