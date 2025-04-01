local fav_acc = { "teej", "pj", "tds" }

-- for variable = start, end do
--    something
-- end
-- # something = length of something
-- # - octathorp = length operator
--
-- ONLY works on a list, and not key-value table
-- because #table will return 0
for index = 1, #fav_acc do
	print(index, fav_acc[index])
end

-- ipairs = index pairs, iterative pairs
-- returns 2 values (3, but let's not concern iterator function)
-- index, and value at that index.
for index, value in ipairs(fav_acc) do
	print(index, value)
end

-- for tables, use pairs()
local reading_scores = { ted = 20, tj = 10 }
for key, value in pairs(fav_acc) do
	print(key, value)
end
