drop database if exists dancemovedb;
create database dancemovedb;
use dancemovedb;

create table moves(
    id integer not null primary key,
    movename varchar(30) not null,
    creator varchar(20) not null,
    hox varchar(15),
    link varchar(30)
);

insert into moves values(1,'Awesome Juice','Maria','','');
insert into moves values(2,'Crazy Turn','xxx','',"www.strange.com");
insert into moves values(3,'Vera Smith Move','xxx','try this','');


drop user if exists 'test_user'@'localhost';
create user 'test_user'@'localhost' identified by 'secret';
grant all privileges on dancemovedb.* to 'test_user'@'localhost';