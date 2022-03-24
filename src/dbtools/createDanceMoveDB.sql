drop database if exists dancemovedb;
create database dancemovedb;
use dancemovedb;

create table moves(
    id integer not null primary key auto_increment,
    movename varchar(30) not null,
    creator varchar(30) default '',
    hox varchar(200) default '',
    link varchar(100) default ''
);

drop user if exists 'test_user'@'localhost';
create user 'test_user'@'localhost' identified by 'secret';
grant all privileges on dancemovedb.* to 'test_user'@'localhost';