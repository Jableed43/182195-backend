# Consigna — Clase 9: aggregation pipeline

**Nombre:** ______________________________   **Fecha:** ____________

> Seguís en el equipo de sistemas de la tienda. Ahora los pedidos ya no son *"traeme estos
> productos"*: son **reportes**. Números, promedios, rankings.
>
> **Tu trabajo es traducir cada pedido a un pipeline.** Nadie te dice qué etapas usar.

```js
use tienda
db.producto.countDocuments()      // tiene que dar 16
```

> Si no la tenés, corré `00-crear-tienda.js`.

**Para cada pedido:** escribí el pipeline y anotá **el resultado** (los grupos y sus valores).

**La receta, por si te trabás:**

```
$match  →  $unwind  →  $group  →  $match  →  $project  →  $sort  →  $limit
filtrar    desarmar    agrupar   filtrar     dar forma   ordenar   cortar
docs       arrays      calcular  grupos
```

---

# PARTE 1 — Filtrar, ordenar y proyectar

### 1.1
> *"Necesito obtener los productos de **hogar**, ordenados del más caro al más barato, mostrando
> solo nombre y precio."*

```js

```
**Devuelve:** `____`

### 1.2
> *"Necesito obtener los **5 productos más baratos** de toda la tienda, con nombre y precio."*

```js

```

### 1.3
> *"Necesito saber **cuántos productos activos** hay. Un número, no la lista."*

```js

```
**Resultado:** `____`

### 1.4
> *"Necesito una lista con el nombre de cada producto y **cuánta plata tengo inmovilizada** en él
> (precio por stock). Ordenada de mayor a menor, los 5 primeros."*

```js

```
**El primero es:** `_______________________  $ ____________`

### 1.5
> *"Necesito los productos de **gaming** mostrando el nombre y los **meses de garantía**, pero que la
> columna se llame `garantia` a secas."*

```js

```
**Devuelve:** `____`

---

# PARTE 2 — Agrupar y contar

### 2.1
> *"Necesito saber **cuántos productos tengo en cada categoría**, de mayor a menor."*

```js

```

| Categoría | Cantidad |
|---|---|
| | |
| | |
| | |
| | |

### 2.2
> *"Necesito el **stock total por categoría**."*

```js

```

| Categoría | Stock |
|---|---|
| | |
| | |
| | |
| | |

### 2.3
> *"Necesito el **precio promedio de cada categoría**, redondeado a 2 decimales."*

```js

```

| Categoría | Promedio |
|---|---|
| | |
| | |
| | |
| | |

### 2.4
> *"Necesito, por categoría: cuántos productos hay, el **más barato** y el **más caro**."*

```js

```

### 2.5
> *"Necesito saber **cuántos productos hay de cada color**."*

```js

```
**¿Cuántos colores distintos hay?** `____`   **¿Cuál es el más común?** `____________`

### 2.6
> *"Necesito **los totales de toda la tienda** en una sola fila: cantidad de productos, stock total y
> precio promedio."*

> 💡 Acá no querés agrupar por nada: querés un solo grupo con todo.

```js

```
**Productos:** `____`  **Stock:** `____`  **Promedio:** `____________`

### 2.7
> *"Necesito saber **cuánto vale todo mi inventario** (la suma de precio por stock de todos los
> productos). Un solo número."*

```js

```
**Resultado:** `$ ____________`

---

# PARTE 3 — Filtrar antes y después de agrupar

### 3.1
> *"Necesito la cantidad de productos por categoría, **pero contando solo los que están activos**."*

```js

```

| Categoría | Cantidad |
|---|---|
| | |
| | |
| | |
| | |

> ❓ ¿Qué categoría cambió respecto del ejercicio 2.1? ¿Por qué?
>
> `_______________________________________________________________`

### 3.2
> *"Necesito solo **las categorías que tienen más de 3 productos**."*

```js

```
**Devuelve:** `____` categorías: `_______________________________`

### 3.3
> *"Necesito **las categorías cuyo precio promedio supere los 200.000**, con el promedio redondeado."*

```js

```
**Devuelve:** `____` categorías

### 3.4 — ⭐
> *"Necesito saber, **contando solo los productos que cuestan más de 100.000**, cuántos hay por
> categoría — y quedarme solo con **las categorías que lleguen a 3 o más**."*

> 💡 Hay dos filtros en este pedido, y no van en el mismo lugar.

```js

```
**Devuelve:** `____` categorías

> ❓ ¿Por qué uno de los dos filtros va antes del `$group` y el otro después?
>
> `_______________________________________________________________`

---

# PARTE 4 — Desarmar listas

### 4.1
> *"Necesito saber **cuántas etiquetas hay en total** en la tienda, contando repetidas."*

```js

```
**Resultado:** `____`

### 4.2
> *"Necesito un **ranking de etiquetas**: cuántos productos usa cada una, de mayor a menor."*

```js

```

**Las 3 primeras:**

| Etiqueta | Productos |
|---|---|
| | |
| | |
| | |

**¿Cuántas etiquetas distintas hay?** `____`

### 4.3
> *"Del ranking anterior, necesito **solo las etiquetas que usen 3 productos o más**."*

```js

```
**Devuelve:** `____`

### 4.4
> *"Necesito saber **cuántas reseñas tiene la tienda en total**."*

```js

```
**Resultado:** `____`

### 4.5
> *"Necesito saber **cuántas reseñas escribió cada usuario**, de mayor a menor."*

```js

```

| Usuario | Reseñas |
|---|---|
| | |
| | |
| | |
| | |
| | |

### 4.6
> *"Quiero saber si alguno de nuestros reseñadores es más exigente que otro. Necesito **el puntaje
> promedio que pone cada usuario**, redondeado."*

```js

```
**¿Quién es el más generoso?** `__________`   **¿El más duro?** `__________`

---

# PARTE 5 — Reportes

### 5.1
> *"Necesito el **puntaje promedio de cada producto**, con la cantidad de reseñas que tiene.
> Ordenado de mejor a peor, los 5 primeros."*

> 💡 Hay que desarmar las reseñas y volver a agrupar por producto.

```js

```

**Los 3 mejores:**

| Producto | Promedio |
|---|---|
| | |
| | |
| | |

### 5.2
> *"Necesito los productos con **puntaje promedio menor a 4**: son los que hay que revisar."*

```js

```
**Devuelve:** `____`

### 5.3
> *"Necesito el **puntaje promedio por categoría**. Quiero saber qué rubro tiene mejor reputación."*

```js

```

| Categoría | Promedio |
|---|---|
| | |
| | |
| | |
| | |

**¿Cuál es la mejor?** `____________`   **¿La peor?** `____________`

### 5.4
> *"Necesito, por categoría, **qué marcas manejo** y cuántos productos tengo. Sin marcas repetidas."*

```js

```

> ❓ Una categoría tiene más productos que marcas. ¿Cuál y por qué?
>
> `_______________________________________________________________`

### 5.5 — El reporte completo ⭐
> *"Necesito un cuadro por categoría con: cantidad de productos, stock total, precio promedio
> redondeado, el más barato, el más caro y el valor del inventario. Ordenado por valor de inventario,
> de mayor a menor."*

```js




```

| Categoría | Prod. | Stock | Promedio | Mín. | Máx. | Inventario |
|---|---|---|---|---|---|---|
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |

### 5.6 — La que no se podía hacer antes ⭐
> *"Necesito los productos que tienen **más de 2 etiquetas**."*
>
> ⚠️ La clase pasada esto no se podía: `$size` solo acepta un número exacto. Ahora sí.

```js

```
**Devuelve:** `____`

---

# PARTE 6 — Para pensar

**6.1** ¿Qué diferencia hay entre `{ $sum: 1 }` y `{ $sum: "$stock" }`?

`_______________________________________________________________`

**6.2** ¿Qué significa `_id: null` en un `$group`?

`_______________________________________________________________`

**6.3** ¿Qué le hace `$unwind` a la cantidad de documentos? Dalo con un número de esta base.

`_______________________________________________________________`

**6.4** ¿Cuál es la diferencia entre poner `$match` antes o después del `$group`?
¿A qué se parece en SQL?

`_______________________________________________________________`

`_______________________________________________________________`

**6.5** ¿Qué diferencia hay entre escribir `"precio"` y `"$precio"` dentro de un pipeline?

`_______________________________________________________________`

---

## ✅ Antes de entregar

- [ ] Los 5 pedidos de la parte 1
- [ ] Los 7 de la parte 2, con sus tablas completas
- [ ] Los 4 de la parte 3, incluida la difícil (3.4)
- [ ] Los 6 de la parte 4
- [ ] Los 6 reportes de la parte 5
- [ ] Las 5 preguntas de la parte 6

---

## 🆘 Si algo no da

| Síntoma | Revisá |
|---|---|
| `A pipeline stage specification object must contain exactly one field` | Pusiste dos etapas dentro del mismo `{ }`. Cada etapa es un objeto propio, separado por coma |
| El resultado agrupa por algo raro | ¿El `_id` del `$group` lleva `$`? Va `_id: "$categoria"`, no `_id: "categoria"` |
| `$sum` te da 0 o el total de documentos | `{ $sum: 1 }` cuenta · `{ $sum: "$campo" }` suma valores |
| Un promedio sale con 10 decimales | Redondealo con `$round` en un `$project` después del `$group` |
| Contar por etiqueta da un solo grupo enorme | Te falta el `$unwind` antes del `$group` |
| El campo que agrupaste desapareció del resultado | Después del `$group` solo existen `_id` y lo que acumulaste. Recuperalo con `$project: { categoria: "$_id" }` |
| Un filtro no hace efecto | ¿Está antes o después del `$group`? No es lo mismo |
| Se rompió la base | Volvé a correr `00-crear-tienda.js` |
