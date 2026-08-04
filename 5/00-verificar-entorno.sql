-- =====================================================================
--  ETAPA 2 — Verificar que el entorno quedó bien
--
--  Ejecutar TODO este script en MySQL Workbench (⚡ o Ctrl+Shift+Enter).
--  Si las 5 consultas devuelven resultado sin errores, estás listo
--  para la Etapa 3.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. ¿El servidor responde?
-- ---------------------------------------------------------------------
--  Si esto devuelve un número de versión, la conexión funciona.
--  Puede decir "MariaDB": está bien, XAMPP trae MariaDB y es compatible.

SELECT VERSION() AS version_del_servidor;


-- ---------------------------------------------------------------------
-- 2. ¿Con qué usuario estoy conectado?
-- ---------------------------------------------------------------------
--  Debería decir root@localhost.

SELECT CURRENT_USER() AS usuario_conectado;


-- ---------------------------------------------------------------------
-- 3. ¿Qué bases de datos hay?
-- ---------------------------------------------------------------------
--  Van a aparecer varias que ya vienen con la instalación
--  (information_schema, mysql, performance_schema, phpmyadmin...).
--  Son del sistema: NO se tocan.

SHOW DATABASES;


-- ---------------------------------------------------------------------
-- 4. ¿Puedo crear y borrar cosas?
-- ---------------------------------------------------------------------
--  Esta es la prueba real: que el usuario tenga permisos de escritura.

CREATE DATABASE IF NOT EXISTS prueba_entorno;

USE prueba_entorno;

CREATE TABLE IF NOT EXISTS prueba (
    id     INT PRIMARY KEY AUTO_INCREMENT,
    listo  VARCHAR(50)
);

INSERT INTO prueba (listo) VALUES ('El entorno funciona');

SELECT * FROM prueba;


-- ---------------------------------------------------------------------
-- 5. Limpieza
-- ---------------------------------------------------------------------
--  Borramos la base de prueba: no la necesitamos más.

DROP DATABASE prueba_entorno;


-- =====================================================================
--  Si llegaste hasta acá sin errores rojos en el panel de abajo,
--  el entorno está listo. ✅
--
--  🐞 Si el paso 4 falla con "Access denied", el usuario no tiene
--     permisos para crear bases. Revisá que estés conectado como root.
--
--  🐞 Si nada corre y el error es "Can't connect to MySQL server",
--     el servidor está apagado: abrí el XAMPP Control Panel y dale
--     Start a la fila MySQL.
-- =====================================================================
