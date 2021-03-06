const http = require('http');
const fs = require('fs');

//CREATING A SERVER ON PC
const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    //set header content type
    res.setHeader("Content-Type", 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += "index.html";
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    //send html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data); //data can be send by this call
        }
    });

});

//LISTENING BROWSER
server.listen(3000, 'localhost', () => {
    console.log("listening for request on port 3000");
});