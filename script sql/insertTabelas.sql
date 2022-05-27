insert into sistemaonibus.destinos(destinos.des_nome, destinos.des_endereco) values ('Pici', 'Av. Humberto Monte, s/n');
insert into sistemaonibus.destinos(destinos.des_nome, destinos.des_endereco) values ('Porangabussu', 'R. Alexandre Baraúna, 994');
insert into sistemaonibus.destinos(destinos.des_nome, destinos.des_endereco) values ('Benfifca', 'Av. da Universidade');
select * from destinos;

insert into sistemaonibus.linhas(linhas.lin_destino, linhas.lin_valor, linhas.lin_horario, linhas.lin_descricao) values (1, 1.80, '08:00', 'Campus do Pici');
select * from linhas;
delete from linhas where lin_id = 1;

insert into onibus(oni_linha, oni_assentos, oni_data) values (2, '1,2,3,4,5', '2022-05-26');
select * from onibus