create table user_information(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE credentials(
    user_id INT,
    hash TEXT
);

create table myaccount(user_id, profile_pic)
values(${user_id, ${profile_pic}});

create table rentals(
api_id integer references user_information(user_id)
);