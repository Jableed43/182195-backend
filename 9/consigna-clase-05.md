# 📝 Consigna — Clase 5: arreglar la veterinaria

**Nombre:** ______________________________   **Fecha:** ____________

> Vamos a arreglar la base `veterinaria` que construimos en la clase 6.
> No es un ejercicio inventado: es **su** base, con **sus** datos.

```sql
USE veterinaria;
SELECT * FROM duenio;
SELECT * FROM mascota;
```

---

# PARTE A — La migración

## Paso 1 — Diagnóstico

La tabla `mascota` tiene una columna `apellido`, que **pretende** decir de quién es cada animal.

**1.1** Escribí una consulta que muestre, para cada mascota, su `nombre`, su `apellido`, y el
`idduenio` del dueño cuyo apellido coincida. Usá `LEFT JOIN`.

```sql

```

**1.2** ¿Cuántas mascotas quedaron con el dueño en `NULL`?  → `____ de 4`

**1.3** ¿Por qué pasó esto? ¿Alguien cargó mal los datos?

`_______________________________________________________________`

`_______________________________________________________________`

**1.4** ⚠️ Escribí un `INSERT` que agregue una mascota con `apellido = 'zzzzz'`.
¿La base te deja? ¿Debería?

```sql

```

`_______________________________________________________________`

---

## Paso 2 — Agregar la columna que faltaba

`mascota` necesita una columna que guarde el **id** del dueño, no su apellido.

**2.1** Agregá a `mascota` una columna `id_duenio` de tipo `INT`, que **acepte `NULL`**.

> 💡 ¿Por qué nullable y no `NOT NULL`? Porque las filas que ya existen no tienen valor.
> Si la declarás `NOT NULL` sin `DEFAULT`, el `ALTER` falla.

```sql

```

**2.2** Verificá con `DESCRIBE`.

---

## Paso 3 — Migrar los datos que se puedan

**3.1** Escribí un `UPDATE` que complete `id_duenio` en las mascotas cuyo `apellido` **sí**
coincide con el de un dueño.

> 💡 Se puede hacer con un `UPDATE` que use `JOIN`:
> ```sql
> UPDATE mascota m
> JOIN duenio d ON ...
> SET m.id_duenio = ...;
> ```

```sql

```

**3.2** ¿Cuántas filas modificó?  → `____`

**3.3** Verificá:

```sql
SELECT idmascota, nombre, apellido, id_duenio FROM mascota;
```

---

## Paso 4 — ⚠️ El problema que no tiene solución técnica

Quedaron mascotas con `id_duenio` en `NULL`.

**4.1** Listalas:

```sql

```

**4.2** **¿De quién es Firulais?**

`_______________________________________________________________`

**4.3** Escribí la consulta que recupere esa información desde algún lado de la base.

```sql

```

> 🛑 **Si no pudiste escribirla, es porque no existe.** La información **se perdió**, y ninguna
> consulta la puede traer de vuelta. No estaba en ninguna parte: nunca se guardó.

**4.4** ¿Qué harías en un caso real? Elegí una y justificá en una línea:

- [ ] Llamar por teléfono a los dueños y volver a cargar los datos
- [ ] Borrar esas mascotas
- [ ] Crear un dueño "Sin identificar" y asignárselas
- [ ] Dejar `id_duenio` en `NULL` y aceptar que esas mascotas no tienen dueño registrado

`_______________________________________________________________`

**4.5** **La pregunta de fondo:** ¿en qué momento se podría haber evitado esto?

`_______________________________________________________________`

---

## Paso 5 — Declarar la FOREIGN KEY

**5.1** Declarala con `ALTER TABLE`. Poné un nombre: `fk_mascota_duenio`.

```sql

```

> ⚠️ Si te da `Cannot add or update a child row`, todavía tenés filas con un `id_duenio` que no
> existe. Volvé al paso 4.

**5.2** Verificá que quedó:

```sql
SHOW CREATE TABLE mascota;
```

**5.3** Elegí la política `ON DELETE` y **justificá**. Si se borra un dueño de la veterinaria:

- [ ] `RESTRICT` — no dejar borrarlo mientras tenga mascotas
- [ ] `CASCADE` — borrar también sus mascotas
- [ ] `SET NULL` — dejar las mascotas sin dueño asignado

`_______________________________________________________________`

Rehacé la FK con la política que elegiste:

```sql
ALTER TABLE mascota DROP FOREIGN KEY fk_mascota_duenio;

```

---

## Paso 6 — Probar que ahora sí protege

**6.1** Intentá insertar una mascota con `id_duenio = 999`. ¿Qué error da?

```sql

```

`_______________________________________________________________`

**6.2** Intentá borrar un dueño que tenga mascotas. ¿Qué pasa? ¿Coincide con la política que
elegiste en 5.3?

```sql

```

`_______________________________________________________________`

---

## Paso 7 — Limpiar

**7.1** Ahora que el vínculo real está declarado, la columna `apellido` de `mascota` **sobra**: es
información duplicada y desactualizable.

Eliminala.

```sql

```

**7.2** Consulta final: mostrá cada mascota con el **nombre y apellido de su dueño real**.

```sql

```

**7.3** ¿Cuántas filas devuelve? ¿Usaste `INNER` o `LEFT JOIN`? ¿Por qué?

`_______________________________________________________________`

---

# PARTE B — Una tabla nueva, bien hecha desde el principio

La veterinaria necesita registrar las **consultas médicas**.

**B.1** Creá la tabla `visita` con la FK **declarada desde el `CREATE TABLE`** (no con `ALTER`):

- `idvisita` — entero, PK, autoincremental
- `id_mascota` — entero, **obligatorio**, referencia a `mascota`
- `fecha` — fecha y hora, se completa sola con el momento de la carga
- `motivo` — texto hasta 200, obligatorio
- `diagnostico` — texto largo, opcional
- `costo` — dinero con 2 decimales, no puede ser negativo

```sql



```

**B.2** ¿Qué política `ON DELETE` le pusiste a `id_mascota`? Justificá.

> 💡 Pensalo así: si se borra una mascota del sistema, ¿el historial de sus visitas tiene sentido?
> ¿Y qué pasa con la facturación de esas visitas?

`_______________________________________________________________`

**B.3** Insertá 2 visitas válidas y 1 que falle a propósito. Anotá el error.

```sql

```

**B.4** Escribí una consulta que muestre: **nombre de la mascota**, **apellido del dueño**,
**fecha** y **motivo** de cada visita.

```sql

```

---

## ✅ Antes de entregar

- [ ] `mascota` tiene `id_duenio` con su FK declarada y con nombre
- [ ] `mascota` **ya no tiene** la columna `apellido`
- [ ] Un `INSERT` con `id_duenio` inexistente **falla**
- [ ] La tabla `visita` existe con su FK declarada en el `CREATE TABLE`
- [ ] Justifiqué las dos políticas `ON DELETE` que elegí (5.3 y B.2)
- [ ] Contesté 1.3, 4.2, 4.4, 4.5 y 7.3

---

## 🆘 Si algo no da

| Mensaje | Qué revisar |
|---|---|
| `Cannot add or update a child row` | Hay filas con un `id_duenio` que no existe. Buscalas antes de declarar la FK |
| `Cannot delete or update a parent row` | Es `RESTRICT` funcionando. Si querías otra cosa, cambiá la política |
| `Failed to add the foreign key constraint` | Tipos distintos (`INT` vs otra cosa), o la tabla no es InnoDB |
| El `ALTER ... ADD COLUMN ... NOT NULL` falla | Las filas existentes no tienen valor. Agregala nullable primero |
| `SET NULL` no se deja declarar | La columna FK está en `NOT NULL`. No pueden convivir |

---

## 🤔 Para pensar antes de la próxima clase

Todo lo que hicimos hoy tiene un costo: hay que **diseñar el esquema antes** de guardar el primer
dato, y **cada escritura paga** la validación de las relaciones.

Existen bases de datos que **resignan todo esto a propósito**: sin `JOIN`, sin `FOREIGN KEY`, sin
esquema fijo.

**¿En qué caso te convendría esa decisión?** Escribí un ejemplo concreto.

`_______________________________________________________________`

`_______________________________________________________________`
