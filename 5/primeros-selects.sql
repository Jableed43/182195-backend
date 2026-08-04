-- =====================================================================
--  CLASE 1 — Primer contacto con SQL
--
--  ⚠️ Todavía NO estamos aprendiendo a escribir consultas: eso es la
--     clase 2. Acá las consultas YA ESTÁN ESCRITAS.
--
--  Tu trabajo es: EJECUTAR cada una, MIRAR el resultado y RESPONDER
--  la pregunta que está debajo, escribiendo en el comentario.
--
--  Cómo ejecutar UNA SOLA consulta:
--     poné el cursor sobre ella y apretá Ctrl+Enter
--     (Ctrl+Shift+Enter ejecuta TODO el archivo de una)
-- =====================================================================


-- ---------------------------------------------------------------------
--  Paso 0 — Pararnos en la base correcta
-- ---------------------------------------------------------------------
--  Si te olvidás de esto, MySQL te va a decir "No database selected".

USE escuela;


-- ---------------------------------------------------------------------
--  1. Ver una tabla entera
-- ---------------------------------------------------------------------
--  El * significa "todas las columnas".

SELECT * FROM estudiante;

--  ❓ ¿Cuántos REGISTROS (filas) devolvió?
--     RESPUESTA:
--
--  ❓ ¿Cuántos CAMPOS (columnas) tiene la tabla?
--     RESPUESTA:
--
--  ❓ ¿Cuál de esos campos te parece que es la PRIMARY KEY? ¿Por qué?
--     RESPUESTA:


-- ---------------------------------------------------------------------
--  2. Pedir solo algunas columnas
-- ---------------------------------------------------------------------

SELECT nombre, apellido, email FROM estudiante;

--  ❓ ¿Cambió la cantidad de FILAS respecto de la consulta anterior?
--     RESPUESTA:
--
--  ❓ ¿Y la cantidad de COLUMNAS?
--     RESPUESTA:
--
--  💡 Conclusión: elegir columnas NO filtra filas. Son dos cosas distintas.


-- ---------------------------------------------------------------------
--  3. Las otras tablas de la base
-- ---------------------------------------------------------------------

SELECT * FROM docente;

--  ❓ ¿Cuántos docentes hay?
--     RESPUESTA:


SELECT * FROM materia;

--  ❓ Mirá la columna `docente_id`. ¿Qué te parece que significa ese número?
--     RESPUESTA:
--
--  ❓ ¿Cómo se llama ese tipo de campo, el que guarda el id de otra tabla?
--     RESPUESTA:


-- ---------------------------------------------------------------------
--  4. La tabla que conecta  ⭐ (la más interesante)
-- ---------------------------------------------------------------------

SELECT * FROM inscripcion;

--  ❓ Esta tabla tiene DOS campos que apuntan a otras tablas. ¿Cuáles son
--     y a qué tabla apunta cada uno?
--     RESPUESTA:
--
--  ❓ Leé la PRIMERA FILA en voz alta, traducida al castellano.
--     Empezá con "el estudiante número..."
--     RESPUESTA:
--
--  ❓ Mirá la columna `nota`. Hay celdas que dicen NULL.
--     ¿Qué te parece que significa? ¿Es lo mismo que un 0?
--     RESPUESTA:


-- ---------------------------------------------------------------------
--  5. Filtrar filas  (probadita de la clase 2)
-- ---------------------------------------------------------------------
--  WHERE es la condición: solo devuelve las filas que la cumplen.

SELECT * FROM estudiante WHERE apellido = 'Lopez';

--  ❓ ¿Cuántas filas devolvió?
--     RESPUESTA:


SELECT * FROM materia WHERE docente_id = 2;

--  ❓ ¿Qué le estamos preguntando a la base, dicho en castellano?
--     RESPUESTA:


-- ---------------------------------------------------------------------
--  6. Contar sin mirar  (probadita de la clase 3)
-- ---------------------------------------------------------------------

SELECT COUNT(*) FROM inscripcion;

--  ❓ ¿Coincide con lo que habías contado a ojo en el punto 4?
--     RESPUESTA:


-- =====================================================================
--  🎯 PARA CERRAR — respondé con tus palabras
--
--  1. ¿Qué diferencia hay entre elegir COLUMNAS y filtrar FILAS?
--     RESPUESTA:
--
--
--  2. ¿Por qué `inscripcion` necesita existir como tabla aparte, en vez
--     de guardar las materias adentro de la tabla `estudiante`?
--     (No hay una respuesta "correcta" todavía: es la clase 3.
--      Escribí lo que se te ocurra.)
--     RESPUESTA:
--
--
-- =====================================================================
