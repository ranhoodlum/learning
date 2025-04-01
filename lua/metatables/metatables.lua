-- meta tables are
-- tables that describe or change the behaviour of tables

local vector_mt = {}
-- __add is a metamethod
-- metamethods are methods that you can define
-- on metatables that describe what lua should do
-- when trying to do certain
-- things like add, subtract, etc. on tables
-- operations, that normally aren't be allowed by lua
vector_mt.__add = function(left, right)
	-- setmetatable returns the passed table
	-- so, after adding, we're again setting the
	-- metatable for that table to be this table
	return setmetatable({
		left[1] + right[1],
		left[2] + right[2],
		left[3] + right[3],
	}, vector_mt)
end

-- set the table's metatable, (or <metatable> field)
-- as the given 2nd argument, and return the table
local v1 = setmetatable({ 3, 1, 2 }, vector_mt)
local v2 = setmetatable({ 4, 8, 1 }, vector_mt)
local v3 = v1 + v2
vim.print(v3[1], v3[2], v3[3])
vim.print(v3 + v3)
-- call :so on vim to see results, and the metatable

local fib_mt = {
	-- __index is called when you try to get value that doesn't exist
	-- from a table with the key as the argument
	__index = function(self, key)
		if key < 2 then
			return 1
		end
		-- self[key] is like doing fib[key] on the below table
		-- that will be created
		--
		-- again, if the table fib doesn't have key, __index(key)
		-- is called
		self[key] = self[key - 2] + self[key - 1]
		return self[key]
	end,
}

local fib = setmetatable({}, fib_mt)

vim.print(fib[2])

-- __newindex(self, key, value
-- __call(self, ...) - let's you call table as a function
-- are the other meta methods
