SET NAMES 'UTF8MB4';
DROP DATABASE IF EXISTS hoteles;
CREATE DATABASE IF NOT EXISTS hoteles DEFAULT CHARACTER SET UTF8MB4;
USE hoteles;

--Creamos tabla gerentes ya que es una tabla principal
CREATE TABLE gerentes(
id_grt                        INTEGER NOT NULL AUTO_INCREMENT,
nombre                        VARCHAR(40) NOT NULL,
ap_paterno                    VARCHAR(20) NOT NULL,
ap_materno                    VARCHAR(20) NOT NULL,
telefono                      VARCHAR(10) NOT NULL,
img_ruta                      VARCHAR(50) NOT NULL,
PRIMARY KEY(id_grt)
);

CREATE TABLE catalogo_habitaciones(
id_catalogo_hbt             INTEGER NOT NULL AUTO_INCREMENT,
nombre                      VARCHAR(30) NOT NULL,
PRIMARY KEY(id_catalogo_hbt)
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
FOREIGN KEY(id_grt) REFERENCES gerentes(id_grt) ON DELETE CASCADE
);

--Creamos tabla habitaciones
CREATE TABLE habitaciones(
id_catalogo_hbt                 INTEGER NOT NULL,
id_htl                          INTEGER NOT NULL,
nombre                          VARCHAR(30) NOT NULL,
precio                          DECIMAL(7,2) NOT NULL,
FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl) ON DELETE CASCADE,
FOREIGN KEY(id_catalogo_hbt) REFERENCES catalogo_habitaciones(id_catalogo_hbt),
PRIMARY KEY(id_htl, id_catalogo_hbt)
);

--Creamos tabla de imagenes de hoteles
CREATE TABLE hoteles_img(
id_htl_img                      INTEGER NOT NULL,
id_htl                          INTEGER,
ruta_img                        VARCHAR(50),
PRIMARY KEY(id_htl_img),
FOREIGN KEY(id_htl) REFERENCES hoteles(id_htl) ON DELETE CASCADE
);

--Creamos tabla de imagenes de habitaciones
CREATE TABLE habitaciones_img(
id_hbt_img                      INTEGER NOT NULL,
id_catalogo_hbt                 INTEGER,
id_htl                          INTEGER,
ruta                            VARCHAR(50),
PRIMARY KEY(id_hbt_img),
FOREIGN KEY(id_catalogo_hbt) REFERENCES habitaciones(id_catalogo_hbt),
FOREIGN KEY(id_htl) REFERENCES habitaciones(id_htl)
);

