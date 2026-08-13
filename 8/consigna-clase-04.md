# 📝 Consigna — Clase 4: JOINs

**Nombre:** ______________________________   **Fecha:** ____________

---

## Antes de empezar

```sql
USE escuela;
```

🚩 **Toda la práctica es de solo lectura.** No escribas `CREATE`, `DROP`, `DELETE` ni `UPDATE`.

### Las cuatro tablas

```
docente                 materia                    inscripcion              estudiante
 iddocente  🔑           idmateria   🔑              idinscripcion  🔑         idestudiante  🔑
 nombre                  nombre                     idestudiante  ➡️ ──────►  nombre
 apellido       ◄──────  docente_id  ➡️              idmateria     ➡️          apellido
 especialidad            codigo                     fecha_inscripcion        fecha_nacimiento
 fecha_ingreso           creditos                   nota                     telefono
```

### 🎯 Cómo autocorregirte

Cada ejercicio dice **cuántas filas** tiene que devolver tu consulta.
Si el número no coincide, algo está mal — casi siempre es el tipo de JOIN o el `ON`.

> 💡 Para contar rápido: envolvé tu consulta o mirá el contador de filas que muestra Workbench
> abajo de la grilla de resultados.

---

## NIVEL 1 — Dos tablas con INNER JOIN

### 1.1 — Notas con nombre *(→ 56 filas)*
Mostrá **nombre**, **apellido** del estudiante y la **nota** de cada inscripción.

```sql

```

### 1.2 — Cada materia con su docente *(→ 30 filas)*
Mostrá el **nombre de la materia**, y el **nombre y apellido** del docente que la dicta.

```sql

```

### 1.3 — Las materias de una docente *(→ 7 filas)*
Mostrá las materias que dicta la docente de apellido **López**.
⚠️ No uses `docente_id = 2`: filtrá por el **apellido**.

```sql

```

### 1.4 — Los mejores *(→ 14 filas)*
Mostrá **nombre y apellido del estudiante** y la **nota**, solo de las inscripciones con nota
mayor o igual a 9. Ordenalas de mayor a menor.

```sql

```

### 1.5 — Sin nota todavía *(→ 5 filas)*
Mostrá **nombre y apellido del estudiante** de las inscripciones que **todavía no tienen nota**.

> 💡 Acordate de la Clase 3: `= NULL` no funciona.

```sql

```

---

## NIVEL 2 — LEFT JOIN

### 2.1 — Todos los estudiantes, cursen o no *(→ 64 filas)*
Mostrá **todos** los estudiantes junto a la materia que cursan.
Los que no cursan nada **también tienen que aparecer**.

```sql

```

**❓ ¿Por qué son 64 y no 56?**

`_______________________________________________________________`

### 2.2 — Todas las materias, tengan inscriptos o no *(→ 65 filas)*

```sql

```

### 2.3 — ⭐ Los que no cursan nada *(→ 8 filas)*
Mostrá **nombre y apellido** de los estudiantes que **no están inscriptos en ninguna materia**.

> 💡 Es el patrón `LEFT JOIN` + `WHERE ... IS NULL`.

```sql

```

### 2.4 — Materias que nadie eligió *(→ 9 filas)*
Mostrá el **nombre y código** de las materias sin ningún inscripto.

```sql

```

### 2.5 — ❓ Sin escribir código
Si hicieras `materia INNER JOIN docente`, ¿cuántas filas darían? ¿Y con `LEFT JOIN`?
¿Por qué?

`_______________________________________________________________`

`_______________________________________________________________`

---

## NIVEL 3 — Tres o más tablas

### 3.1 — El listado completo *(→ 56 filas)*
Mostrá **nombre del estudiante**, **nombre de la materia** y **nota**.
Ordenado por apellido del estudiante.

```sql

```

### 3.2 — Con el docente *(→ 14 filas)*
Mostrá **estudiante**, **materia**, **apellido del docente** y **nota**, solo para las
inscripciones con nota mayor o igual a 9.

```sql

```

### 3.3 — Los inscriptos de una docente *(→ 12 filas)*
Mostrá **nombre del estudiante** y **nombre de la materia**, solo de las materias que dicta la
docente de apellido **López**.

```sql

```

### 3.4 — Programación *(→ 18 filas)*
Mostrá **estudiante**, **materia** y **nota** de todas las inscripciones a materias que tengan
**"Programación"** en el nombre.

> 💡 `LIKE` de la Clase 3 + `JOIN` de hoy.

```sql

```

---

## NIVEL 4 — JOIN + GROUP BY

### 4.1 — Inscriptos por materia *(→ 21 filas)*
Mostrá el **nombre de la materia** y **cuántos inscriptos** tiene, de mayor a menor.

```sql

```

**❓ ¿Por qué son 21 y no 30?**

`_______________________________________________________________`

### 4.2 — ⭐ Ahora sí, las 30 *(→ 30 filas)*
Lo mismo, pero **incluyendo las materias con cero inscriptos**.

> ⚠️ **Cuidado con el `COUNT`.** Si las materias vacías te dan **1** en vez de **0**, estás
> contando la fila de los `NULL`. Revisá qué le pasás a `COUNT()`.

```sql

```

### 4.3 — Cuántas materias dicta cada docente *(→ 10 filas)*
Mostrá **nombre y apellido** del docente y su cantidad de materias, de mayor a menor.

```sql

```

### 4.4 — Los que más cursan *(→ 6 filas)*
Mostrá **nombre y apellido** de los estudiantes que cursan **más de 3 materias**, con la cantidad.

```sql

```

### 4.5 — Promedio por materia *(→ 8 filas)*
Mostrá el **nombre de la materia** y su **promedio de notas redondeado a 2 decimales**, solo para
las materias que tengan **3 notas cargadas o más**. De mayor a menor promedio.

```sql

```

---

## 🏆 DESAFÍO

### D.1 — Docentes exigentes… o generosos *(→ 4 filas)*
Mostrá **nombre y apellido** de los docentes cuyas materias tienen un **promedio general mayor a 8**,
junto a ese promedio.

> 💡 Hay que atravesar tres tablas: `docente → materia → inscripcion`.

```sql

```

### D.2 — El reporte completo
Armá **una sola consulta** que muestre, para cada materia:

- nombre de la materia
- apellido del docente
- cantidad de inscriptos (**0 si no tiene**)
- promedio de notas (`NULL` si no tiene)

Ordenado por cantidad de inscriptos, de mayor a menor.

*(→ 30 filas)*

```sql



```

---

## ✅ Antes de entregar

- [ ] Todas las consultas devuelven la cantidad de filas indicada
- [ ] Usé **alias de tabla** (`e`, `i`, `m`, `d`) en todas
- [ ] En los ejercicios del Nivel 2 usé `LEFT JOIN`, no `INNER`
- [ ] En 4.2 las materias vacías dicen **0** y no 1
- [ ] Contesté las tres preguntas escritas (2.1, 2.5 y 4.1)

---

## 🆘 Si algo no da

| Síntoma | Revisá |
|---|---|
| `Column 'nombre' in field list is ambiguous` | Falta el prefijo: `e.nombre` en vez de `nombre` |
| Devuelve **muchísimas** filas (cientos) | Falta el `ON`, o compara columnas que no se corresponden |
| Mi `LEFT JOIN` da lo mismo que `INNER` | ¿Pusiste un filtro de la tabla derecha en el `WHERE`? Va en el `ON` |
| Las materias vacías cuentan 1 en vez de 0 | Usá `COUNT(i.idinscripcion)`, no `COUNT(*)` |
| `Unknown column 'x'` | Alias mal escrito, o lo usás antes de definirlo |
| Me da 0 filas y no debería | ¿Comparaste algo con `= NULL`? Va `IS NULL` |
