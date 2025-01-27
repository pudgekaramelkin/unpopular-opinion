UPDATE
  "User"
SET
  email = concat(nick, '@gmail.com')
WHERE
  email IS NULL;