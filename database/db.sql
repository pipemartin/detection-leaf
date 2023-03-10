CREATE DATABASE dbleaf;

USE dbleaf;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =1;

//DESCRIBE users;

//------------ Enfermedades Tables
CREATE TABLE leafenfermedades(
    leafId INT(11) NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    imagen VARCHAR(200) NOT NULL, 
    nombreCientifico VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE leafenfermedades
    ADD PRIMARY KEY (leafId);

ALTER TABLE leafenfermedades
    MODIFY leafId INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT =1;
//---------