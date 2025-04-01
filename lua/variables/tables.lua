-- Lua's *ONLY* way to store data - only data structure
-- Same structure is used for maps and lists

-- As a list (1 indexed)
-- Yes! heterogenious
local list = {
	"first",
	2,
	false,
	function()
		print("Fourth")
	end,
}

print("Yup! 1-indexed:", list[1]) -- prints "first"
print("Fourth is 4 ... : ", list[4]())

local t = {
	literal_key = "a string",
	["an expression"] = "also works",
	[function() end] = true, -- that's a expression as well
}

print("Literal key   :", t.literal_key)
print("Literal key   :", t["an expression"])
print("function() end:", t[function() end])
-- prints nothing, functions are referencial, and this is a different function
