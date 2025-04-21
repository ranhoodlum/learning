SELECT id, name
FROM "User"
WHERE id = ANY($1)
