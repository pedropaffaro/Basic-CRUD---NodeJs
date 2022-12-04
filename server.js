const http = require("http");

http.createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' });

        if(request.url === "/product"){
            response.end(JSON.stringify({
                message: 'Product route'
            }))
        }

        if(request.url === "/users"){
            response.end(JSON.stringify({
                message: 'Users route'
            }))
        }

        response.end(JSON.stringify({
            message: "Other route"
        }))
    })
    .listen(4001, () => console.log("Server is running at port 4001"));

