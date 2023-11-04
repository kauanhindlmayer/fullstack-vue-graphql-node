create schema namegator;

create table namegator.item (
    id serial primary key,
    type text not null,
    description text not null
);

insert into namegator.item (type, description) values ('prefixe', 'Air');
insert into namegator.item (type, description) values ('prefixe', 'Jet');
insert into namegator.item (type, description) values ('prefixe', 'Flight');
insert into namegator.item (type, description) values ('sufixe', 'Hub');
insert into namegator.item (type, description) values ('sufixe', 'Station');
insert into namegator.item (type, description) values ('sufixe', 'Mart');