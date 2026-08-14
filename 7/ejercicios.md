# Consignas de Práctica SQL

Basado en las consultas del archivo `consultas-clase-03.sql`.

## BLOQUE 1 — SELECT: elegir columnas
1. **1.1 Todo:** Arma una consulta para obtener todos los registros y columnas de la tabla `estudiante`. 
`SELECT * FROM escuela.estudiante`

2. **1.2 Solo las columnas que necesito:** Arma una consulta para obtener únicamente el `nombre`, `apellido` y `email` de la tabla `estudiante`.


3. **1.3 Alias:** Arma una consulta para obtener el `nombre` y `apellido` de los estudiantes, renombrando las columnas en el resultado a `primer_nombre` y `apellido_paterno` respectivamente.

4. **1.4 Columnas calculadas:** Arma una consulta para obtener el `nombre`, `apellido` y el año de nacimiento de los estudiantes (puedes calcularlo extrayendo el año de `fecha_nacimiento` y nombrándolo `anio_nacimiento`).
`SELECT nombre, apellido, YEAR(fecha_nacimiento) as anio_nacimiento from escuela.estudiante`

## BLOQUE 2 — WHERE: elegir filas
5. **2.1 Igualdad:** Arma una consulta para obtener todos los datos de los estudiantes cuyo `apellido` sea exactamente 'Herrera'.
`SELECT * FROM escuela.estudiante WHERE apellido = 'Herrera';`

6. **2.2 Comparación (>):** Arma una consulta para obtener todas las inscripciones cuya `nota` sea estrictamente mayor a 9.
`SELECT * FROM escuela.inscripcion WHERE nota > 9;`

7. **2.2 Comparación (>=):** Arma una consulta para obtener todas las inscripciones cuya `nota` sea mayor o igual a 9.
`SELECT * FROM escuela.inscripcion WHERE nota >= 9;`

8. **2.3 Distinto:** Arma una consulta para obtener todas las materias cuyo `docente_id` sea distinto de 1.
Este sirve pero no conviene por compatibilidad
`# SELECT * FROM escuela.materia WHERE docente_id != 1;`
Opcion de mayor compatibilidad
`# SELECT * FROM escuela.materia WHERE docente_id <> 1;`
Sirve para generar condiciones mas complejas con AND y OR
`# SELECT * FROM escuela.materia WHERE NOT (docente_id = 1);`

9. **2.4 AND:** Arma una consulta para obtener las inscripciones que tengan una `nota` mayor o igual a 8 **y** que su `fecha_inscripcion` sea desde el '2025-01-20' en adelante.
`SELECT * FROM inscripcion
WHERE nota >= 8 AND fecha_inscripcion >= '2025-01-20'`

10. **2.5 OR:** Arma una consulta para obtener los estudiantes cuyo `apellido` sea 'Diaz' **o** 'Garcia'.
`SELECT * FROM estudiante WHERE apellido = "Diaz" OR apellido = "Garcia";`

11. **2.6 AND y OR combinados:** Arma una consulta para obtener las inscripciones que correspondan a las materias con id 1 o 2, **y que además** tengan una nota mayor o igual a 8. *(Pista: ¡usa paréntesis!)*
`SELECT * FROM inscripcion
WHERE (idmateria = 1 OR idmateria = 2) AND nota >= 8;`

## BLOQUE 3 — Operadores especiales
12. **3.1 LIKE (1):** Arma una consulta para obtener los estudiantes cuyo `nombre` comience con la letra 'M'.
13. **3.1 LIKE (2):** Arma una consulta para obtener los estudiantes cuyo `email` termine en 'gmail.com'.
`SELECT * FROM estudiante where email LIKE "%gmail.com"`
14. **3.1 LIKE (3):** Arma una consulta para obtener las materias que contengan la palabra 'Datos' en cualquier parte de su `nombre`.
`SELECT * FROM materia WHERE nombre LIKE "%datos%"`

15. **3.1 LIKE (4):** Arma una consulta para obtener las materias cuyo `codigo` comience con la letra 'P'.
16. **3.2 BETWEEN (1):** Arma una consulta para obtener los estudiantes cuya `fecha_nacimiento` se encuentre entre el 1 de enero de 2000 y el 31 de diciembre de 2002 (inclusive).
`SELECT * FROM escuela.estudiante 
where fecha_nacimiento between "2000-01-01" AND "2002-12-31"`
17. **3.2 BETWEEN (2):** Arma una consulta para obtener las inscripciones cuya `nota` esté entre 8 y 9 (inclusive).
`SELECT * FROM inscripcion WHERE nota BETWEEN 8 and 9;`

18. **3.3 IN:** Arma una consulta para obtener las materias cuyo `docente_id` sea 1 o 2, utilizando el operador para buscar en una lista.
`SELECT * FROM escuela.materia WHERE materia.docente_id IN (1, 2);`

19. **3.4 NOT IN:** Arma una consulta para obtener las materias cuyo `docente_id` **no sea** ni 1, ni 2, ni 3.
`SELECT * FROM escuela.materia WHERE materia.docente_id NOT IN (1, 2, 3);`

## BLOQUE 4 — Manejo de NULL
20. **4.2 IS NULL (1):** Arma una consulta para obtener las inscripciones que todavía no tienen una `nota` asignada (su valor es nulo).
`SELECT * FROM escuela.inscripcion WHERE inscripcion.nota IS NULL;`

21. **4.3 IS NOT NULL:** Arma una consulta para obtener las inscripciones que ya cuentan con una `nota` asignada (no nulo).
22. **4.4 IS NULL (2):** Arma una consulta para obtener los estudiantes que no tengan registrado un `telefono` (valor nulo).

## BLOQUE 5 — DISTINCT, ORDER BY y LIMIT
23. **5.1 DISTINCT (1):** Arma una consulta para obtener todos los apellidos distintos (sin repeticiones) de los estudiantes.
`SELECT DISTINCT apellido FROM estudiante`
24. **5.1 DISTINCT (2):** Arma una consulta para obtener las especialidades únicas que tienen los docentes.
`SELECT distinct especialidad FROM docente`
25. **5.2 ORDER BY (1):** Arma una consulta para obtener el `nombre` y `apellido` de los estudiantes ordenados alfabéticamente por apellido (ascendente).
`SELECT nombre, apellido from estudiante 
order by apellido ASC, nombre ASC;`

26. **5.2 ORDER BY (2):** Arma una consulta para obtener todas las inscripciones ordenadas por `nota` de mayor a menor (descendente).
`SELECT * from inscripcion where nota is not null
order by nota desc
limit 5`
`OJO el limit no se basa en el contenido del registro si no en su orden`
27. **5.3 Múltiples criterios:** Arma una consulta para obtener el `nombre` y `apellido` de los estudiantes ordenados por apellido ascendentemente, y en caso de empate, por nombre ascendentemente.
28. **5.4 LIMIT:** Arma una consulta para obtener las 5 mejores notas de inscripción (excluyendo valores nulos).
29. **5.5 OFFSET:** Arma una consulta para obtener el `nombre` y `apellido` de los estudiantes ordenados por id, pero muestra únicamente de la fila 11 a la 20 (salteando las primeras 10 filas).

## BLOQUE 6 — Funciones de agregación
30. **6.1 COUNT general:** Arma una consulta para obtener la cantidad total de registros en la tabla `inscripcion`.
 `SELECT COUNT(*) AS total_inscripciones from inscripcion`

**Extra: cuantos a cuantas materias se anoto cada estudiante?**
`SELECT idestudiante, COUNT(*) AS cantidad_materias
from inscripcion
group by idestudiante`

31. **6.2 COUNT específico:** Arma una consulta para obtener en la misma fila: el total de registros en `inscripcion` y la cantidad de inscripciones que sí tienen una `nota`.

`SELECT COUNT(*) AS filas_totales,
	COUNT(nota) AS filas_con_nota
FROM inscripcion`

32. **6.3 AVG, MIN, MAX:** Arma una consulta para obtener el promedio de notas (redondeado a 2 decimales), la peor nota y la mejor nota de toda la tabla `inscripcion`.

`SELECT ROUND(AVG(nota), 2) as promedio,
MIN(nota) as peor,
MAX(nota) as mejor
from inscripcion`

33. **6.5 SUM:** Arma una consulta para obtener la suma total de `creditos` de todas las materias.
`SELECT SUM(creditos) AS creditos_totales FROM materia;`
34. **6.6 Agregación + Filtro:** Arma una consulta para obtener la cantidad total de inscripciones que tienen una nota igual o mayor a 7.
`SELECT COUNT(*) AS aprobados from inscripcion WHERE nota >= 7 
#Desaprobados
SELECT COUNT(*) AS desaprobados from inscripcion WHERE nota < 7 `

## BLOQUE 7 — GROUP BY: agrupar antes de calcular
35. **7.1:** Arma una consulta para obtener la cantidad de materias que dicta cada docente.
`SELECT docente_id, COUNT(*) AS cantidad_materias
from materia
group by docente_id`
36. **7.2:** Arma una consulta para obtener la cantidad de inscriptos que tiene cada materia, ordenado de mayor a menor cantidad de inscriptos.
`select idmateria, count(*) as inscriptos
from inscripcion
group by idmateria
order by inscriptos DESC`
37. **7.3:** Arma una consulta para obtener, por cada `idmateria`, su cantidad de inscriptos y el promedio de notas (redondeado a 2 decimales), ordenado del mejor promedio al peor.
38. **7.4:** Arma una consulta para obtener la cantidad de materias en las que está inscripto cada estudiante, ordenado de mayor a menor cantidad.

## BLOQUE 8 — HAVING: filtrar grupos
Diferencia having y where
--     WHERE  filtra FILAS   ANTES de agrupar
--     HAVING filtra GRUPOS  DESPUÉS de agrupar
39. **8.2:** Arma una consulta para obtener el `idmateria` y la cantidad de inscriptos, solo para aquellas materias que tengan más de 5 inscriptos.
`SELECT idmateria, COUNT(*) AS inscriptos
FROM inscripcion
GROUP BY idmateria
HAVING inscriptos > 5;`
40. **8.3:** Arma una consulta para obtener el `idestudiante` y la cantidad de materias en las que está, solo para aquellos que cursen 4 materias o más, ordenado de mayor a menor cantidad.
SELECT idestudiante, COUNT(*) AS materias
FROM inscripcion
GROUP BY idestudiante
HAVING materias >= 4
ORDER BY materias DESC;
41. **8.4:** Arma una consulta para obtener las materias que tengan un promedio de `nota` mayor a 8.5. Muestra el promedio redondeado y ordena de mayor a menor.
42. **8.5:** Arma una consulta para obtener los docentes (su `docente_id`) y su cantidad de materias asignadas, solo para aquellos que tengan más de 5 materias asignadas.
43. **8.6 WHERE + HAVING:** Arma una consulta para obtener las materias mostrando cantidad de inscriptos y promedio de notas, pero evaluando únicamente a los alumnos con nota asignada, y filtrando al final para que solo se muestren las materias que tengan al menos 3 registros con nota. Ordena de mayor a menor promedio.

## BLOQUE 9 — Todo junto
44. **9.1:** Arma una consulta para obtener las 3 materias más elegidas (con más inscriptos evaluados). Muestra cantidad de inscriptos, promedio, peor nota y mejor nota, ignorando los alumnos sin nota cargada.
45. **9.2:** Arma una consulta para obtener los estudiantes destacados: aquellos que tengan al menos 3 materias evaluadas y cuyo promedio sea igual o mayor a 8.
46. **9.3:** Arma una consulta para obtener la cantidad de inscripciones realizadas en cada mes (agrupando por el mes de la `fecha_inscripcion`).
