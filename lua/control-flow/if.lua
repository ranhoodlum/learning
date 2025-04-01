local function action(loves_coffee)
	if loves_coffee then
		print("drink coffee")
	else
		print("drink water")
	end
end

--- "falsely" : nil, false
action() -- same as: action(nil)
action(false)

-- everything else is "truthy"
action(true)
action(0)
action({})

-- figure out else if yourself
