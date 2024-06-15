CREATE DATABASE IF NOT EXISTS banco;
USE banco;

CREATE TABLE IF NOT EXISTS conta (
    conta_id INT AUTO_INCREMENT PRIMARY KEY,
    saldo INT NOT NULL
);

CREATE TABLE IF NOT EXISTS transacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conta_id INT NOT NULL,
    forma_pagamento ENUM('P', 'C', 'D') NOT NULL,
    valor INT NOT NULL,
    FOREIGN KEY (conta_id) 
    REFERENCES conta(conta_id)
);

-- docker exec -i database mariadb -u root -pr00t banco < dump.sql