insert into credentials(user_id, hash)
values (${user_id}, ${hash})
returning *;