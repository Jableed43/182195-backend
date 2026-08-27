# Consigna — Clase 7: colecciones y documentos

**Nombre:** ______________________________   **Fecha:** ____________

> Se resuelve en la consola `>_MONGOSH` de Compass.
> Las partes 1 y 2 usan la base `veterinaria` que armaste en clase.
> La parte 3 la construís de cero.

---

# PARTE 1 — Sobre la veterinaria

Verificá primero que tenés la base:

```js
use veterinaria
db.mascota.countDocuments()    // tiene que dar 4
```

> Si no la tenés o se desordenó, pedile al profe el `00-reset.js`.

### 1.1 — Leer

Escribí la consulta para cada pedido y anotá cuántos documentos devuelve.

| # | Pedido | Consulta | Resultados |
|---|---|---|---|
| a | Todas las mascotas | | |
| b | Solo los conejos | | |
| c | Solo el nombre y el peso de todas, sin el `_id` | | |
| d | Las mascotas de Marcela Diaz | | |
| e | Las mascotas que pesan más de… *(no se puede todavía)* | — | — |
| f | Ordenadas por peso, de mayor a menor | | |
| g | La mascota más liviana (solo una) | | |
| h | Cuántas mascotas hay en total | | |
| i | Las mascotas que **no tienen** el campo `raza` | | |

> 💡 El punto **(e)** está tachado a propósito: para comparar "mayor que" hace falta un operador que
> vemos la clase que viene. Si lo intentaste y no pudiste, está bien.

### 1.2 — Escribir

**a)** Agregá un cuarto dueño: **Pedro Sosa**, `pedro.sosa@mail.com`, teléfono `342-7778888`.

```js

```

**b)** Agregá una mascota nueva de Pedro: **luna**, gata, nacida el `2022-11-30`, raza `siamesa`,
peso `3.20`, sin visitas.

```js

```

**c)** A `luna` le detectaron que está castrada. Agregale el campo `castrada: true`.

```js

```

**d)** `luna` vino a la veterinaria. Agregale esta visita **al array**:
fecha `2025-10-05`, motivo `"Vacunación anual"`, diagnóstico `"Sana"`, costo `11000`.

```js

```

**e)** Subile el peso a `luna` en `0.4`, **sin escribir el peso nuevo a mano**.

```js

```

**f)** A todas las mascotas de especie `gato`, agregales el campo `requiere_arenero: true`.

```js

```

**g)** Verificá que quedó todo bien:

```js

```

### 1.3 — Preguntas

**a)** En el ejercicio 1.2.d usaste `$push` para agregar una visita. En MySQL eso era un
`INSERT INTO visita ...` con su `FOREIGN KEY`. **¿Qué controlaba la FK que acá no controla nadie?**

`_______________________________________________________________`

**b)** ¿Qué pasa si te equivocás y escribís `db.mascotas.insertOne(...)` en plural?
¿Te avisa MongoDB?

`_______________________________________________________________`

**c)** ¿Cuál es la diferencia entre `updateOne` y `replaceOne`?

`_______________________________________________________________`

---

# PARTE 2 — Traducir

Para cada sentencia SQL, escribí el equivalente en MongoDB.

| # | SQL | MongoDB |
|---|---|---|
| a | `SELECT * FROM mascota;` | |
| b | `SELECT nombre, peso FROM mascota;` | |
| c | `SELECT * FROM mascota WHERE especie = 'perro';` | |
| d | `SELECT COUNT(*) FROM mascota;` | |
| e | `INSERT INTO duenio (nombre) VALUES ('Ana');` | |
| f | `UPDATE mascota SET peso = 4 WHERE idmascota = 2;` | |
| g | `DELETE FROM mascota WHERE idmascota = 5;` | |
| h | `DROP TABLE mascota;` | |
| i | `SELECT * FROM mascota ORDER BY peso DESC LIMIT 3;` | |

---

# PARTE 3 — Tu propia base

Vas a construir de cero una base para una **biblioteca**.

## 3.1 — Diseñar

Antes de escribir código, decidí el modelo. La biblioteca tiene:

- **Lectores**: nombre, apellido, email, fecha de alta
- **Libros**: título, autor, ISBN, año, cantidad de ejemplares
- **Préstamos**: qué libro, qué lector, fecha de préstamo, fecha de devolución, si está devuelto

**a)** ¿Cuántas **colecciones** vas a crear?  `____`

**b)** ¿Dónde ponés los préstamos? Marcá una y **justificá**:

- [ ] Colección propia `prestamo`
- [ ] Embebidos dentro de `lector`
- [ ] Embebidos dentro de `libro`

`_______________________________________________________________`

`_______________________________________________________________`

> 💡 La regla de la clase: **se embebe lo que siempre se lee junto y no se comparte.**
> Y pensá también: ¿un array de préstamos puede crecer sin límite?

**c)** Escribí **un documento de ejemplo** de cada colección, con datos inventados:

```js




```

## 3.2 — Construir

**a)** Creá la base `biblioteca` y cargá **3 lectores** y **4 libros**.

```js

```

**b)** Registrá **al menos 3 préstamos**, según el modelo que elegiste.

```js

```

**c)** Insertá **un libro con la forma distinta** a los demás: que tenga algún campo que ningún otro
tenga, y que le falte alguno que todos tienen.

```js

```

## 3.3 — Consultar

Escribí las consultas y anotá los resultados.

| # | Pedido | Consulta | Resultados |
|---|---|---|---|
| a | Todos los libros | | |
| b | Solo título y autor, sin `_id` | | |
| c | Los libros de un autor a elección | | |
| d | Cuántos lectores hay | | |
| e | Los libros ordenados por año, del más nuevo al más viejo | | |
| f | El libro que le falta un campo (el del punto 3.2.c) | | |

## 3.4 — Modificar

**a)** A un libro, subile en 1 la cantidad de ejemplares (con el operador que corresponde).

```js

```

**b)** Marcá un préstamo como devuelto.

```js

```

**c)** Un lector cambió de email. Actualizalo.

```js

```

## 3.5 — Reflexión

**a)** Con tu modelo, ¿qué consulta se volvió **fácil** que en MySQL habría necesitado un `JOIN`?

`_______________________________________________________________`

**b)** ¿Qué consulta se volvió **difícil**?
*(Pista: pensá en un reporte que cruce datos de varias colecciones.)*

`_______________________________________________________________`

**c)** Si un libro cambia de título, ¿en cuántos lugares de tu base tenés que actualizarlo?

`_______________________________________________________________`

---

## ✅ Antes de entregar

- [ ] Las 9 consultas de la parte 1.1 están escritas con su resultado
- [ ] Los 7 comandos de escritura de la parte 1.2 funcionan
- [ ] Las 9 traducciones de la parte 2 están completas
- [ ] La base `biblioteca` existe, con sus colecciones cargadas
- [ ] Justifiqué dónde puse los préstamos (3.1.b)
- [ ] Contesté las tres preguntas de 3.5

---

## 🆘 Si algo no da

| Síntoma | Revisá |
|---|---|
| "Inserté y no aparece" | `db` para ver dónde estás · `show collections` para ver el nombre |
| `Update document requires atomic operators` | Te falta el `$set` |
| Se te perdieron campos al actualizar | Usaste `replaceOne` en vez de `updateOne` |
| `E11000 duplicate key error` | Estás repitiendo un `_id` |
| Una consulta devuelve 0 y no debería | ¿Estás comparando texto contra número? `"5"` no es `5` |
| `db.x.find().nombre` da `undefined` | `find` devuelve un cursor. Va `findOne` |
| Se te rompió la veterinaria | Pedí el `00-reset.js` |
