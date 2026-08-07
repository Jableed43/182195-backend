CREATE DATABASE IF NOT EXISTS veterinaria
	CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;
#case insensitive

USE veterinaria;

# Dueño deberia tener: nombre, apellido, email, telefono
CREATE TABLE duenio (idduenio INT);

# Editar ->
ALTER TABLE duenio
    MODIFY idduenio INT PRIMARY KEY AUTO_INCREMENT;

    
##    CREATE TABLE duenio (
##    idduenio INT          PRIMARY KEY AUTO_INCREMENT,
##    nombre   VARCHAR(50)  NOT NULL,
##    apellido VARCHAR(50)  NOT NULL,
##    email    VARCHAR(100) NOT NULL UNIQUE,
##    telefono VARCHAR(20)
## );

## Las tablas relacionales son bastante rigidas
## Creaste la tabla -> guardaste datos
## si los datos viejos no son compatibles con la tabla nueva te va a dar error

CREATE TABLE mascota (
	idmascota INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    ## Especie deberia ser parte de otra tabla
    ## Repeticion -> redundancia
    especie VARCHAR(30) NOT NULL,
    fecha_nacimiento DATE NOT NULL, 
    raza VARCHAR(30)
);
ALTER TABLE mascota ADD COLUMN raza VARCHAR(30);

ALTER TABLE duenio DROP COLUMN telefono;
ALTER TABLE mascota 
	MODIFY especie ENUM('perro', 'gato', 'conejo', 'ave', 'reptil', 'otro') NOT NULL,
    ADD COLUMN peso DECIMAL(5,2);
    
INSERT INTO duenio (nombre, apellido, email, telefono)
VALUES ("Mario", "Gomez", "mario.gomez@mail.com", "0342-5551234"),
		("Marcela", "Diaz", "marcela.diaz@mail.com", "11-123456");

INSERT INTO mascota (nombre, apellido, especie, fecha_nacimiento, raza, peso)
VALUES  ('ponpon', "arcella", "conejo", "2025-08-01", "conejo blanco", 1.5),
        ('roger', "diaz", "conejo", "2024-08-01", "conejo negro", 2.3),
        ('stuart', 'gonzalez', 'perro', "2018-08-02", "manto negro", 10);