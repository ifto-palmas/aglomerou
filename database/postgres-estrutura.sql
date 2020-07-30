create database aglomerou encoding = utf8;

-- Conectar ao banco pelo psql
\connect aglomerou

-- Habilita o módulo de criptografia para funções como crypt e gen_sault
create extension pgcrypto;

create table usuario (
    id serial not null primary key, 
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP,
    ativo boolean not null default false,
    email varchar(120) not null unique,
    senha varchar(255)
);

comment on table usuario is 'Usuários que podem acessar o dashboard web para administração';

create table dispositivo (
    uid varchar(200) not null primary key,
    tipo varchar(100) not null,
    bloqueado boolean not null default false,
    data_hora_cadastro timestamp default CURRENT_TIMESTAMP
);

comment on table dispositivo is 'Dispositivos móveis usados pelo app (representando as pessoas que o utilizam)';
comment on column dispositivo.bloqueado is 'Se marcado como true ira recusar as requisições de tal dispositivo';

-- Os campos latitude e longitude são representados em Graus Decimais,
-- mas não sei se a quantidade de casas é exata.
-- Por isso, defini como varchar, pelo menos por enquanto.
-- https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en
-- https://en.wikipedia.org/wiki/Geographic_coordinate_conversion#Change_of_units_and_format

create table localizacao_dispositivo (
    id bigserial not null primary key, 
    uid varchar(200) not null, 
    latitude numeric(10,7) not null, 
    longitude numeric(10,7) not null,
    data_hora_ultima_atualizacao timestamp default CURRENT_TIMESTAMP,

    constraint fk_localizacao_dispositivo foreign key (uid) references dispositivo(uid) on delete cascade
);

comment on column localizacao_dispositivo.latitude is 'Latitude em Graus Decimais';
comment on column localizacao_dispositivo.longitude is 'Longitude em Graus Decimais';

create table notificacao (
    id serial not null primary key,
    data_hora_cadastro timestamp default current_timestamp not null,
    uid varchar(200) not null, 
    latitude numeric(10,7) not null,
    longitude numeric(10,7) not null,
    estimativa_total_pessoas int not null,
    observacoes varchar(250),

    constraint fk_notificacao_dispositivo foreign key (uid) references dispositivo(uid) on delete cascade
);

create view vwUltimosDispositivosAtivos as 
select uid, max(id) as id_localizacao from localizacao_dispositivo l 
where extract(epoch from (current_timestamp - data_hora_ultima_atualizacao)) <= 300 
group by uid;

comment on view vwUltimosDispositivosAtivos is 'Obtém os dispositivos que estiveram ativos nos últimos 5 minutos';

create view vwUltimaLocalizacaoTodos as 
select latitude, longitude
from localizacao_dispositivo l
inner join vwUltimosDispositivosAtivos v on l.uid = v.uid and l.id = v.id_localizacao;

comment on view vwUltimaLocalizacaoTodos is 'Obtém a localização dos dispositivos que estiveram ativos nos últimos 5 minutos';

insert into usuario (data_hora_cadastro, email, senha)
values ('2020-05-01', 'usuario1@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-02', 'usuario2@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-03', 'usuario3@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-04', 'usuario4@gmail.com', crypt('123456', gen_salt('bf'))),
       ('2020-05-05', 'usuario5@gmail.com', crypt('123456', gen_salt('bf')));

insert into dispositivo (data_hora_cadastro, tipo, uid)
values ('2020-05-01', 'android', '1'),
       ('2020-05-02', 'android', '2'),
       ('2020-05-03', 'iOS', '3'),
       ('2020-05-04', 'iOS', '4');

insert into localizacao_dispositivo (uid, latitude, longitude)
values (1, 90, 180),
       (1, -90, 180),
       (1, 90, -180),
       (1, -90, -180),
       (2, 91, 170),
       (2, -91, 170),
       (2, 91, -170),
       (2, -91, -170),
       (3, 70, 170),
       (3, -70, 170),
       (3, 70, -170),
       (3, -70, -170),
       (4, 45, 120),
       (4, -45, 120),
       (4, 45, -120),
       (4, -45, -120);
