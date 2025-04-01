local MyTable = {}

function MyTable.something(self, ...) end

-- same thing, just syntactic sugars
-- auto-insert the first argument as *self*
function MyTable:something(...) end

-- maybe the only synctac sugar lua has
