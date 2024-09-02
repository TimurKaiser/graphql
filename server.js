const fs = require('fs');
const path = require('path');
const http = require('http');

const port = 8080;

http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    // gestion du bon type MIME
    switch (extname) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}).listen(port, () => {
    console.log(`Serveur running at http://localhost:${port}`);
});




//Ce code gère les fichiers avec les bons types MIME. 
//MIME indique au navigateur comment interpréter les fichiers (ex : application/javascript pour les JS). 
//Cela résout les problèmes de chargement des scripts et garantit 
//leur traitement correct. Sans les bons types MIME, les navigateurs 
//peuvent bloquer ou mal interpréter les fichiers, causant des erreurs.