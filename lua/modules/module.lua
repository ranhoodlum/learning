-- there isn't anything special about modules
--
-- files are just large lua functions, so you
-- can directly return a module from a file (function)
-- and require that module somewhere else
--
-- modules are just tables returned by files (functions)
--
-- Mechanisms over policies

-- foo.lua
-- by convention, modules are denoted by M
-- and it's convention to return a table,
-- because you can add things later
-- but you don't *have* to
local M = {}
M.cool_function = function() end
return M

-- look for bar.lua
