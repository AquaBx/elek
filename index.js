let http = require("http")
let fs = require("fs")

let server = http.createServer();
function onRequest(request, response) {
    console.log('Request received.');
    fs.readFile('./dist/index.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(data);
        response.end();
    })
}
server.on('request', onRequest);
server.listen(3000);