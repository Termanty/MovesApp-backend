drop database if exists dancemovedb;
create database dancemovedb;
use dancemovedb;

create table moves(
    id integer not null primary key,
    movename varchar(30) not null,
    creator varchar(30),
    hox varchar(200),
    link varchar(100)
);

drop user if exists 'dancer'@'localhost';
create user 'dancer'@'localhost' identified by 'D0llyL1inkUp';
grant all privileges on dancemovedb.* to 'dancer'@'localhost';