const { argv } = require("node:process");

console.log("Executable that started this process: ", argv[0]);
console.log("JavaScript file that was ran: ", argv[1]);

console.log("Other arguments to the file: ", argv.slice(2));
