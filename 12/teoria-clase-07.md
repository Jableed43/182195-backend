# Teoría — Clase 7: Colecciones y documentos en MongoDB

## 1. Conceptos base: de SQL a MongoDB

MongoDB es una base de datos **NoSQL orientada a documentos**. Estas son sus piezas y su equivalente en el mundo relacional (SQL):

| SQL | MongoDB | Qué es |
|---|---|---|
| Base de datos | Base de datos | Contenedor de todo |
| Tabla | **Colección** | Agrupa documentos parecidos (ej. `mascota`) |
| Fila | **Documento** | Un registro individual, en formato JSON |
| Columna | **Campo** | Un dato dentro del documento |
| `PRIMARY KEY` | `_id` | Mongo lo genera solo (un `ObjectId`) si no lo especificás |

**Diferencia clave:** en SQL, todas las filas de una tabla tienen las mismas columnas (esquema fijo). En MongoDB, dos documentos de la misma colección **pueden tener campos distintos**. Por eso en la Parte 3.2.c del ejercicio se pide insertar un libro "con forma distinta": es totalmente válido, y hace explícito que Mongo no te obliga a un esquema rígido (aunque en la práctica conviene mantener cierta consistencia).

```js
use veterinaria   // te parás sobre la base "veterinaria" (la crea si no existe)
show dbs          // lista las bases que existen
show collections  // lista las colecciones de la base actual
```

---

## 2. CRUD: las 4 operaciones básicas

CRUD = **C**reate, **R**ead, **U**pdate, **D**elete. Es el mismo concepto que en SQL, solo cambia la sintaxis.

### 2.1 — Create (`insertOne`, `insertMany`)

```js
db.duenio.insertOne({
  nombre: "Pedro Sosa",
  email: "pedro.sosa@mail.com",
  telefono: "342-7778888"
})
```

- No hace falta declarar los campos de antemano: el documento que mandás **es** el esquema.
- Si no ponés `_id`, Mongo genera uno automáticamente.
- `insertMany([doc1, doc2, ...])` inserta varios documentos de una.

**Ojo con el nombre de la colección:** si tenés `db.mascota` (singular) y escribís `db.mascotas.insertOne(...)` (plural), Mongo **no te avisa del error**. Simplemente crea una colección nueva llamada `mascotas`, vacía hasta ese insert, y tu dato termina en el lugar equivocado. A diferencia de SQL, donde un `INSERT INTO tabla_inexistente` tira error, Mongo es permisivo: asume que si escribiste ese nombre, es porque la colección debería existir. Por eso conviene chequear con `show collections` cuando "algo no aparece".

### 2.2 — Read (`find`, `findOne`)

Es la operación que más vas a usar. La vemos en detalle en la sección 3.

### 2.3 — Update (`updateOne`, `updateMany`, `replaceOne`)

Ver sección 4.

### 2.4 — Delete (`deleteOne`, `deleteMany`, `drop`)

```js
db.mascota.deleteOne({ nombre: "luna" })     // borra un documento
db.mascota.deleteMany({ especie: "gato" })   // borra varios
db.mascota.drop()                            // elimina la colección entera (equivale a DROP TABLE)
```

---

## 3. Leer datos: `find()`

### 3.1 — Sintaxis general

```js
db.coleccion.find(filtro, proyeccion)
```

Ambos argumentos son **opcionales**.

```js
db.mascota.find()                    // todas, todos los campos
db.mascota.find({ especie: "gato" }) // filtro: solo los gatos
```

`find()` **no devuelve un array**, devuelve un **cursor** (un puntero a los resultados que Compass/mongosh recorre e imprime). Por eso `db.mascota.find().nombre` da `undefined`: no podés acceder a un campo de "los resultados" así porque no es un único documento. Si querés **un solo** documento como objeto, usá `findOne()`:

```js
db.mascota.findOne({ especie: "gato" }).nombre   // esto sí funciona
```

### 3.2 — Filtrar por igualdad

```js
db.mascota.find({ especie: "conejo" })
```

Si ponés **más de un campo** en el filtro, Mongo los combina con un **AND implícito** (tienen que cumplirse todos):

```js
db.mascota.find({ especie: "gato", raza: "siamesa" })
// equivale a: SELECT * FROM mascota WHERE especie='gato' AND raza='siamesa';
```

### 3.3 — Proyección: elegir qué campos ver

El segundo argumento de `find()` decide qué campos mostrar u ocultar:

```js
db.mascota.find({}, { nombre: 1, peso: 1, _id: 0 })
```

- `1` = incluir el campo.
- `0` = excluir el campo.
- **No podés mezclar** `1` y `0` en la misma proyección, salvo para `_id` (que es la única excepción: podés excluirlo con `0` aunque el resto esté en `1`).
- Sin proyección, `find()` trae **todos** los campos, incluido `_id`.

### 3.4 — Buscar documentos a los que **les falta** un campo

```js
db.mascota.find({ raza: { $exists: false } })
```

`$exists` es un **operador**: en vez de comparar contra un valor fijo, le decís a Mongo "quiero documentos donde este campo exista (`true`) o no exista (`false`)". Vas a ver muchos más operadores (`$`) la próxima clase — todos siguen esta misma lógica: `{ campo: { $operador: valor } }`.

### 3.5 — Ordenar y limitar resultados

`sort()` y `limit()` son **métodos que se encadenan al cursor** que devuelve `find()`:

```js
db.mascota.find().sort({ peso: -1 })          // orden descendente (mayor a menor)
db.mascota.find().sort({ peso: 1 })           // orden ascendente
db.mascota.find().sort({ peso: 1 }).limit(1)  // la más liviana, un solo resultado
```

- `1` = ascendente, `-1` = descendente (igual que `ASC`/`DESC` en SQL).
- El orden de encadenado importa: primero ordenás, después limitás.

### 3.6 — Contar documentos

```js
db.mascota.countDocuments()                    // total
db.mascota.countDocuments({ especie: "gato" }) // total que cumple un filtro
```

Equivale a `SELECT COUNT(*) FROM mascota [WHERE ...]`.

---

## 4. Modificar datos: `update`

### 4.1 — La regla de oro: los operadores atómicos

En MongoDB **no podés** simplemente decir "cambiá este documento por este otro campo" sin más. Necesitás un **operador de actualización**, el más común es `$set`:

```js
db.mascota.updateOne(
  { nombre: "luna" },           // filtro: a quién actualizar
  { $set: { castrada: true } }  // qué cambiar
)
```

Si te olvidás del `$set` y escribís `updateOne({nombre:"luna"}, {castrada:true})`, Mongo tira el error `Update document requires atomic operators`. Es literal: te está pidiendo que uses un operador (`$algo`) en el segundo argumento, no un documento "pelado".

### 4.2 — `updateOne` vs `updateMany`

- `updateOne(filtro, cambio)`: modifica **solo el primer** documento que matchea el filtro.
- `updateMany(filtro, cambio)`: modifica **todos** los que matchean.

```js
db.mascota.updateMany(
  { especie: "gato" },
  { $set: { requiere_arenero: true } }
)
```

### 4.3 — `updateOne` vs `replaceOne`

Esta es una de las confusiones más comunes:

- **`updateOne`** (con `$set`) modifica **solo los campos que le indicás**. El resto del documento queda intacto.
- **`replaceOne`** **reemplaza el documento entero** (excepto `_id`) por el que le pases. Todo campo que no incluyas en el reemplazo **se pierde**.

```js
// updateOne: castrada se agrega, todo lo demás sigue igual
db.mascota.updateOne({ nombre: "luna" }, { $set: { castrada: true } })

// replaceOne: PELIGRO. Si "luna" tenía 6 campos y este objeto tiene 2,
// el documento resultante va a tener SOLO esos 2 campos.
db.mascota.replaceOne({ nombre: "luna" }, { nombre: "luna", castrada: true })
```

Si notás que "se te perdieron campos al actualizar", casi seguro usaste `replaceOne` cuando en realidad querías `updateOne` con `$set`.

### 4.4 — Agregar un elemento a un array: `$push`

Cuando un campo es un array (por ejemplo, `visitas` dentro de `mascota`), `$push` agrega un elemento nuevo **al final** del array, sin tocar los que ya estaban:

```js
db.mascota.updateOne(
  { nombre: "luna" },
  { $push: { visitas: {
      fecha: "2025-10-05",
      motivo: "Vacunación anual",
      diagnostico: "Sana",
      costo: 11000
  }}}
)
```

Esto reemplaza lo que en SQL sería un `INSERT INTO visita (...) VALUES (...)` con una `FOREIGN KEY` apuntando a `mascota`. La diferencia importante (pregunta 1.3.a): en SQL, la `FOREIGN KEY` **garantiza** que no puede existir una visita sin una mascota válida asociada (integridad referencial controlada por la base). En Mongo, al embeber la visita **dentro** del documento de la mascota, ese problema directamente no existe — la visita no puede "flotar sola" porque vive adentro del documento padre. Pero si en cambio hubieras modelado `visita` como colección aparte referenciando `idMascota`, ahí sí perdés esa garantía: nadie te impide guardar una visita con un `idMascota` que no existe. **Nadie controla la integridad referencial por vos**; es responsabilidad de tu código.

### 4.5 — Modificar un número sin leerlo primero: `$inc`

```js
db.mascota.updateOne(
  { nombre: "luna" },
  { $inc: { peso: 0.4 } }
)
```

`$inc` suma (o resta, si el valor es negativo) al valor actual del campo, **sin que tengas que consultarlo primero y calcularlo a mano**. Es más seguro además: si dos procesos incrementan el mismo campo al mismo tiempo, `$inc` evita que uno pise el cambio del otro (cosa que sí podría pasar si hacés "leer, calcular en tu código, y `$set` el resultado").

---

## 5. Diseñar: ¿embebido o colección aparte?

Esta es la decisión de diseño más importante en MongoDB, y no tiene una única respuesta correcta — depende del caso.

**La regla de la clase:** *se embebe lo que siempre se lee junto y no se comparte.*

Preguntas que ayudan a decidir:

1. **¿El dato "vive y muere" con su padre?** Una visita no tiene sentido sin la mascota a la que pertenece → candidato a embeber.
2. **¿Se consulta siempre junto?** Si cada vez que pedís una mascota también querés ver su historial de visitas, embeberlo te ahorra una consulta aparte.
3. **¿El array puede crecer sin límite?** Un documento de MongoDB tiene un tamaño máximo (16 MB). Si un array puede crecer indefinidamente (ej. los préstamos de una biblioteca a lo largo de los años), embeberlo dentro de `lector` es riesgoso — mejor una colección `prestamo` aparte, referenciando `idLector` e `idLibro`.
4. **¿El dato se comparte entre varios "padres"?** Un préstamo involucra **dos** entidades (un libro y un lector) al mismo tiempo. No hay un único "padre" natural donde embeberlo sin duplicar información — es un caso típico de colección propia con referencias.

---

## 6. Tabla de equivalencias SQL → MongoDB

| SQL | MongoDB |
|---|---|
| `SELECT * FROM tabla;` | `db.coleccion.find()` |
| `SELECT col1, col2 FROM tabla;` | `db.coleccion.find({}, { col1: 1, col2: 1, _id: 0 })` |
| `SELECT * FROM tabla WHERE campo = 'x';` | `db.coleccion.find({ campo: "x" })` |
| `SELECT COUNT(*) FROM tabla;` | `db.coleccion.countDocuments()` |
| `INSERT INTO tabla (col) VALUES ('x');` | `db.coleccion.insertOne({ col: "x" })` |
| `UPDATE tabla SET col = x WHERE id = y;` | `db.coleccion.updateOne({ _id: y }, { $set: { col: x } })` |
| `DELETE FROM tabla WHERE id = y;` | `db.coleccion.deleteOne({ _id: y })` |
| `DROP TABLE tabla;` | `db.coleccion.drop()` |
| `SELECT * FROM tabla ORDER BY col DESC LIMIT 3;` | `db.coleccion.find().sort({ col: -1 }).limit(3)` |

---

## 7. Errores comunes, explicados

| Síntoma | Por qué pasa |
|---|---|
| "Inserté y no aparece" | Probablemente insertaste en otra colección o en otra base. Revisá con `db` (base actual) y `show collections`. Mongo crea colecciones nuevas sin avisar si escribiste mal el nombre. |
| `Update document requires atomic operators` | Te falta envolver el cambio en un operador como `$set`. |
| "Se perdieron campos al actualizar" | Usaste `replaceOne` (reemplaza todo el documento) en vez de `updateOne` con `$set` (solo modifica lo que le indicás). |
| `E11000 duplicate key error` | Intentaste insertar un documento con un `_id` que ya existe. Los `_id` deben ser únicos por colección. |
| Una consulta devuelve 0 y no debería | Revisá los tipos: `"5"` (texto) no es igual a `5` (número) para Mongo. |
| `db.x.find().nombre` da `undefined` | `find()` devuelve un cursor, no un documento. Para acceder a un campo directamente, usá `findOne()`. |
