select *
from user_information u
join credentials c on c.user_id = u.user_id
where email = $1;