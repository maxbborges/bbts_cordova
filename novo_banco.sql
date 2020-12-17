-- Novo banco

-- banco_bbts.funcionario definition

CREATE TABLE `funcionario` (
  `matricula` int(11) NOT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- banco_bbts.administrativo definition

CREATE TABLE `administrativo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula_funcionario` int(11) DEFAULT NULL,
  `data_cadastro` TIMESTAMP DEFAULT NULL,
  `data_alteracao` TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matricula_funcionario` (`matricula_funcionario`),
  CONSTRAINT `administrativo_ibfk_1` FOREIGN KEY (`matricula_funcionario`) REFERENCES `funcionario` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- banco_bbts.dados_funcionario definition

CREATE TABLE `dados_funcionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricula_funcionario` int(11) DEFAULT NULL,
  `data_cadastro` TIMESTAMP DEFAULT NULL,
  `data_alteracao` TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `matricula_funcionario` (`matricula_funcionario`),
  CONSTRAINT `dados_funcionario_ibfk_1` FOREIGN KEY (`matricula_funcionario`) REFERENCES `funcionario` (`matricula`),
  UNIQUE (`matricula_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.dados_pessoais definition

CREATE TABLE `dados_pessoais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_funcionario` int(11) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `rg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `dados_pessoais_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `dados_funcionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.faltas_folgas definition

CREATE TABLE `faltas_folgas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_administrativo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_administrativo` (`id_administrativo`),
  CONSTRAINT `faltas_folgas_ibfk_1` FOREIGN KEY (`id_administrativo`) REFERENCES `administrativo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.ferias definition

CREATE TABLE `ferias_abonos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_faltas_folgas` int(11) DEFAULT NULL,
  `numero_abonos` int(2) DEFAULT NULL,
  `adiantamento` varchar(255) DEFAULT NULL,
  `data_inicio` TIMESTAMP DEFAULT NULL,
  `data_fim` TIMESTAMP DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_faltas_folgas` (`id_faltas_folgas`),
  CONSTRAINT `ferias_ibfk_1` FOREIGN KEY (`id_faltas_folgas`) REFERENCES `faltas_folgas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.outros definition

CREATE TABLE `outros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_faltas_folgas` int(11) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `data_inicio` TIMESTAMP DEFAULT NULL,
  `data_fim` TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_faltas_folgas` (`id_faltas_folgas`),
  CONSTRAINT `outros_ibfk_1` FOREIGN KEY (`id_faltas_folgas`) REFERENCES `faltas_folgas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.ponto definition

CREATE TABLE `ponto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_administrativo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_administrativo` (`id_administrativo`),
  CONSTRAINT `ponto_ibfk_1` FOREIGN KEY (`id_administrativo`) REFERENCES `administrativo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.seguranca definition

CREATE TABLE `seguranca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_administrativo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_administrativo` (`id_administrativo`),
  CONSTRAINT `seguranca_ibfk_1` FOREIGN KEY (`id_administrativo`) REFERENCES `administrativo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.senhas definition

CREATE TABLE `senhas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_seguranca` int(11) DEFAULT NULL,
  `senhas` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguranca` (`id_seguranca`),
  CONSTRAINT `senhas_ibfk_1` FOREIGN KEY (`id_seguranca`) REFERENCES `seguranca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- banco_bbts.calcula_horas definition

CREATE TABLE `calcula_horas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_ponto` int(11) DEFAULT NULL,
  `adicional_noturno` int(11) DEFAULT NULL,
  `hora_extra` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ponto` (`id_ponto`),
  CONSTRAINT `calcula_horas_ibfk_1` FOREIGN KEY (`id_ponto`) REFERENCES `ponto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.conta_folgas definition

CREATE TABLE `conta_folgas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_ponto` int(11) DEFAULT NULL,
  `ferias_restantes` int(11) DEFAULT NULL,
  `abonos_restantes` int(11) DEFAULT NULL,
  `qtd_outros` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ponto` (`id_ponto`),
  CONSTRAINT `conta_folgas_ibfk_1` FOREIGN KEY (`id_ponto`) REFERENCES `ponto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.contatos_pessoais definition

CREATE TABLE `contatos_pessoais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pessoais` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pessoais` (`id`),
  KEY `contatos_pessoais_ibfk_1` (`id_pessoais`),
  CONSTRAINT `contatos_pessoais_ibfk_1` FOREIGN KEY (`id_pessoais`) REFERENCES `dados_pessoais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.dados_corporativos definition

CREATE TABLE `dados_corporativos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_funcionario` int(11) DEFAULT NULL,
  `chave_c` varchar(255) DEFAULT NULL,
  `cartao_bb` varchar(255) DEFAULT NULL,
  `cartao_capital` varchar(255) DEFAULT NULL,
  `cartao_bbts` varchar(255) DEFAULT NULL,
  `num_contrato` varchar(255) DEFAULT NULL,
  `data_contratacao` TIMESTAMP DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `dados_corporativos_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `dados_funcionario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.email_pessoal definition

CREATE TABLE `email_pessoal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pessoal` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pessoal` (`id_pessoal`),
  CONSTRAINT `email_pessoal_ibfk_1` FOREIGN KEY (`id_pessoal`) REFERENCES `contatos_pessoais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.roles definition

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_seguranca` int(11) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seguranca` (`id_seguranca`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`id_seguranca`) REFERENCES `seguranca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.telefone_pessoal definition

CREATE TABLE `telefone_pessoal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_telefone_pessoal` int(11) DEFAULT NULL,
  `telefone` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_telefone_pessoal` (`id_telefone_pessoal`),
  CONSTRAINT `telefone_pessoal_ibfk_1` FOREIGN KEY (`id_telefone_pessoal`) REFERENCES `contatos_pessoais` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.contatos_corporativos definition

CREATE TABLE `contatos_corporativos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_corporativos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_corporativos` (`id_corporativos`),
  CONSTRAINT `contatos_corporativos_ibfk_1` FOREIGN KEY (`id_corporativos`) REFERENCES `dados_corporativos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.email_corporativo definition

CREATE TABLE `email_corporativo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_corporativos` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_corporativos` (`id_corporativos`),
  CONSTRAINT `email_corporativo_ibfk_1` FOREIGN KEY (`id_corporativos`) REFERENCES `contatos_corporativos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


-- banco_bbts.telefone_corporativo definition

CREATE TABLE `telefone_corporativo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_telefone_corporativo` int(11) DEFAULT NULL,
  `telefone` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_telefone_corporativo` (`id_telefone_corporativo`),
  CONSTRAINT `telefone_corporativo_ibfk_1` FOREIGN KEY (`id_telefone_corporativo`) REFERENCES `contatos_corporativos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;






START TRANSACTION;
-- 	INSERT INTO funcionario (matricula) VALUES (112243);
	INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (112243,'2020-01-01','2020-01-01');
	INSERT INTO faltas_folgas (id_administrativo) VALUES (LAST_INSERT_ID());
	INSERT INTO ferias (id_falta_folgas,numero_abonos ,adiantamento ,status ) VALUES (LAST_INSERT_ID(),0,'false','pendente');
COMMIT;


SELECT a.id,f.status,a.data_cadastro FROM ferias f, faltas_folgas ff , administrativo a WHERE f.id_falta_folgas = ff.id and ff.id_administrativo = a.id and a.matricula_funcionario = 112243;
-- select * from ferias;
-- select * from faltas_folgas ff ;
-- select * from funcionario;
-- select * from administrativo a2 ;


SELECT * FROM ferias f 

ROLLBACK;



SELECT * from funcionario f ;
SELECT * from administrativo a ;
select * from cadastro c ;
select * from faltas_folgas ff;
-- 
DELETE from funcionario where matricula=112243;
DELETE from cadastro where id=16;
DELETE from administrativo where id=16;

SELECT a.id,f.status,a.data_cadastro FROM ferias f, faltas_folgas ff , administrativo a WHERE f.id_falta_folgas = ff.id and ff.id_administrativo = a.id and a.matricula_funcionario = 112243;


