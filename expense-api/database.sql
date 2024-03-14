CREATE Table tasks (
    id BIGINT PRIMARY KEY ,title VARCHAR(255), description TEXT,createdAt DATE
);


select * from tasks

select title , id from tasks

select title from tasks

insert into tasks values(5,'Shalaa ugaaa')

insert into tasks values (6,'Toosoo arch')


delete from tasks where id =5

update tasks set title="Aygaa ugaa " where id=6


create table categories (
    id VARCHAR(40) PRIMARY KEY, #
    name VARCHAR(55) #
)

create table transactions (
    id VARCHAR(40) PRIMARY KEY, #
    amount MONEY, #
    date TIMESTAMP, #
    category_id VARCHAR(21), #
    constraint fk_category FOREIGN KEY (category_id) REFERENCES categories (id)
)

insert into categories VALUES ('1', 'Food & Drinks');

insert into categories VALUES ('2', 'Shopping');

insert into categories VALUES ('3', 'Housing');

insert into
    transactions (id, amount, category_id)
values ('10', 10000, '2');

insert into
    transactions (id, amount, category_id)
values ('15', 10000, '2');

insert into
    transactions (id, amount, category_id)
values ('25', 20000, '1');

insert into
    transactions (id, amount, category_id)
values ('45', -15000, '3');

select
    transactions.id,
    amount,
    category_id,
    categories.name category_name
from transactions
    left join categories on transactions.category_id = categories.id;





create table users (
id VARCHAR(40) PRIMARY KEY,
email VARCHAR(50) UNIQUE NOT NULL,
name VARCHAR (50)UNIQUE NOT NULL,
password VARCHAR(100),
avatar_img TEXT,
created_at TIMESTAMP default current_timestamp,
updated_at  TIMESTAMP default current_timestamp,
current_type TEXT default 'MNT'
)