# Teoría — Clase 8: consultas y operadores

## 0. Recordatorio: la forma de un operador

Todo lo que sigue usa la misma estructura general:

```js
db.coleccion.find({ campo: { $operador: valor } })
```

En vez de comparar el campo por igualdad directa (`{ campo: valor }`), le decís a Mongo **qué tipo de comparación** hacer con `$operador`. A partir de acá vas a combinar estos operadores entre sí para expresar pedidos cada vez más específicos.

---

## 1. Operadores de comparación

| Operador | Significado | SQL equivalente |
|---|---|---|
| `$gt` | mayor que (`>`) | `>` |
| `$gte` | mayor o igual (`>=`) | `>=` |
| `$lt` | menor que (`<`) | `<` |
| `$lte` | menor o igual (`<=`) | `<=` |
| `$ne` | distinto (`!=`) | `<>` |

```js
db.producto.find({ precio: { $gt: 200000 } })   // más de 200.000
db.producto.find({ precio: { $lt: 100000 } })   // menos de 100.000
```

### 1.1 — Rangos: combinar dos operadores en el mismo campo

Para "entre X e Y, incluidos los extremos", combinás `$gte` y `$lte` **dentro del mismo objeto**:

```js
db.producto.find({ precio: { $gte: 50000, $lte: 150000 } })
```

Esto es un AND implícito entre las dos condiciones, porque ambas viven adentro del mismo objeto de operadores para el mismo campo.

### 1.2 — Fechas

Las fechas en Mongo se comparan igual que los números, siempre que estén guardadas como tipo `Date` (no como texto):

```js
db.producto.find({ fecha_alta: { $gte: ISODate("2025-04-01") } })
```

Si comparás una fecha `Date` contra un string entre comillas (`"2025-04-01"`), la consulta no va a filtrar como esperás — son tipos distintos.

---

## 2. `$in` y `$nin`: comparar contra una lista de valores

```js
db.producto.find({ marca: { $in: ["Sony", "Samsung", "Asus"] } })   // es alguna de estas
db.producto.find({ categoria: { $nin: ["hogar", "audio"] } })       // no es ninguna de estas
```

`$in` reemplaza lo que en SQL sería `WHERE marca IN ('Sony','Samsung','Asus')`.

**¿Cuándo usar `$in` en vez de `$or`?** Cuando todas las condiciones comparan **el mismo campo** contra distintos valores posibles, `$in` es más corto y más claro. `$or` se reserva para cuando las condiciones son sobre **campos distintos**, o involucran operadores distintos entre sí (no solo "es igual a").

```js
// con $in (mismo campo, varios valores) — preferible
db.producto.find({ marca: { $in: ["Sony", "Samsung"] } })

// con $or (mismo resultado, pero más largo, no aporta nada acá)
db.producto.find({ $or: [ { marca: "Sony" }, { marca: "Samsung" } ] })

// acá $or SÍ es necesario: campos distintos
db.producto.find({ $or: [ { precio: { $gt: 250000 } }, { etiquetas: "premium" } ] })
```

---

## 3. Lógica: AND y OR

### 3.1 — AND implícito (la coma)

Cuando ponés varios campos separados por coma en un mismo objeto de filtro, Mongo exige que **se cumplan todos**:

```js
db.producto.find({ categoria: "gaming", stock: { $gt: 10 } })
// gaming Y con más de 10 de stock
```

### 3.2 — OR explícito: `$or`

Para "se cumple esto **o** esto otro", necesitás el operador `$or`, que recibe un **array** de condiciones:

```js
db.producto.find({
  $or: [
    { precio: { $lt: 20000 } },
    { stock: { $gt: 50 } }
  ]
})
```

### 3.3 — Combinar varios grupos de condiciones: `$and` explícito

Este es el caso más difícil de la guía (2.5 / 7.2): *"productos de gaming o audio, que además tengan más de 5 de stock o cuesten menos de 100.000"*. Son **dos grupos** de condiciones unidos por AND, y cada grupo es a su vez un OR.

**Por qué no alcanza con escribir dos `$or` separados por coma:** un objeto de JavaScript no puede tener dos claves iguales. Si escribís:

```js
// ESTO NO FUNCIONA — la segunda clave "$or" pisa a la primera
db.producto.find({
  $or: [ { categoria: "gaming" }, { categoria: "audio" } ],
  $or: [ { stock: { $gt: 5 } }, { precio: { $lt: 100000 } } ]
})
```

el segundo `$or` sobreescribe al primero en el objeto (mismo problema que tener dos veces la misma clave en cualquier objeto JS). La solución es envolver ambos grupos en un `$and` explícito, cada uno con su propia clave `$or` dentro de un objeto distinto del array:

```js
db.producto.find({
  $and: [
    { $or: [ { categoria: "gaming" }, { categoria: "audio" } ] },
    { $or: [ { stock: { $gt: 5 } }, { precio: { $lt: 100000 } } ] }
  ]
})
```

Cada elemento del array de `$and` es un objeto distinto, así que no hay conflicto de claves repetidas.

---

## 4. Consultas sobre texto: `$regex`

Mongo no tiene un `LIKE` como SQL, pero tiene algo más potente: expresiones regulares.

```js
db.producto.find({ nombre: { $regex: "Blue" } })             // contiene "Blue" en cualquier parte
db.producto.find({ nombre: { $regex: "^Notebook" } })        // empieza con "Notebook"
db.producto.find({ nombre: { $regex: "^M" } })                // empieza con la letra M
```

- Sin `^`, el patrón puede aparecer **en cualquier parte** del texto (equivale a `LIKE '%patron%'`).
- Con `^` al principio, el patrón tiene que estar **al inicio** del texto (equivale a `LIKE 'patron%'`).

### 4.1 — Ignorar mayúsculas/minúsculas: `$options: "i"`

```js
db.producto.find({ nombre: { $regex: "philips", $options: "i" } })
```

La `i` es de "case **i**nsensitive". Sin ella, `"Philips"` y `"philips"` se tratan como textos distintos.

### 4.2 — Negar una búsqueda de texto: `$not`

```js
db.producto.find({ nombre: { $not: { $regex: "^Notebook" } } })
```

`$not` invierte el resultado del operador que envuelve — "todos los productos **excepto** los que empiezan con Notebook".

---

## 5. Campos anidados (objetos dentro de documentos)

Cuando un documento tiene un campo que es a su vez un objeto (ej. `specs: { garantia_meses, color }`), para filtrar por un campo de adentro usás **notación de punto**, entre comillas:

```js
db.producto.find({ "specs.garantia_meses": { $gte: 24 } })
db.producto.find({ "specs.color": "negro" })
```

Las comillas son obligatorias acá porque `specs.garantia_meses` con un punto no es un identificador válido de JavaScript — sin comillas da `SyntaxError`.

### 5.1 — Un campo que todavía no existe en ningún documento

```js
db.producto.find({ descuento: { $exists: false } })
```

Igual que vimos la clase pasada: `$exists: false` trae los documentos donde el campo **no está presente**, sin importar su valor (a diferencia de comparar contra `null`, que es un valor distinto de "el campo no existe").

---

## 6. Consultas sobre arrays (listas)

Esta es la parte más nueva y la que más confunde al principio. `etiquetas` es un array de strings, `resenias` es un array de objetos.

### 6.1 — "Contiene" vs "es exactamente"

```js
db.producto.find({ etiquetas: "inalambrico" })
// SIN corchetes: trae productos cuyo array etiquetas CONTIENE "inalambrico"
// (sin importar qué otras etiquetas tenga, ni el orden)

db.producto.find({ etiquetas: ["notebook", "trabajo"] })
// CON corchetes: trae productos cuyo array etiquetas es EXACTAMENTE
// ["notebook", "trabajo"], ni un elemento más ni menos, en ese orden
```

Esta es la diferencia de la pregunta 7.3: la primera forma pregunta "¿está este valor adentro del array?"; la segunda pregunta "¿es el array, completo, igual a este que te paso?". Son consultas completamente distintas y casi nunca se usa la segunda salvo que necesites ese caso puntual.

### 6.2 — Contiene **todos** estos valores: `$all`

```js
db.producto.find({ etiquetas: { $all: ["gaming", "premium"] } })
```

Trae productos que tengan **las dos** etiquetas (pueden tener más, no importa el orden). Es distinto de buscar por igualdad de array completo: acá el array puede tener otros elementos además de esos dos.

### 6.3 — Al menos una de varias opciones

```js
db.producto.find({ etiquetas: { $in: ["premium", "rgb"] } })
```

`$in` sobre un array funciona igual que sobre un campo simple: trae el documento si **alguno** de los valores de la lista aparece en el array.

### 6.4 — Cantidad exacta de elementos: `$size`

```js
db.producto.find({ etiquetas: { $size: 4 } })
```

`$size` solo acepta un **número exacto**. No podés hacer `{ $size: { $gt: 4 } }` — el operador `$size` no admite otro operador adentro, es una limitación de Mongo. Si necesitaras "más de 4 elementos", tendrías que resolverlo con `$expr` y `$size` del framework de agregación (fuera del alcance de esta clase).

### 6.5 — Filtrar por un elemento **dentro** de un array de objetos: `$elemMatch`

`resenias` es un array de objetos, por ejemplo `{ usuario: "carla", puntaje: 5 }`. Acá aparece la trampa más común:

```js
// ⚠️ ESTO NO GARANTIZA que sea carla quien puso el 5
db.producto.find({
  "resenias.usuario": "carla",
  "resenias.puntaje": 5
})
```

Este filtro compara ambas condiciones **contra el array en general**, no contra un mismo elemento. Si el producto tiene una reseña de carla con puntaje 3, y otra reseña de "beto" con puntaje 5, este filtro **igual matchea** — porque "existe algún elemento con usuario carla" Y "existe algún elemento con puntaje 5" son ciertas por separado, aunque sean elementos distintos del array.

Para exigir que **ambas condiciones se cumplan en el mismo elemento**, usás `$elemMatch`:

```js
db.producto.find({
  resenias: {
    $elemMatch: { usuario: "carla", puntaje: 5 }
  }
})
```

**Regla práctica (pregunta 7.4):**
- Si filtrás por **una sola condición** sobre el array de objetos (ej. "alguna reseña con puntaje 5"), no hace falta `$elemMatch` — alcanza con `"resenias.puntaje": 5`.
- Si necesitás que **dos o más condiciones se cumplan en el mismo elemento** del array, `$elemMatch` es obligatorio.

```js
db.producto.find({ "resenias.puntaje": { $lte: 3 } })          // alguna reseña floja: alcanza sin $elemMatch
db.producto.find({ resenias: { $elemMatch: { usuario: "beto", puntaje: { $gte: 4 } } } }) // necesita $elemMatch
```

---

## 7. Ordenar, limitar y proyectar juntos

```js
db.producto.find({}, { nombre: 1, precio: 1, _id: 0 })
  .sort({ precio: -1 })
  .limit(3)
```

El orden de escritura de `sort()` y `limit()` no cambia el resultado (Mongo primero ordena todo y después corta), pero conceptualmente pensalo como "ordenar y después recortar".

### 7.1 — "Contar por grupo" sin `$group`

Esta clase todavía no vimos el framework de agregación (`$group`), así que para algo como "cuántos productos activos y cuántos inactivos hay", se resuelve con dos consultas separadas de `countDocuments()`:

```js
db.producto.countDocuments({ activo: true })
db.producto.countDocuments({ activo: false })
```

Más adelante, con `$group`, esto se puede hacer en una sola consulta — pero por ahora, dos consultas con filtro es la herramienta que tenés.

---

## 8. Errores comunes, explicados

| Síntoma | Por qué pasa |
|---|---|
| Un "o" devuelve de menos | Se escribió con comas (`,`) en vez de `$or`. La coma en un filtro siempre es **AND**, nunca "o". |
| `SyntaxError` en un campo anidado | Falta poner el campo entre comillas: `"specs.color"`, no `specs.color`. |
| Una fecha no filtra bien | Se comparó un `Date` contra un string, o falta `ISODate(...)` al escribir la fecha. |
| Una búsqueda de texto no encuentra nada | Falta `$options: "i"` si el texto buscado no coincide exactamente en mayúsculas/minúsculas. |
| Buscando en un array no da lo esperado | Sin corchetes es "contiene un valor"; con corchetes (`[...]`) es "el array es exactamente ese". |
| `$size` con `$gt` da error | `$size` solo acepta un número exacto, no admite otro operador adentro. |
| `Unknown operator` | Revisar que el operador empiece con `$` y esté bien escrito (`$gt`, no `gt` ni `$mayor`). |
