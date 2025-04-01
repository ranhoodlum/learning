function single_string(s)
	return s .. "yes"
end

local x = single_string("HI")
-- same thing
-- local y = single_string "HI"
local y = single_string("HI")

-- only works for literal strings and literal tables
-- so, single_string "hi"
-- or single_string {}
-- , and nothing else
