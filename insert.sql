-- INSERIR FUNCIONARIO:
INSERT INTO funcionario (matricula) VALUES (112243);

-- INSERIR FERIAS/ABONOS
INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (112243,'2020-01-01','2020-01-01');
INSERT INTO faltas_folgas (id_administrativo) VALUES (LAST_INSERT_ID());
INSERT INTO ferias_abonos (id_faltas_folgas,numero_abonos ,data_inicio, data_fim, adiantamento ,status,tipo ) VALUES (LAST_INSERT_ID(),0,'2020-09-01','2020-10-01','false','pendente','ferias');

SELECT f.id,f.status,a.data_cadastro,f.data_inicio, f.data_fim, f.tipo  FROM ferias_abonos f, faltas_folgas ff , administrativo a WHERE f.id_faltas_folgas = ff.id and ff.id_administrativo = a.id and a.matricula_funcionario = 112243;

-- INSERIR SENHAS
INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (112243,'2020-01-01','2020-01-01');
INSERT INTO seguranca  (id_administrativo ) VALUES (LAST_INSERT_ID());
INSERT INTO senhas (id_seguranca,senhas) VALUES (LAST_INSERT_ID(),md5("12345"));

select * from senhas s, administrativo a, seguranca s2 where a.matricula_funcionario =112243 and s2.id_administrativo = a.id and s.id_seguranca = s2.id and s.senhas=md5('12345');

-- INSERIR REGRAS
INSERT INTO administrativo (matricula_funcionario ,data_cadastro ,data_alteracao ) VALUES (112243,'2020-01-01','2020-01-01');
INSERT INTO seguranca  (id_administrativo ) VALUES (LAST_INSERT_ID());
INSERT INTO roles (id_seguranca, role) VALUES (LAST_INSERT_ID(),'Tecnico');
INSERT INTO roles (id_seguranca, role) VALUES (LAST_INSERT_ID(),'Administrativo');
INSERT INTO roles (id_seguranca, role) VALUES (LAST_INSERT_ID(),'Gerente');

select role from roles r2 , administrativo a, seguranca s2 where a.matricula_funcionario =112243 and s2.id_administrativo = a.id and r2.id_seguranca = s2.id;
select 'senhas', a.matricula_funcionario as dados from senhas s, administrativo a, seguranca s2 where a.matricula_funcionario =112243 and s2.id_administrativo = a.id and s.id_seguranca = s2.id and s.senhas=md5('12345') UNION ALL select 'regras', count(role) from roles r2 , administrativo a, seguranca s2 where a.matricula_funcionario =112243 and s2.id_administrativo = a.id and r2.id_seguranca = s2.id UNION SELECT "funcionario", nome FROM dados_pessoais dp , dados_funcionario df where df.matricula_funcionario = 112243 and dp.id_funcionario = df.id;

-- INSERIR DADOS PESSOAIS
INSERT INTO dados_funcionario (matricula_funcionario , data_cadastro ,data_alteracao ) values (112243,'2020-01-01','2020-01-01');
INSERT INTO dados_pessoais (id_funcionario, nome , cpf,rg ) values (LAST_INSERT_ID(),'maxwell','03340717125','2864054');

SELECT nome FROM dados_pessoais dp , dados_funcionario df where df.matricula_funcionario = 112243 and dp.id_funcionario = df.id ;


-- SELECT FERIAS
SELECT f.id,f.status,f.numero_abonos,f.adiantamento,a.data_cadastro,f.data_inicio, f.data_fim, f.tipo, a.matricula_funcionario, (SELECT nome FROM dados_pessoais dp , dados_funcionario df where df.matricula_funcionario = 112243 and dp.id_funcionario = df.id) as nome  FROM ferias_abonos f, faltas_folgas ff , administrativo a WHERE f.id_faltas_folgas = ff.id and ff.id_administrativo = a.id and a.matricula_funcionario = 112243 ORDER BY f.data_inicio;
