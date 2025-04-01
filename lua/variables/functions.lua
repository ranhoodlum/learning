-- functions = first class, so variables
-- scope is not denoted by brackets, but words

-- no brackets, just keywords function and end
local function hello(name)
	print("Hello!", name)
end

-- define a new function and assign it to greet
-- just like a first class citizen,
-- the function itself doesn't have a name, but the value
-- it was passed to, does
local greet = function(name)
	-- .. is string concatenation
	print("Greetings, " .. name .. "!")
end

-- higher order function
-- possible because of first class nature and closure
-- of functions
local higher_order = function(value)
	return function(another)
		return value + another
	end
end

local add_one = higher_order(1)

print("add_one(2) -> ", add_one(2)) -- outputs 3
