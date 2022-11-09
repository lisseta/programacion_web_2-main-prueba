SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS hoteles;
CREATE DATABASE IF NOT EXISTS hoteles DEFAULT CHARACTER SET UTF8MB4;
USE hoteles;

--Creamos tabla gerentes ya que es una tabla principal
CREATE TABLE gerentes(
id_grt                        INTEGER  AUTO_INCREMENT,
nombre                        VARCHAR(40) NOT NULL,
ap_paterno                    VARCHAR(20) NOT NULL,
ap_materno                    VARCHAR(20) NOT NULL,
telefono                      VARCHAR(10) NOT NULL,
PRIMARY KEY(id_grt)
);

--Para relaciones 1:1 la llave foranea va en una sola tabla de cualquiera de las dos entidades
--Creamos tabla hoteles
CREATE TABLE hoteles(
id_htl                          INTEGER NOT  NULL AUTO_INCREMENT,
nombre                          VARCHAR(40)  NOT NULL,
direccion                       VARCHAR(100) NOT NULL,
telefono                        VARCHAR(30)  NOT NULL,
correo                          VARCHAR(300) NOT NULL,
id_grt                          INTEGER,
PRIMARY KEY(id_htl),
FOREIGN KEY(id_grt) REFERENCES gerentes(id_grt) ON DELETE SET NULL 
);

--Valor nulo en el campo Gerentes -- Hotel sin gerente.

--Creamos tabla habitaciones
CREATE TABLE habitaciones(
id_hbt                          INTEGER NOT NULL AUTO_INCREMENT,
piso                            VARCHAR(10) NOT NULL,
nombre                          VARCHAR(30) NOT NULL,
refrigerador                    BOOLEAN DEFAULT 0    NOT NULL,
id_htl                          INTEGER,
PRIMARY KEY(id_hbt),
FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl) ON DELETE CASCADE
);

