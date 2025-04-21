-- @param {Int} $1:minId The minimum id to find
-- @param {Int} $2:maxId The maximum id to find
SELECT id, name
FROM "User"
WHERE id > $1 AND id < $2;
