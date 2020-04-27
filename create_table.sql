CREATE TABLE funcionario (matricula int NOT NULL PRIMARY KEY,nome varchar(255),senha varchar(255), chave_c varchar(255),email varchar(255), telefone int, contratacao varchar(255),ferias_restantes int);
CREATE TABLE atributos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY,matricula_funcionario int, atributo varchar(255),FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula));
CREATE TABLE ferias (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, funcionario varchar(255), data_inicial varchar(255), data_final varchar(255), data_solicitacao varchar(255), num_abono int, adiantamento int,status varchar(255));
CREATE TABLE abonos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, funcionario varchar(255), data_inicial varchar(255), data_final varchar(255), data_solicitacao varchar(255));
