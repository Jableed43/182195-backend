USE escuela;

-- =====================================================================
--  BLOQUE G — Consultas de Selección (SELECT y WHERE)
-- =====================================================================

-- G1. Mostrar todos los datos de todos los docentes.
-- (Resultado esperado: 10 filas)
-- Escribe tu consulta aquí:
SELECT * FROM escuela.docente;

-- G2. Mostrar únicamente el nombre y el email de todos los estudiantes.
-- (Resultado esperado: 30 filas, 2 columnas)
-- Escribe tu consulta aquí:
SELECT nombre, email FROM escuela.estudiante;

-- G3. Mostrar todas las materias dictadas por el docente cuyo ID es 3.
-- (Resultado esperado: 7 filas)
-- Escribe tu consulta aquí:
SELECT * FROM materia WHERE docente_id = 3;

-- G4. Mostrar todos los datos de los estudiantes cuyo apellido sea 'Lopez'.
-- (Resultado esperado: 2 filas)
-- Escribe tu consulta aquí:
SELECT * FROM escuela.estudiante WHERE apellido = "Lopez"

-- G5. Mostrar las inscripciones que aún no tienen una nota asignada (la nota es nula).
-- (Resultado esperado: 5 filas)
-- Escribe tu consulta aquí:
SELECT * FROM escuela.inscripcion WHERE nota IS NULL

-- G6. Mostrar todas las inscripciones donde la nota haya sido mayor a 9.
-- (Resultado esperado: 5 filas)
-- Escribe tu consulta aquí:
SELECT * FROM escuela.inscripcion WHERE nota  > 9;

-- G7. Mostrar los datos de la materia cuyo código exacto sea 'BD1'.
-- (Resultado esperado: 1 fila)
-- Escribe tu consulta aquí:
SELECT * FROM escuela.materia where codigo  = 'BD1'

-- G8. Mostrar los docentes cuya especialidad sea 'Algoritmos'.
-- (Resultado esperado: 1 fila)
-- Escribe tu consulta aquí:


-- G9. Contar la cantidad total de inscripciones registradas en el sistema.
-- (Resultado esperado: 56)
-- Escribe tu consulta aquí:
SELECT COUNT(*) FROM escuela.inscripcion;

-- G10. Mostrar todas las inscripciones que pertenecen al estudiante con ID 5.
-- (Resultado esperado: 5 filas)
-- Escribe tu consulta aquí:


-- G11. Contar cuántas inscripciones en total tiene la materia con ID 1.
-- (Resultado esperado: 11)
-- Escribe tu consulta aquí:


-- G12. Mostrar los estudiantes que hayan nacido antes del 1 de enero del año 2000.
-- (Resultado esperado: 10 filas)
-- Escribe tu consulta aquí:


