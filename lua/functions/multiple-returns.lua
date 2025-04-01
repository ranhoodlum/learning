local returns_four_values = function()
	return 1, 2, 3, 4
end

local first, second, last = returns_four_values()

print("first: ", first)
print("second: ", second)
print("last: ", last)
-- fourth value (4) is discarded

-- take variable no. of arguments (...)
local variable_arguments = function(...)
	-- unpack those arguments
	local arguments = { ... }
	for i, j in ipairs({ ... }) do
		print(i, j)
	end
	return table.unpack(arguments)
end

-- returns
-- 1. hello
-- 2. world
-- 3. !
-- 1: hello world !
print("1: ", variable_arguments("hello", "world", "!"))

-- returns
-- 1. hello
-- 2. world
-- 3. !
-- 1: hello <lost> because there's no space left for other
-- args (we have 1 slot), we discard them
print("2: ", variable_arguments("hello", "world", "!"), "<lost>")
