-- CREATE TABLE funcionario (matricula int NOT NULL PRIMARY KEY,nome varchar(255),senha varchar(255), chave_c varchar(255),email varchar(255), telefone int, contratacao varchar(255),ferias_restantes int);
-- CREATE TABLE atributos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY,matricula_funcionario int, atributo varchar(255),FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula));
-- CREATE TABLE ferias (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, funcionario varchar(255), data_inicial varchar(255), data_final varchar(255), data_solicitacao varchar(255), num_abono int, adiantamento int,status varchar(255));
-- CREATE TABLE abonos (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, funcionario varchar(255), data_inicial varchar(255), data_final varchar(255), data_solicitacao varchar(255));


DROP TABLE banco_bbts.abono;
DROP TABLE banco_bbts.atributos;
DROP TABLE banco_bbts.ferias;
DROP TABLE banco_bbts.funcionario;

CREATE TABLE `funcionario` (
  `matricula` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `chave_c` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ferias_restantes` int(11) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `rg` varchar(255) DEFAULT NULL,
  `cartao_bb` varchar(255) DEFAULT NULL,
  `cartao_capital` varchar(255) DEFAULT NULL,
  `num_contrato` varchar(255) DEFAULT NULL,
  `contratacao` date DEFAULT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `atributos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula_funcionario` int(11) DEFAULT NULL,
  `atributo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `ferias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula_funcionario` int(11) DEFAULT NULL,
  `num_abono` int(11) DEFAULT NULL,
  `adiantamento` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `data_inicial` date DEFAULT NULL,
  `data_final` date DEFAULT NULL,
  `data_solicitacao` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula)
)

CREATE TABLE `abonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula_funcionario` int(11) DEFAULT NULL,
  `data_final` date DEFAULT NULL,
  `data_inicial` date DEFAULT NULL,
  `data_solicitacao` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (matricula_funcionario) REFERENCES funcionario(matricula)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
