const http = require('http')

const server = http.createServer((request, response) => {
    response.end("Saludos para mi amiga <b>Paula Beldevere</b>!!!")
})

server.listen(8080, () => {
    console.log("Listening on port 8080...");
})

