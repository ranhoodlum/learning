const http = require("http");
const fs = require("fs/promises");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./something.html").then((data) => {
      response.write(data);
      response.end();
    });
  })
  .listen(8080, () => {
    console.log(`listening on port 8080`);
  });
