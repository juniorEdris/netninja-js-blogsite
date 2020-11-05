const http = require('http');
const fs = require('fs');
const _ = require('lodash');

//CREATING A SERVER ON PC
const server = http.createServer((req, res) => {

    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log("hello");
    });
    greet();

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
        case '/about-us':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            res.end();
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