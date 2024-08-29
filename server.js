let fs = require('fs')
let http = require('http')

const port = 8080

http.createServer((req, res) => {
    fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end()
        } else {
            res.writeHead(200);
            res.end(data)
        }
    });
}).listen(port, () => {
    console.log(`Serveur run at http://localhost:8080`)
});