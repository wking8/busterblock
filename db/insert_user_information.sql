INSERT INTO user_information(username, email)
VALUES(${username}, ${email})
RETURNING *;